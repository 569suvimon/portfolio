import { beforeEach, describe, it, expect } from "vitest";
import { useAuthStore } from "@/stores/auth.store";

describe("auth store", () => {
  beforeEach(() => {
    useAuthStore.persist.clearStorage();

    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  });

  it("should have initial auth state", () => {
    const state = useAuthStore.getState();

    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("should store tokens after login", () => {
    useAuthStore.getState().setTokens({
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });

    const state = useAuthStore.getState();

    expect(state.accessToken).toBe("access-token");

    expect(state.refreshToken).toBe("refresh-token");

    expect(state.isAuthenticated).toBe(true);
  });

  
});
