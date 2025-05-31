"use client";

import Link from "next/link";
import { SupportHero } from "@/components/support/support-hero";
import { SupportStats } from "@/components/support/support-stats";
import { FAQSection } from "@/components/support/faq-section";
import { ContactMethods } from "@/components/support/contact-methods";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <SupportHero />
        <SupportStats />
        <FAQSection />
        <ContactMethods />
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500">
          © 2024 Agriculture Smart. Bản quyền thuộc về Agriculture Smart.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Điều khoản dịch vụ
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Chính sách bảo mật
          </Link>
        </nav>
      </footer>
    </div>
  );
}
