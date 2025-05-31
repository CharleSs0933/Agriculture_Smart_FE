"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck } from "lucide-react";

const benefits = {
  farmers: [
    {
      title: "Tiếp cận kiến thức mới",
      description:
        "Cập nhật các kỹ thuật canh tác tiên tiến, phương pháp phòng trừ sâu bệnh hiệu quả.",
    },
    {
      title: "Tư vấn chuyên môn",
      description:
        "Nhận tư vấn trực tiếp từ các chuyên gia nông nghiệp về vấn đề đang gặp phải.",
    },
    {
      title: "Kết nối thị trường",
      description:
        "Tiếp cận trực tiếp với doanh nghiệp, mở rộng kênh tiêu thụ sản phẩm nông nghiệp.",
    },
    {
      title: "Nâng cao hiệu quả",
      description:
        "Áp dụng công nghệ và kỹ thuật mới để tăng năng suất, giảm chi phí sản xuất.",
    },
  ],
  engineers: [
    {
      title: "Chia sẻ kiến thức",
      description:
        "Cơ hội chia sẻ kiến thức chuyên môn và kinh nghiệm với cộng đồng nông dân.",
    },
    {
      title: "Phát triển nghề nghiệp",
      description:
        "Mở rộng mạng lưới chuyên môn, tạo cơ hội việc làm và hợp tác với doanh nghiệp.",
    },
    {
      title: "Nghiên cứu thực tế",
      description:
        "Tiếp cận với các vấn đề thực tế trong nông nghiệp, phát triển giải pháp phù hợp.",
    },
    {
      title: "Thu nhập bổ sung",
      description:
        "Tạo nguồn thu nhập từ việc tư vấn và hỗ trợ kỹ thuật cho người nông dân.",
    },
  ],
  businesses: [
    {
      title: "Tiếp cận nguồn cung",
      description:
        "Kết nối trực tiếp với người nông dân, đảm bảo nguồn cung ổn định và chất lượng.",
    },
    {
      title: "Phát triển thị trường",
      description:
        "Mở rộng thị trường tiêu thụ sản phẩm, dịch vụ nông nghiệp đến người nông dân.",
    },
    {
      title: "Tối ưu hóa chuỗi cung ứng",
      description:
        "Rút ngắn chuỗi cung ứng, giảm chi phí trung gian và nâng cao hiệu quả kinh doanh.",
    },
    {
      title: "Phát triển bền vững",
      description:
        "Xây dựng mối quan hệ bền vững với người nông dân và cộng đồng nông nghiệp.",
    },
  ],
};

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function BenefitsSection() {
  return (
    <section className="w-full px-52 py-8 md:py-12 lg:py-16">
      <div className="w-full px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="farmers" className="w-full">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
                Lợi ích cho các bên
              </h2>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                  <TabsTrigger value="farmers">Người nông dân</TabsTrigger>
                  <TabsTrigger value="engineers">Kỹ sư nông nghiệp</TabsTrigger>
                  <TabsTrigger value="businesses">Doanh nghiệp</TabsTrigger>
                </TabsList>
              </motion.div>
            </div>
            {Object.entries(benefits).map(([key, benefitList]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <motion.div
                  className="grid gap-4 md:gap-6 lg:gap-12 md:grid-cols-2"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {benefitList.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="space-y-3 md:space-y-4"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BadgeCheck className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                        </motion.div>
                        <h3 className="text-lg md:text-xl font-bold">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-500">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
