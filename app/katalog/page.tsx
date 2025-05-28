import Link from "next/link";
import { Metadata } from "next";
import ProductCatalog from "@/components/katalog/product-catalog";

export const metadata: Metadata = {
  title: "Katalog - Pesan Yuk",
  description: "Jelajahi berbagai pilihan makanan lezat dari restoran terbaik",
};

export default function KatalogPage() {
  return (
    <div className="w-full pt-24">
      <div className="w-full py-8 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Katalog Menu</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Beranda
              </Link>
              <span className="mx-2">/</span>
              <span>Katalog</span>
            </div>
          </div>
        </div>
      </div>
      <ProductCatalog />
    </div>
  );
}