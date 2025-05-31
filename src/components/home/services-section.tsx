"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, MessageSquare, Users } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Nghiên cứu",
    description:
      "Cung cấp các nghiên cứu, báo cáo và phân tích về nông nghiệp, giúp người nông dân tiếp cận với kiến thức mới nhất.",
  },
  {
    icon: MessageSquare,
    title: "Tư vấn",
    description:
      "Kết nối người nông dân với các chuyên gia nông nghiệp để nhận tư vấn về kỹ thuật canh tác, phòng trừ sâu bệnh.",
  },
  {
    icon: Users,
    title: "Kết nối",
    description:
      "Tạo cầu nối giữa doanh nghiệp, kỹ sư nông nghiệp và người nông dân, thúc đẩy hợp tác và phát triển.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function ServicesSection() {
  return (
    <section className="w-full sm:px-20 md:px-36 lg:px-40 xl:px-52 py-8 md:py-12 lg:py-16">
      <div className=" px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <motion.div
              className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Dịch vụ của chúng tôi
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Giải pháp toàn diện cho nông nghiệp
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-base md:text-xl/relaxed">
              Agriculture Smart cung cấp các dịch vụ hỗ trợ toàn diện cho ngành
              nông nghiệp, từ nghiên cứu đến tư vấn và kết nối.
            </p>
          </div>
        </motion.div>
        <motion.div
          className=" grid max-w-full grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 pb-2 text-center sm:text-left">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm sm:text-base">
                        {service.description}
                      </CardDescription>
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
