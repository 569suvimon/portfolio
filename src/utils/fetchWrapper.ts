import { AuthResponse } from "@/types/module/auth.type";
import { useAuthStore } from "@/stores/auth.store";
import { AuthService } from "@/services/auth.service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "tester";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  credentials?: RequestCredentials;
}

interface FetchWrapper {
  get: (url: string, body?: any, options?: RequestOptions) => Promise<any>;
  post: (url: string, body?: any, options?: RequestOptions) => Promise<any>;
  put: (url: string, body?: any, options?: RequestOptions) => Promise<any>;
  delete: (url: string, body?: any, options?: RequestOptions) => Promise<any>;
  patch: (url: string, body?: any, options?: RequestOptions) => Promise<any>;
}

async function refreshTokens(): Promise<AuthResponse | null> {
  try {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) return null;

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": TENANT_ID,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      return null;
    }

    const data: AuthResponse = await response.json();
    useAuthStore.getState().setTokens({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });

    try {
      await AuthService.profile();
    } catch (error) {
      console.error("Failed to fetch profile after token refresh:", error);
    }

    return data;
  } catch (error) {
    useAuthStore.getState().logout();
    return null;
  }
}

async function handleResponse(response: Response) {
  const text = await response.text();
  let data;
  try {
    data = text && JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }

  return data;
}

async function createHeaders(
  url: string,
  body?: any,
  options?: RequestOptions,
): Promise<Headers> {
  const headers: Record<string, string> = {
    "x-tenant-id": TENANT_ID,
  };

  // Don't set Content-Type for FormData, let the browser set it with boundary
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (!options?.skipAuth) {
    let accessToken = useAuthStore.getState().accessToken;
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!accessToken && refreshToken) {
      const newTokens = await refreshTokens();
      if (newTokens) {
        accessToken = newTokens.access_token;
      }
    }

    if (!accessToken && !refreshToken) {
      useAuthStore.getState().logout();
      throw new Error("No access token available");
    }

    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return new Headers(headers);
}

function createRequest(method: string) {
  return async (url: string, body?: any, options: RequestOptions = {}) => {
    // const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
    // const urlObj = new URL(fullUrl);

    const fullUrl = url.startsWith("http")
      ? url
      : new URL(url, API_BASE_URL).toString();

    const urlObj = new URL(fullUrl);

    // Handle file uploads - automatically create FormData if body is array of files
    let processedBody = body;
    if (Array.isArray(body) && body.some((item) => item instanceof File)) {
      const formData = new FormData();
      body.forEach((file) => {
        if (file instanceof File) {
          formData.append("files", file);
        }
      });
      processedBody = formData;
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: await createHeaders(url, processedBody, options), // Pass processed body to createHeaders
      credentials: options.credentials || "same-origin",
      ...options,
    };

    // Handle body based on request method and type
    if (processedBody instanceof FormData) {
      requestOptions.body = processedBody;
    } else if (processedBody) {
      if (method === "GET") {
        // Add query params for GET requests
        Object.entries(processedBody).forEach(([key, value]) => {
          if (value || value === false) {
            urlObj.searchParams.append(key, String(value));
          }
        });
      } else if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        requestOptions.body = JSON.stringify(processedBody);
      }
    }

    try {
      const response = await fetch(urlObj.toString(), requestOptions);

      if (response.status === 401 && !options?.skipAuth) {
        const newTokens = await refreshTokens();
        if (newTokens) {
          // Recreate headers with new token for retry
          const retryHeaders = await createHeaders(url, processedBody, {
            ...options,
            skipAuth: false,
          });
          retryHeaders.set("Authorization", `Bearer ${newTokens.access_token}`);

          const retryRequestOptions = {
            ...requestOptions,
            headers: retryHeaders,
          };

          const retryResponse = await fetch(
            urlObj.toString(),
            retryRequestOptions,
          );

          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          return await handleResponse(retryResponse);
        }
        throw new Error("Authentication failed");
      }

      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  };
}

export const fetchWrapper: FetchWrapper = {
  get: createRequest("GET"),
  post: createRequest("POST"),
  put: createRequest("PUT"),
  delete: createRequest("DELETE"),
  patch: createRequest("PATCH"),
};
