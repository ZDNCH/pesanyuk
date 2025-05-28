"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Living Room",
    description: "Elegant and comfortable furniture for your living space",
    icon: "🛋️",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: 2,
    name: "Bedroom",
    description: "Peaceful and stylish bedroom furniture collections",
    icon: "🛏️",
    image: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
  },
  {
    id: 3,
    name: "Dining Room",
    description: "Beautiful dining sets for memorable gatherings",
    icon: "🪑",
    image: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg",
  },
  {
    id: 4,
    name: "Office",
    description: "Professional furniture for productive workspaces",
    icon: "💼",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function CategoryShowcase() {
  return (
    <section className="py-24 w-full">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground">
            Explore our comprehensive range of furniture and interior design services tailored to your needs.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link href={`/katalog?kategori=${category.name}`}>
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="relative h-44">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="text-5xl">{category.icon}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}