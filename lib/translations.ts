import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'id' | 'en';

type TranslationStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<TranslationStore>()(
  persist(
    (set) => ({
      language: 'id',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-store',
    }
  )
);

export const translations = {
  common: {
    id: {
      search: 'Cari',
      filter: 'Filter',
      reset: 'Reset',
      cart: 'Keranjang',
      add: 'Tambah',
      total: 'Total',
      checkout: 'Checkout',
      home: 'Beranda',
      catalog: 'Katalog',
      about: 'Tentang Kami',
      consultation: 'Konsultasi Gratis',
    },
    en: {
      search: 'Search',
      filter: 'Filter',
      reset: 'Reset',
      cart: 'Cart',
      add: 'Add',
      total: 'Total',
      checkout: 'Checkout',
      home: 'Home',
      catalog: 'Catalog',
      about: 'About Us',
      consultation: 'Free Consultation',
    },
  },
  categories: {
    id: {
      'Ruang Tamu': 'Ruang Tamu',
      'Kamar Tidur': 'Kamar Tidur',
      'Ruang Makan': 'Ruang Makan',
      'Ruang Kerja': 'Ruang Kerja',
      'Storage': 'Penyimpanan',
    },
    en: {
      'Ruang Tamu': 'Living Room',
      'Kamar Tidur': 'Bedroom',
      'Ruang Makan': 'Dining Room',
      'Ruang Kerja': 'Office',
      'Storage': 'Storage',
    },
  },
  products: {
    id: {
      searchPlaceholder: 'Cari furniture...',
      noResults: 'Tidak ada furniture yang ditemukan',
      resetFilter: 'Reset Filter',
      brand: 'Merek',
      sort: {
        popularity: 'Popularitas',
        rating: 'Rating Tertinggi',
        priceLow: 'Harga: Rendah ke Tinggi',
        priceHigh: 'Harga: Tinggi ke Rendah',
      },
    },
    en: {
      searchPlaceholder: 'Search furniture...',
      noResults: 'No furniture found',
      resetFilter: 'Reset Filter',
      brand: 'Brand',
      sort: {
        popularity: 'Popularity',
        rating: 'Highest Rating',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
      },
    },
  },
};

export function useTranslation() {
  const { language } = useLanguageStore();
  
  const t = (key: string, section: keyof typeof translations = 'common') => {
    const keys = key.split('.');
    let result = translations[section][language];
    
    for (const k of keys) {
      if (result[k] === undefined) return key;
      result = result[k];
    }
    
    return result;
  };

  return { t, language };
}