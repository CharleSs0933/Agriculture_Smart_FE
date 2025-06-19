"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  FileText,
  PenTool,
  Ticket,
} from "lucide-react";

import { useUser } from "@/hooks/userUser";
import { useGetCartCountQuery } from "@/state/api";

const navItems = [
  { href: "/news", label: "Tin tức" },
  { href: "/blogs", label: "Blog nông dân" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/ai-diagnosis", label: "AI Chuẩn đoán" },
  { href: "/support", label: "Hỗ trợ" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const { data: itemCount, isLoading } = useGetCartCountQuery(undefined, {
    skip: !user,
  });

  return (
    <motion.header
      className="px-4 lg:px-6 py-4 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Link className="flex items-center justify-center" href="/">
          <motion.div transition={{ duration: 0.6 }}>
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

      {/* Desktop Actions */}
      <div className="ml-4 lg:ml-6 hidden md:flex items-center gap-4">
        {/* Cart Button */}
        <Link href="/user/cart">
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {!isLoading && itemCount && itemCount > 0 ? (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {itemCount}
              </Badge>
            ) : null}
          </Button>
        </Link>

        {/* User Menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.username}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ cá nhân
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/my-tickets">
                  <Ticket className="mr-2 h-4 w-4" />
                  Ticket của tôi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/my-posts">
                  <FileText className="mr-2 h-4 w-4" />
                  Bài viết của tôi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Đăng ký</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetTitle className="sr-only" />
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] overflow-auto"
          >
            <div className="flex flex-col space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="ml-2 text-lg font-bold">
                    Agriculture Smart
                  </span>
                </div>
              </div>

              {user && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/blog/my-posts"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Bài viết của tôi
                      </Button>
                    </Link>
                    <Link href="/blog/create" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <PenTool className="mr-2 h-4 w-4" />
                        Viết bài mới
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Đăng xuất
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="w-full">Đăng ký</Button>
                    </Link>
                  </div>
                )}
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

                <Link
                  href="/user/cart"
                  className="flex items-center gap-2 text-lg font-medium hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Giỏ hàng
                  {/* {itemCount > 0 && (
                    <Badge className="ml-auto">{itemCount}</Badge>
                  )} */}
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
