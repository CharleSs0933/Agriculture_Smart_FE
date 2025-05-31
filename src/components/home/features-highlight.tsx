"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Smartphone,
  Brain,
  Shield,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Chẩn đoán",
    description: "Phân tích hình ảnh cây trồng bằng AI",
  },
  {
    icon: Smartphone,
    title: "Ứng dụng di động",
    description: "Truy cập mọi lúc, mọi nơi",
  },
  {
    icon: Shield,
    title: "Bảo mật cao",
    description: "Thông tin được bảo vệ tuyệt đối",
  },
  {
    icon: Zap,
    title: "Phản hồi nhanh",
    description: "Tư vấn trong vòng 24h",
  },
  {
    icon: Users,
    title: "Cộng đồng",
    description: "Kết nối với 5000+ nông dân",
  },
  {
    icon: TrendingUp,
    title: "Hiệu quả cao",
    description: "Tăng năng suất lên đến 30%",
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturesHighlight() {
  return (
    <section className="w-full py-6 md:py-8 lg:py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Tính năng nổi bật
          </h2>
          <p className="text-gray-600">
            Những công cụ mạnh mẽ giúp nông dân thành công
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full text-center p-3 md:p-4 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <motion.div
                        className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-6 w-6 text-green-600" />
                      </motion.div>
                      <h3 className="font-semibold text-xs md:text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
