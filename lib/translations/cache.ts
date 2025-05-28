import { CacheEntry, TranslationProvider } from './types';

// Cache configuration
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 1000;

export class TranslationCache {
  private cache: Map<string, CacheEntry>;

  constructor() {
    this.cache = new Map();
  }

  /**
   * Get a cached translation
   * @param key - Cache key (original text + target language)
   * @returns Cached translation or null if not found/expired
   */
  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if cache entry has expired
    if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
      this.cache.delete(key);
      return null;
    }

    return entry.text;
  }

  /**
   * Store a translation in cache
   * @param key - Cache key (original text + target language)
   * @param text - Translated text
   * @param provider - Translation service provider used
   */
  set(key: string, text: string, provider: TranslationProvider): void {
    // Implement LRU cache eviction if cache is full
    if (this.cache.size >= MAX_CACHE_SIZE) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      text,
      timestamp: Date.now(),
      provider,
    });
  }

  /**
   * Clear all cached translations
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: MAX_CACHE_SIZE,
    };
  }
}