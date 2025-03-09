import { create } from "zustand";

interface Authtate {
  isSuccess: boolean;
  setIsSuccess: (val: boolean) => void;
}

export const useAuthStore = create<Authtate>((set) => ({
  isSuccess: false,
  setIsSuccess: (val) => set({ isSuccess: val }),
}));
