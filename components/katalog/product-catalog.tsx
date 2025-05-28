"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Search, Plus, Filter, SlidersHorizontal, ShoppingCart, Minus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

// Data produk furniture
const products = [
  {
    id: 1,
    name: "Sofa Modern Minimalis",
    description: "Sofa nyaman dengan desain minimalis untuk ruang tamu modern",
    price: 8500000,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    badge: "Terlaris",
    category: "Ruang Tamu",
    brand: "Furniro Living"
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
    category: "Kamar Tidur",
    brand: "Nordic Sleep"
  },
  {
    id: 3,
    name: "Set Meja Makan Modern",
    description: "Set meja makan modern dengan 6 kursi, cocok untuk keluarga",
    price: 15000000,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg",
    badge: "Rekomendasi",
    category: "Ruang Makan",
    brand: "Dining Elegance"
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
    category: "Storage",
    brand: "Custom Living"
  },
  {
    id: 5,
    name: "Meja Kerja Ergonomis",
    description: "Meja kerja dengan desain ergonomis untuk produktivitas maksimal",
    price: 4500000,
    rating: 4.5,
    reviewCount: 92,
    image: "https://images.pexels.com/photos/3740200/pexels-photo-3740200.jpeg",
    category: "Ruang Kerja",
    brand: "Work Comfort"
  },
  {
    id: 6,
    name: "Rak Buku Modular",
    description: "Rak buku modular yang bisa disesuaikan dengan kebutuhan",
    price: 3200000,
    rating: 4.7,
    reviewCount: 134,
    image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
    badge: "Populer",
    category: "Storage",
    brand: "Modern Storage"
  },
  {
    id: 7,
    name: "Kursi Santai",
    description: "Kursi santai dengan bahan premium untuk kenyamanan maksimal",
    price: 5500000,
    rating: 4.8,
    reviewCount: 78,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    category: "Ruang Tamu",
    brand: "Comfort Plus"
  },
  {
    id: 8,
    name: "Set Ruang Tamu Lengkap",
    description: "Set ruang tamu lengkap dengan meja dan sofa premium",
    price: 25000000,
    rating: 4.9,
    reviewCount: 189,
    image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
    badge: "Best Seller",
    category: "Ruang Tamu",
    brand: "Living Luxe"
  },
];

const categories = [
  { id: "ruang-tamu", name: "Ruang Tamu" },
  { id: "kamar-tidur", name: "Kamar Tidur" },
  { id: "ruang-makan", name: "Ruang Makan" },
  { id: "ruang-kerja", name: "Ruang Kerja" },
  { id: "storage", name: "Storage" },
];

const brands = [
  { id: "furniro-living", name: "Furniro Living" },
  { id: "nordic-sleep", name: "Nordic Sleep" },
  { id: "dining-elegance", name: "Dining Elegance" },
  { id: "custom-living", name: "Custom Living" },
  { id: "work-comfort", name: "Work Comfort" },
  { id: "modern-storage", name: "Modern Storage" },
  { id: "comfort-plus", name: "Comfort Plus" },
  { id: "living-luxe", name: "Living Luxe" },
];

// Cart type definitions
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const kategori = searchParams.get("kategori");
    if (kategori) {
      setSelectedCategory(kategori);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => 
        selectedBrands.includes(product.brand)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        result = result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, selectedBrands, sortBy]);

  // Cart functions
  const addToCart = (product: typeof products[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
    toast.success("Produk ditambahkan ke keranjang");
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.success("Produk dihapus dari keranjang");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    const message = `Halo, saya ingin memesan:%0A%0A${cart
      .map(item => `${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}`)
      .join('%0A')}%0A%0ATotal: ${formatPrice(getTotalPrice())}%0A%0ATerima kasih!`;
    
    window.open(`https://wa.me/6289519128492?text=${message}`, '_blank');
  };

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandName)) {
        return prev.filter((b) => b !== brandName);
      } else {
        return [...prev, brandName];
      }
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrands([]);
    setSortBy("popularity");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-8">
          <div>
            <h3 className="font-medium mb-4">Kategori</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Button
                    variant={selectedCategory === category.name ? "default" : "ghost"}
                    className="justify-start px-3 py-1.5 h-auto text-sm w-full"
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.name ? "" : category.name
                    )}
                  >
                    {category.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Brand</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.id}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={() => toggleBrand(brand.name)}
                  />
                  <label
                    htmlFor={brand.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Reset Filter
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Keranjang
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Keranjang Belanja</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? "Keranjang belanja Anda kosong" : `${cart.length} item dalam keranjang`}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-6">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between gap-4 pb-4 border-b"
                        >
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {cart.length > 0 && (
                      <div className="space-y-4">
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>{formatPrice(getTotalPrice())}</span>
                        </div>
                        <Button
                          className="w-full"
                          size="lg"
                          onClick={handleCheckout}
                        >
                          Pesan via WhatsApp
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                    <SheetDescription>
                      Pilih filter untuk menemukan furniture yang sesuai.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-8">
                    <div>
                      <h3 className="font-medium mb-4">Kategori</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Button
                              variant={selectedCategory === category.name ? "default" : "ghost"}
                              className="justify-start px-3 py-1.5 h-auto text-sm w-full"
                              onClick={() => setSelectedCategory(
                                selectedCategory === category.name ? "" : category.name
                              )}
                            >
                              {category.name}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">Brand</h3>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <div key={brand.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-${brand.id}`}
                              checked={selectedBrands.includes(brand.name)}
                              onCheckedChange={() => toggleBrand(brand.name)}
                            />
                            <label
                              htmlFor={`mobile-${brand.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {brand.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <Button variant="outline" className="w-full" onClick={resetFilters}>
                      Reset Filter
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularitas</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                    <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredProducts.length} hasil
              {selectedCategory && ` untuk kategori "${selectedCategory}"`}
              {searchQuery && ` dengan kata kunci "${searchQuery}"`}
            </p>
            
            {(selectedCategory || searchQuery || selectedBrands.length > 0) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Hapus Filter
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="border border-border rounded-lg overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-muted rounded animate-pulse w-1/4"></div>
                      <div className="h-6 bg-muted rounded animate-pulse w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Tidak ada hasil yang ditemukan</h3>
                  <p className="text-muted-foreground mb-6">
                    Tidak ada furniture yang sesuai dengan filter yang dipilih.
                  </p>
                  <Button onClick={resetFilters}>Reset Filter</Button>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} variants={cardVariants}>
                      <Card className="h-full overflow-hidden border-border/50 group hover:border-primary/50 transition-colors">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {product.badge && (
                            <Badge className="absolute top-3 right-3 bg-primary">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-muted-foreground">
                              {product.category}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span className="text-xs font-medium">{product.rating}</span>
                            </div>
                          </div>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {product.brand}
                          </p>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <span className="font-bold">{formatPrice(product.price)}</span>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => addToCart(product)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Keranjang
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}