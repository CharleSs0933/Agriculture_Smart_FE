"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Bộ Nông nghiệp", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Vingroup", logo: "/placeholder.svg?height=60&width=120" },
  { name: "TH Group", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Masan Group", logo: "/placeholder.svg?height=60&width=120" },
  { name: "CP Group", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Nutifood", logo: "/placeholder.svg?height=60&width=120" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function PartnersSection() {
  return (
    <section className="w-full px-52 py-4 md:py-6 lg:py-8 border-t border-b bg-white">
      <div className="px-4 md:px-6">
        <motion.div
          className="text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-600 mb-2">
            Đối tác tin cậy
          </h3>
          <p className="text-xs md:text-sm text-gray-500">
            Được tin tưởng bởi các tổ chức và doanh nghiệp hàng đầu
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={60}
                className="h-8 md:h-10 lg:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
