"use client";

import { motion } from "framer-motion";
import { Building, GraduationCap, Sprout } from "lucide-react";

const stakeholders = [
  {
    icon: Building,
    title: "Doanh nghiệp",
    description:
      "Tiếp cận trực tiếp với người nông dân, tìm kiếm cơ hội hợp tác và phát triển thị trường nông sản.",
  },
  {
    icon: GraduationCap,
    title: "Kỹ sư nông nghiệp",
    description:
      "Chia sẻ kiến thức chuyên môn, tư vấn kỹ thuật và hỗ trợ người nông dân áp dụng công nghệ mới.",
  },
  {
    icon: Sprout,
    title: "Người nông dân",
    description:
      "Tiếp cận kiến thức, kỹ thuật mới và kết nối với doanh nghiệp để nâng cao hiệu quả sản xuất.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export function StakeholdersSection() {
  return (
    <section className="w-full px-52 py-8 md:py-12 lg:py-16 bg-green-50">
      <div className=" px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Kết nối các bên liên quan
            </h2>
            <p className="max-w-[900px] text-base md:text-xl/relaxed text-gray-500">
              Agriculture Smart tạo ra một hệ sinh thái kết nối giữa ba bên:
              doanh nghiệp, kỹ sư nông nghiệp và người nông dân.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:gap-8 md:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stakeholders.map((stakeholder, index) => {
            const Icon = stakeholder.icon;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-4 text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="rounded-full bg-green-100 p-4 md:p-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
                  </motion.div>
                </motion.div>
                <motion.h3
                  className="text-lg md:text-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {stakeholder.title}
                </motion.h3>
                <p className="text-sm md:text-base text-gray-500">
                  {stakeholder.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
