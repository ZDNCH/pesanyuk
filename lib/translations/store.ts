import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TranslationState, Language, TranslationProvider } from './types';
import { TranslationCache } from './cache';
import { fetchTranslations } from './db';

interface ExtendedTranslationState extends TranslationState {
  translations: Record<string, any>;
  isLoading: boolean;
  error: string | null;
  loadTranslations: (language: Language) => Promise<void>;
}

// Create translation store with persistence and database integration
export const useTranslationStore = create<ExtendedTranslationState>()(
  persist(
    (set, get) => ({
      language: 'id',
      provider: 'google',
      cache: new Map(),
      translations: {},
      isLoading: false,
      error: null,
      
      setLanguage: async (language: Language) => {
        set({ language });
        await get().loadTranslations(language);
      },
      
      setProvider: (provider: TranslationProvider) => set({ provider }),
      
      clearCache: () => set({ cache: new Map() }),
      
      loadTranslations: async (language: Language) => {
        try {
          set({ isLoading: true, error: null });
          const translations = await fetchTranslations(language);
          set({ translations, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to load translations',
            isLoading: false 
          });
        }
      },
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