"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      title: "Modern Living Room Collection",
      description: "Discover our latest collection of contemporary furniture designed for modern living spaces."
    },
    {
      image: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
      title: "Scandinavian Bedroom Series",
      description: "Experience the minimalist beauty of our Scandinavian-inspired bedroom furniture."
    },
    {
      image: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg",
      title: "Luxury Dining Sets",
      description: "Elevate your dining experience with our premium dining room collections."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Loading Animation */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-background z-10 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <motion.div
            className="flex items-center space-x-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.span
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Furniro
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Content */}
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Transform Your Space with{" "}
            <span className="text-primary">Premium Furniture</span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Discover our curated collection of premium furniture and professional interior design services to create your dream living space.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <Button size="lg" className="group">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/katalog">
                View Catalog
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            className="flex items-center space-x-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold">500+</span>
              <span className="text-sm text-muted-foreground">Products</span>
            </div>
            <div className="h-12 border-l border-border"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">50+</span>
              <span className="text-sm text-muted-foreground">Design Projects</span>
            </div>
            <div className="h-12 border-l border-border"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">10K+</span>
              <span className="text-sm text-muted-foreground">Happy Clients</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-sm opacity-90">{slide.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-white w-4" : "bg-white/50"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}