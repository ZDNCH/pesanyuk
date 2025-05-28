import { TranslationOptions } from '../types';

export abstract class BaseTranslationProvider {
  protected options: TranslationOptions;

  constructor(options: TranslationOptions = {}) {
    this.options = options;
  }

  /**
   * Translate text using the provider's service
   * @param text - Text to translate
   * @param targetLang - Target language code
   * @param sourceLang - Source language code (optional)
   */
  abstract translate(text: string, targetLang: string, sourceLang?: string): Promise<string>;

  /**
   * Detect the language of the provided text
   * @param text - Text to analyze
   */
  abstract detectLanguage(text: string): Promise<string>;

  /**
   * Translate multiple texts in batch
   * @param texts - Array of texts to translate
   * @param targetLang - Target language code
   * @param sourceLang - Source language code (optional)
   */
  abstract batchTranslate(texts: string[], targetLang: string, sourceLang?: string): Promise<string[]>;
}