"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nguyễn Văn Minh",
    role: "Nông dân trồng lúa",
    location: "An Giang",
    content:
      "Nhờ Agriculture Smart, tôi đã học được nhiều kỹ thuật mới và tăng năng suất lúa lên 25%. Các chuyên gia tư vấn rất nhiệt tình.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Trần Thị Lan",
    role: "Chủ trang trại rau sạch",
    location: "Đà Lạt",
    content:
      "Platform này giúp tôi kết nối với nhiều khách hàng mới. Doanh thu tăng 40% sau 6 tháng sử dụng.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Lê Minh Tuấn",
    role: "Kỹ sư nông nghiệp",
    location: "TP.HCM",
    content:
      "Tôi có thể chia sẻ kiến thức và hỗ trợ nhiều nông dân hơn. Đây là nền tảng tuyệt vời cho cộng đồng nông nghiệp.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function TestimonialsSection() {
  return (
    <section className="w-full sm:px-20 md:px-36 lg:px-40 xl:px-52 py-6 md:py-10 lg:py-16">
      <div className=" px-4 md:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-gray-600">
            Những câu chuyện thành công từ cộng đồng Agriculture Smart
          </p>
        </motion.div>
        <motion.div
          className="grid gap-4 md:gap-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                className="h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="h-full p-4 md:p-6 ">
                    <div className="flex items-center mb-4">
                      <Quote className="h-6 w-6 md:h-8 md:w-8 text-green-600 opacity-50" />
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm md:text-base overflow-ellipsis line-clamp-4">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 md:h-10 md:w-10 mr-3">
                        <AvatarImage
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-xs md:text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-600">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
