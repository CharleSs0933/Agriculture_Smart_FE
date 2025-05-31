"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Leaf, Menu } from "lucide-react";

const navItems = [
  { href: "/news", label: "Tin tức" },
  { href: "/blog", label: "Blog nông dân" },
  { href: "/ai-diagnosis", label: "AI Chẩn đoán" },
  { href: "/support", label: "Hỗ trợ" },
  { href: "#", label: "Liên hệ" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Link className="flex items-center justify-center" href="/">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="h-6 w-6 text-green-600" />
          </motion.div>
          <span className="ml-2 text-lg sm:text-xl font-bold">
            Agriculture Smart
          </span>
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex gap-4 lg:gap-6">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href={item.href}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Desktop Login Button */}
      <motion.div
        className="ml-4 lg:ml-6 hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button size="sm">Đăng nhập</Button>
      </motion.div>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="ml-2 text-lg font-bold">
                    Agriculture Smart
                  </span>
                </div>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-lg font-medium hover:text-green-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="pt-4 border-t">
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Đăng nhập
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
