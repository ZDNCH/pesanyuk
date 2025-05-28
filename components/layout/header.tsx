"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  Sofa,
  Info
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between min-h-[64px]">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold flex items-center gap-2"
          onClick={closeMenu}
        >
          <Sofa className="h-5 w-5 sm:h-6 sm:w-6" />
          <span>Furniro</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/katalog"
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
          >
            Katalog
          </Link>
          <Link
            href="/tentang"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
          >
            Tentang Kami
          </Link>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <ModeToggle />
          <Button>Konsultasi Gratis</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[64px] bg-background/95 backdrop-blur-md shadow-md transition-transform duration-300 ease-in-out z-40",
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent"
            onClick={closeMenu}
          >
            <Home className="h-4 w-4" />
            <span>Beranda</span>
          </Link>
          <Link
            href="/katalog"
            className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent"
            onClick={closeMenu}
          >
            <Sofa className="h-4 w-4" />
            <span>Katalog</span>
          </Link>
          <Link
            href="/tentang"
            className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent"
            onClick={closeMenu}
          >
            <Info className="h-4 w-4" />
            <span>Tentang Kami</span>
          </Link>
          <div className="mt-4 flex items-center gap-4 px-4">
            <LanguageSwitcher />
            <Button className="flex-1">Konsultasi Gratis</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
