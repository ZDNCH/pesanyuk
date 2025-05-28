"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredProducts = [
  {
    id: 1,
    name: "Sofa Modern Minimalis",
    description: "Sofa nyaman dengan desain minimalis untuk ruang tamu modern",
    price: 8500000,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    badge: "Terlaris",
    category: "Ruang Tamu"
  },
  {
    id: 2,
    name: "Tempat Tidur Skandinavia",
    description: "Tempat tidur gaya Skandinavia dengan bahan kayu solid",
    price: 12500000,
    rating: 4.7,
    reviewCount: 98,
    image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
    badge: "Premium",
    category: "Kamar Tidur"
  },
  {
    id: 3,
    name: "Meja Makan Set",
    description: "Set meja makan modern dengan 6 kursi, cocok untuk keluarga",
    price: 15000000,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg",
    badge: "Rekomendasi",
    category: "Ruang Makan"
  },
  {
    id: 4,
    name: "Lemari Pakaian Custom",
    description: "Lemari pakaian dengan desain custom dan storage maksimal",
    price: 9500000,
    rating: 4.6,
    reviewCount: 87,
    image: "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg",
    badge: "Custom",
    category: "Storage"
  }
];

export default function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const cardVariants = {
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    },
    initial: {
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-12 md:py-24 w-full bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Koleksi Unggulan</h2>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Temukan koleksi furnitur premium kami dengan desain eksklusif dan kualitas terbaik.
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 group" asChild>
            <Link href="/katalog">
              Lihat Semua Koleksi
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="initial"
              animate={hoveredId === product.id ? "hover" : "initial"}
              whileHover="hover"
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="h-full"
            >
              <Card className="h-full overflow-hidden border-border/50 group hover:border-primary/50 transition-colors">
                <div className="relative aspect-[4/3] sm:h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 right-3 bg-primary text-white">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="text-xs text-muted-foreground mb-2">{product.category}</div>
                  <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-sm">{product.rating}</span>
                    <span className="text-muted-foreground text-xs">
                      ({product.reviewCount} ulasan)
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center px-4 pb-4">
                  <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                  <Button size="sm" variant="default" className="text-sm px-2">
                    <Plus className="h-4 w-4 mr-1" /> Keranjang
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}