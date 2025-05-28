import { z } from "zod";

// Define supported languages
export type Language = 'id' | 'en';

// Translation service provider types
export type TranslationProvider = 'google' | 'microsoft' | 'openai';

// Translation cache entry
export interface CacheEntry {
  text: string;
  timestamp: number;
  provider: TranslationProvider;
}

// Translation options schema
export const TranslationOptionsSchema = z.object({
  provider: z.enum(['google', 'microsoft', 'openai']).optional(),
  cache: z.boolean().optional(),
  detect: z.boolean().optional(),
  batch: z.boolean().optional(),
  timeout: z.number().min(1000).max(30000).optional(),
});

export type TranslationOptions = z.infer<typeof TranslationOptionsSchema>;

// Translation store state
export interface TranslationState {
  language: Language;
  provider: TranslationProvider;
  cache: Map<string, CacheEntry>;
  setLanguage: (language: Language) => void;
  setProvider: (provider: TranslationProvider) => void;
  clearCache: () => void;
}