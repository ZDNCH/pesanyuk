"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 w-full overflow-hidden bg-white/10 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 pointer-events-none"></div>

      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Siap Mewujudkan Ruang Impian Anda?
          </motion.h2>

          <motion.p
            className="text-lg text-white/80 mb-12 max-w-2xl mx-auto drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Konsultasikan kebutuhan desain interior dan furnitur Anda dengan tim profesional kami.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" asChild>
              <Link href="/katalog" className="group flex items-center justify-center gap-2">
                Jelajahi Katalog
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-10 items-center justify-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">Hubungi Kami</p>
                <p className="font-semibold text-lg">+62 812 3456 7890</p>
              </div>
            </div>

            <div className="h-12 w-px bg-white/30 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">Email</p>
                <p className="font-semibold text-lg">info@furniro.id</p>
              </div>
            </div>

            <div className="h-12 w-px bg-white/30 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="flex relative -space-x-3">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Client 1"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Client 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                  alt="Client 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <p className="ml-3 text-sm font-semibold text-white/90">1,500+ Klien Puas</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}