import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TranslationState, Language, TranslationProvider } from './types';
import { TranslationCache } from './cache';

// Create translation store with persistence
export const useTranslationStore = create<TranslationState>()(
  persist(
    (set) => ({
      language: 'id',
      provider: 'google',
      cache: new Map(),
      setLanguage: (language: Language) => set({ language }),
      setProvider: (provider: TranslationProvider) => set({ provider }),
      clearCache: () => set((state) => ({ cache: new Map() })),
    }),
    {
      name: 'translation-store',
      partialize: (state) => ({
        language: state.language,
        provider: state.provider,
      }),
    }
  )
);

// Translation cache instance
export const translationCache = new TranslationCache();