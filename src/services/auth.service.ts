import {
  LoginCredentials,
  AuthResponse,
  UserProfile,
} from "@/types";
import { fetchWrapper } from "@/utils/fetchWrapper";

const API_URL_ADD_SPREADSHEET_ID =
  process.env.NEXT_PUBLIC_API_URL +
  "/api/" +
  process.env.NEXT_PUBLIC_SPREADSHEET_ID;

export const AuthService = {
  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return fetchWrapper.post(`${API_URL_ADD_SPREADSHEET_ID}/auth/login`, credentials, {
      skipAuth: true,
    });
  },

  profile(): Promise<UserProfile> {
    return fetchWrapper.get(`${API_URL_ADD_SPREADSHEET_ID}/auth/profile`);
  },

  refresh() {
    // ...
  },
};