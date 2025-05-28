import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Furniro",
  description: "Learn more about Furniro, your premium furniture and interior design partner",
};

export default function TentangPage() {
  return (
    <div className="w-full pt-24">
      <div className="w-full py-8 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">About Us</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Transforming Spaces with Premium Furniture & Design</h2>
            <p className="text-muted-foreground">
              Furniro is a leading furniture and interior design platform that connects customers with premium furniture collections and professional design services. 
              We are committed to delivering exceptional quality and transformative design solutions for your space.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Furniture Collections</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Satisfied Clients</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm text-muted-foreground">Design Projects</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
              alt="Furniro Showroom"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Furniro?</h2>
          <p className="text-muted-foreground">
            We deliver excellence in furniture and design with uncompromising quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Design Service</h3>
              <p className="text-sm text-muted-foreground">
                Professional interior designers to help create your perfect space.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Carefully curated furniture collections with superior craftsmanship.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Customer Service</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated support team available 24/7 for all your needs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Nationwide Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Professional delivery and assembly service across the country.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Furniro</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of our journey in transforming living spaces. Partner with us or start your career with Furniro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Become a Partner</Button>
            <Button size="lg" variant="outline">Careers at Furniro</Button>
          </div>
        </div>
      </div>
    </div>
  );
}