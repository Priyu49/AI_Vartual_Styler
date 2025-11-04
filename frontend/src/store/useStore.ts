import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, Moodboard } from '@/lib/api';

interface AppState {
  // Model images
  modelImages: string[];
  addModelImage: (image: string) => void;
  removeModelImage: (index: number) => void;
  clearModelImages: () => void;

  // Selected products
  selectedProducts: Product[];
  addSelectedProduct: (product: Product) => void;
  removeSelectedProduct: (productId: string) => void;
  clearSelectedProducts: () => void;

  // Moodboards
  moodboards: Moodboard[];
  addMoodboard: (moodboard: Moodboard) => void;
  removeMoodboard: (moodboardId: string) => void;

  // Auto-style mode
  autoStyleEnabled: boolean;
  setAutoStyleEnabled: (enabled: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Model images
      modelImages: [],
      addModelImage: (image: string) =>
        set((state) => ({ modelImages: [...state.modelImages, image] })),
      removeModelImage: (index: number) =>
        set((state) => ({
          modelImages: state.modelImages.filter((_, i) => i !== index),
        })),
      clearModelImages: () => set({ modelImages: [] }),

      // Selected products
      selectedProducts: [],
      addSelectedProduct: (product: Product) =>
        set((state) => ({
          selectedProducts: [...state.selectedProducts, product],
        })),
      removeSelectedProduct: (productId: string) =>
        set((state) => ({
          selectedProducts: state.selectedProducts.filter((p) => p.id !== productId),
        })),
      clearSelectedProducts: () => set({ selectedProducts: [] }),

      // Moodboards
      moodboards: [],
      addMoodboard: (moodboard: Moodboard) =>
        set((state) => ({ moodboards: [...state.moodboards, moodboard] })),
      removeMoodboard: (moodboardId: string) =>
        set((state) => ({
          moodboards: state.moodboards.filter((m) => m.id !== moodboardId),
        })),

      // Auto-style
      autoStyleEnabled: false,
      setAutoStyleEnabled: (enabled: boolean) => set({ autoStyleEnabled: enabled }),
    }),
    {
      name: 'juno-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

