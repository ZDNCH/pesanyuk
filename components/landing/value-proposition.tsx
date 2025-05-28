"use client";

import { motion } from "framer-motion";
import { Truck, PenTool, Paintbrush, Shield } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-10 w-10" />,
    title: "Free Delivery",
    description: "Free shipping on all orders over $1000 within our service area."
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Professional Assembly",
    description: "Expert furniture assembly service included with your purchase."
  },
  {
    icon: <Paintbrush className="h-10 w-10" />,
    title: "Custom Design",
    description: "Personalized interior design service to match your style and needs."
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "5-Year Warranty",
    description: "All our furniture comes with a comprehensive 5-year warranty."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function ValueProposition() {
  return (
    <section className="py-24 w-full bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Furniro?</h2>
          <p className="text-muted-foreground">
            We offer more than just furniture - we provide complete solutions for your perfect living space.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
              variants={item}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}