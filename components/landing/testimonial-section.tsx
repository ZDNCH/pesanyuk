"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Pelanggan Setia",
    testimonial: "Kualitas furnitur yang luar biasa dan layanan desain interior yang sangat profesional. Sangat membantu dalam mewujudkan ruang impian saya.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    rating: 5,
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Interior Designer",
    testimonial: "Sebagai desainer interior, saya sangat merekomendasikan Furniro. Koleksi furnitur mereka berkualitas tinggi dan pelayanan yang diberikan sangat memuaskan.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    rating: 5,
  },
  {
    id: 3,
    name: "Dimas Prakoso",
    role: "Pemilik Apartemen",
    testimonial: "Furniro membantu saya mendesain ulang apartemen dengan hasil yang menakjubkan. Tim desainer mereka sangat memahami kebutuhan dan gaya yang saya inginkan.",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    rating: 4,
  },
  {
    id: 4,
    name: "Rina Wijaya",
    role: "Pengusaha",
    testimonial: "Proses konsultasi yang mudah dan hasil yang memuaskan. Furnitur custom yang saya pesan sesuai dengan ekspektasi dan kualitasnya terjamin.",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} 
      />
    ));
  };

  return (
    <section className="py-24 w-full bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Testimoni Klien Kami</h2>
          <p className="text-muted-foreground">
            Dengarkan langsung dari klien yang telah mempercayakan ruang mereka kepada kami.
          </p>
        </div>

        <Carousel
          setApi={(api) => {
            api?.on("select", () => {
              setActiveIndex(api.selectedScrollSnap());
            });
          }}
          className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 px-2"
              >
                <Card className="border border-border/50 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="text-muted-foreground flex-grow">
                      "{testimonial.testimonial}"
                    </blockquote>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center mt-8">
            <CarouselPrevious className="static transform-none mr-2" />
            <div className="flex space-x-2 mx-4">
              {testimonials.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    activeIndex === index ? "bg-primary w-4" : "bg-muted-foreground/30"
                  }`}
                  animate={{
                    scale: activeIndex === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <CarouselNext className="static transform-none ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}