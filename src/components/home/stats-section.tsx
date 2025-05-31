"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 5000, label: "Người nông dân", suffix: "+" },
  { value: 200, label: "Kỹ sư nông nghiệp", suffix: "+" },
  { value: 150, label: "Doanh nghiệp", suffix: "+" },
  { value: 30, label: "Tỉnh thành", suffix: "+" },
];

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600"
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

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
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function StatsSection() {
  return (
    <section className="w-full px-52 py-8 md:py-12 lg:py-16">
      <div className=" px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className=" font-bold tracking-tighter sm:text-4xl text-2xl sm:text-3xl md:text-4xl">
              Thống kê của chúng tôi
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-base md:text-xl/relaxed">
              Agriculture Smart đã và đang phát triển mạnh mẽ, kết nối hàng
              nghìn người nông dân, kỹ sư và doanh nghiệp.
            </p>
          </div>
        </motion.div>
        <motion.div
          className=" grid max-w-full grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12 mt-8 grid-cols-2 gap-4 md:gap-6 lg:gap-12 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 space-y-1 md:space-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <span className="text-sm font-medium text-gray-500 text-xs sm:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
