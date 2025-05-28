import { useTranslationStore, translationCache } from './store';
import { TranslationOptionsSchema, type TranslationOptions, type Language } from './types';
import { translations } from './content';

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
 * Hook for accessing translations with automatic error handling and caching
 */
export function useTranslation() {
  const { language, provider } = useTranslationStore();
  
  /**
   * Translate a key into the current language
   * @param key - Translation key (dot notation supported)
   * @param section - Translation section
   * @param options - Translation options
   * @returns Translated text
   */
  const t = (
    key: string,
    section: keyof typeof translations = 'common',
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
      let result = translations[section][language];
      
      for (const k of keys) {
        if (result[k] === undefined) {
          throw new TranslationError(`Translation not found for key: ${key}`);
        }
        result = result[k];
      }
      
      // Cache result if enabled
      if (cacheKey) {
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

  return { t, language };
}

// Re-export types and utilities
export * from './types';
export * from './store';
export * from './cache';