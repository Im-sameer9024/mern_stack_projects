import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useLoaderStore = create(
  devtools((set) => ({
    loading: false,

    setLoading: (value) => set({ loading: value }),
  }))
);
