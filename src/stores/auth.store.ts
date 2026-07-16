import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore } from '@/types';

type State = AuthStore;

export const useAuthStore = create<State>()(
  persist(
    (set) => ({
      // user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      hasHydrated: false,

      setHasHydrated: (state) =>
        set({ hasHydrated: state }),

      // setUser: (user) => set({ user }),

      setTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          // user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        // user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
