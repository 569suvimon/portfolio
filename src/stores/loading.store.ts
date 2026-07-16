import { create } from "zustand";
import { LoadingKey } from "@/utils/loadingKeys";

interface LoadingStore {

    loadingStates: Partial<Record<LoadingKey, boolean>>;

    start: (key: LoadingKey) => void;

    finish: (key: LoadingKey) => void;

    isLoading: (key: LoadingKey) => boolean;

    hasAnyLoading: () => boolean;
}

export const useLoadingStore = create<LoadingStore>((set, get) => ({

    loadingStates: {},

    start: (key) =>
        set((state) => ({
            loadingStates: {
                ...state.loadingStates,
                [key]: true,
            },
        })),

    finish: (key) =>
        set((state) => ({
            loadingStates: {
                ...state.loadingStates,
                [key]: false,
            },
        })),

    isLoading: (key) =>
        get().loadingStates[key] ?? false,

    hasAnyLoading: () =>
        Object.values(get().loadingStates).some(Boolean),

}));