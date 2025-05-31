"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-green-600 text-white">
      <div className="container px-4 md:px-6">
        <motion.div
          className="grid gap-4 md:gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Sẵn sàng tham gia cùng chúng tôi?
            </h2>
            <p className="max-w-[600px] text-base md:text-xl/relaxed">
              Đăng ký ngay hôm nay để trở thành một phần của hệ sinh thái
              Agriculture Smart và khám phá những cơ hội mới trong lĩnh vực nông
              nghiệp.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:gap-2 justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100">
                Đăng ký ngay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-green-700"
              >
                Tìm hiểu thêm
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
