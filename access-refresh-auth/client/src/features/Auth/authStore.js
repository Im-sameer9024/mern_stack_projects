import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  loading: false,

  setToken: (token) =>
    set({
      token: token,
    }),
  setLoading: (loading) =>
    set({
      loading: loading,
    }),
}));
