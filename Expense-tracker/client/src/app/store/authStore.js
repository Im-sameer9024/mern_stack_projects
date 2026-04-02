import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
  devtools(
    (set) => ({
      //------------------- initial states --------------------------
      token: null,
      tokenLoading: true,

      //---------------- helper functions--------------------
      setToken: (token) => set({ token: token, tokenLoading: false }, false, 'auth/setToken'),

      clearToken: () => set({ token: null, tokenLoading: false }, false, 'auth/clearToken'),
    }),
    {
      name: 'authStore',
    }
  )
);
