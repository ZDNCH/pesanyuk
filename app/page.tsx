import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/landing/hero-section";
import FeaturedProducts from "@/components/landing/featured-products";
import CategoryShowcase from "@/components/landing/category-showcase";
import ValueProposition from "@/components/landing/value-proposition";
import TestimonialSection from "@/components/landing/testimonial-section";
import CTASection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ValueProposition />
      <FeaturedProducts />
      <CategoryShowcase />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}