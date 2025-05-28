import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create Supabase client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Fetch translations from the database
 * @param language Language code to fetch translations for
 * @returns Object containing all translations for the language
 */
export async function fetchTranslations(language: string) {
  const { data, error } = await supabase
    .from('translations')
    .select(`
      value,
      translation_keys (
        key,
        section
      ),
      language_code
    `)
    .eq('language_code', language);

  if (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }

  // Transform the data into the expected format
  const translations = data.reduce((acc, item) => {
    const section = item.translation_keys.section;
    const key = item.translation_keys.key;
    
    if (!acc[section]) {
      acc[section] = {};
    }
    
    // Handle nested keys (e.g., 'sort.popularity')
    const keyParts = key.split('.');
    let current = acc[section];
    
    for (let i = 0; i < keyParts.length - 1; i++) {
      if (!current[keyParts[i]]) {
        current[keyParts[i]] = {};
      }
      current = current[keyParts[i]];
    }
    
    current[keyParts[keyParts.length - 1]] = item.value;
    
    return acc;
  }, {} as Record<string, any>);

  return translations;
}