"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-8 md:py-16 lg:py-10 bg-green-50">
      <div className=" w-full px-4 md:px-6">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="space-y-4 w-fit mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="w-fit text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Kết nối nông nghiệp thông minh
            </motion.h1>
            <motion.p
              className="max-w-[600px] text-gray-500 text-base md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Agriculture Smart là nền tảng nghiên cứu, tư vấn và hỗ trợ cho
              người nông dân. Đồng thời kết nối giữa doanh nghiệp, kỹ sư nông
              nghiệp và người nông dân.
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  Bắt đầu ngay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="w-full sm:w-auto">
                  Tìm hiểu thêm
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto w-full max-w-[400px] md:max-w-[500px] lg:max-w-none"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://1wmtv4em9v.ufs.sh/f/GFdWNlbyPZoLbnMIIYra12exBhYqdvVlcUOtRnC9MNzkpAIZ"
                width={550}
                height={550}
                alt="Agriculture Smart"
                className="w-full h-auto rounded-xl object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
