import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
  devtools(
    (set) => ({
      //------------------- initial states --------------------------
      token: null,
      tokenLoading: false,
      forgotPasswordToken: null,
      getUserKey: () => {
        return localStorage.getItem('temp') ? localStorage.getItem('temp') : null;
      },

      //---------------- helper functions--------------------
      setToken: (token) => set({ token: token }, false, 'auth/setToken'),
      setTokenLoading: (loading) => set({ tokenLoading: loading }, false, 'auth/setTokenLoading'),
      setPasswordToken: (token) =>
        set({ forgotPasswordToken: token }, false, 'auth/setPasswordToken'),

      clearToken: () => set({ token: null, tokenLoading: false }, false, 'auth/clearToken'),
    }),
    {
      name: 'authStore',
    }
  )
);
