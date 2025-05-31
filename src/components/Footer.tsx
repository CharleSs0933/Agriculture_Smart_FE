"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="text-xs text-gray-500">
        © 2024 Agriculture Smart. Bản quyền thuộc về Agriculture Smart.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Điều khoản dịch vụ
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Chính sách bảo mật
          </Link>
        </motion.div>
      </nav>
    </motion.footer>
  );
}
