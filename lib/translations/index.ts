import { useTranslationStore, translationCache } from './store';
import { TranslationOptionsSchema, type TranslationOptions, type Language } from './types';
import { useEffect } from 'react';

/**
 * Custom error for translation-related issues
 */
export class TranslationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TranslationError';
  }
}

/**
 * Hook for accessing translations with automatic database integration
 */
export function useTranslation() {
  const { 
    language, 
    provider,
    translations,
    isLoading,
    error,
    loadTranslations 
  } = useTranslationStore();

  // Load translations when language changes
  useEffect(() => {
    loadTranslations(language);
  }, [language]);
  
  /**
   * Translate a key into the current language
   * @param key - Translation key (dot notation supported)
   * @param section - Translation section
   * @param options - Translation options
   * @returns Translated text
   */
  const t = (
    key: string,
    section: string = 'common',
    options: TranslationOptions = {}
  ): string => {
    try {
      // Validate options
      const validatedOptions = TranslationOptionsSchema.parse(options);
      
      // Generate cache key if caching is enabled
      const cacheKey = validatedOptions.cache 
        ? `${key}:${language}:${section}:${provider}`
        : null;
      
      // Check cache first
      if (cacheKey) {
        const cached = translationCache.get(cacheKey);
        if (cached) return cached;
      }
      
      // Navigate through translation object
      const keys = key.split('.');
      let result = translations[section];
      
      if (!result) {
        throw new TranslationError(`Section not found: ${section}`);
      }
      
      for (const k of keys) {
        if (!result || result[k] === undefined) {
          throw new TranslationError(`Translation not found for key: ${key}`);
        }
        result = result[k];
      }
      
      // Cache result if enabled
      if (cacheKey && typeof result === 'string') {
        translationCache.set(cacheKey, result, provider);
      }
      
      return result;
    } catch (error) {
      if (error instanceof TranslationError) {
        console.error(`Translation Error: ${error.message}`);
        return key; // Fallback to key
      }
      
      console.error('Unexpected translation error:', error);
      return key; // Fallback to key
    }
  };

  return { t, language, isLoading, error };
}

// Re-export types and utilities
export * from './types';
export * from './store';
export * from './cache';