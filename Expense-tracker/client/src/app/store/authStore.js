import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
  devtools((set) => ({
    //------------------- initial states --------------------------
    token: null,
    tokenLoading: true,

    //---------------- helper functions--------------------
    setToken: (token) => set({ token: token, tokenLoading: false }),
  }))
);
