"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { TicketForm } from "@/components/support/ticket-form";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  views: number;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Thời gian phản hồi ticket hỗ trợ là bao lâu?",
    answer:
      "Chúng tôi cam kết phản hồi trong vòng 24 giờ cho tất cả các yêu cầu hỗ trợ. Các trường hợp khẩn cấp sẽ được ưu tiên xử lý và có thể nhận được phản hồi trong vòng 2-4 giờ. Thời gian giải quyết hoàn toàn phụ thuộc vào độ phức tạp của vấn đề.",
    category: "Chung",
    tags: ["thời gian", "phản hồi", "ticket"],
    helpful: 45,
    views: 234,
  },
  {
    id: "2",
    question: "Có mất phí khi sử dụng dịch vụ tư vấn không?",
    answer:
      "Dịch vụ tư vấn cơ bản qua ticket hoàn toàn miễn phí. Các dịch vụ chuyên sâu như tư vấn tại ruộng, thiết kế hệ thống tưới tiêu, hoặc lập kế hoạch sản xuất chi tiết có thể có phí tùy theo yêu cầu cụ thể. Chúng tôi sẽ thông báo rõ ràng về chi phí trước khi thực hiện.",
    category: "Chung",
    tags: ["phí", "miễn phí", "tư vấn"],
    helpful: 38,
    views: 189,
  },
  {
    id: "3",
    question: "Làm sao để theo dõi trạng thái ticket của tôi?",
    answer:
      "Sau khi gửi ticket, bạn sẽ nhận được mã ticket qua email. Bạn có thể theo dõi trạng thái ticket bằng cách: 1) Kiểm tra email để nhận thông báo cập nhật, 2) Đăng nhập vào tài khoản để xem lịch sử ticket, 3) Liên hệ hotline với mã ticket để được hỗ trợ trực tiếp.",
    category: "Ticket",
    tags: ["theo dõi", "trạng thái", "mã ticket"],
    helpful: 52,
    views: 167,
  },
  {
    id: "4",
    question: "Tôi có thể gửi hình ảnh kèm theo ticket không?",
    answer:
      "Có, bạn hoàn toàn có thể và nên gửi hình ảnh kèm theo ticket. Hình ảnh giúp kỹ sư nông nghiệp hiểu rõ hơn về vấn đề và đưa ra lời khuyên chính xác. Bạn có thể tải lên tối đa 5 hình ảnh, mỗi hình không quá 10MB. Định dạng hỗ trợ: JPG, PNG, HEIC.",
    category: "Ticket",
    tags: ["hình ảnh", "tải lên", "định dạng"],
    helpful: 41,
    views: 145,
  },
  {
    id: "5",
    question: "Các kỹ sư có chuyên môn về loại cây trồng nào?",
    answer:
      "Đội ngũ kỹ sư của chúng tôi có chuyên môn đa dạng: Cây lương thực (lúa, ngô, khoai), Cây công nghiệp (cà phê, cao su, hồ tiêu), Cây ăn quả (xoài, nhãn, cam), Rau màu và hoa, Chăn nuôi (gia súc, gia cầm, thủy sản). Khi gửi ticket, hãy chọn đúng danh mục để được chuyển đến kỹ sư phù hợp.",
    category: "Chuyên môn",
    tags: ["kỹ sư", "chuyên môn", "cây trồng"],
    helpful: 67,
    views: 298,
  },
  {
    id: "6",
    question: "Tôi có thể yêu cầu tư vấn trực tiếp tại ruộng không?",
    answer:
      "Có, chúng tôi cung cấp dịch vụ tư vấn trực tiếp tại ruộng cho các trường hợp phức tạp. Dịch vụ này có phí và phụ thuộc vào khoảng cách địa lý. Để đăng ký, vui lòng gửi ticket với thông tin chi tiết về vấn đề và địa chỉ ruộng. Chúng tôi sẽ liên hệ để sắp xếp lịch hẹn phù hợp.",
    category: "Dịch vụ",
    tags: ["tư vấn", "trực tiếp", "ruộng"],
    helpful: 29,
    views: 112,
  },
  {
    id: "7",
    question:
      "Làm thế nào để biết lời khuyên có phù hợp với điều kiện địa phương?",
    answer:
      "Khi gửi ticket, hãy cung cấp thông tin về: vị trí địa lý (tỉnh/huyện), loại đất, khí hậu địa phương, và điều kiện cụ thể của ruộng. Kỹ sư sẽ tham khảo dữ liệu khí tượng và đất đai của khu vực để đưa ra lời khuyên phù hợp. Chúng tôi cũng có cơ sở dữ liệu về các giống cây trồng thích hợp cho từng vùng miền.",
    category: "Chuyên môn",
    tags: ["địa phương", "khí hậu", "đất đai"],
    helpful: 33,
    views: 156,
  },
  {
    id: "8",
    question: "Tôi có thể hủy hoặc chỉnh sửa ticket đã gửi không?",
    answer:
      "Bạn có thể chỉnh sửa hoặc bổ sung thông tin cho ticket trong vòng 30 phút sau khi gửi. Sau thời gian này, nếu cần thay đổi, vui lòng gửi ticket mới hoặc liên hệ hotline. Để hủy ticket, bạn có thể thực hiện trong vòng 1 giờ sau khi gửi, trừ khi kỹ sư đã bắt đầu xử lý.",
    category: "Ticket",
    tags: ["hủy", "chỉnh sửa", "thay đổi"],
    helpful: 25,
    views: 89,
  },
];

const categories = ["Tất cả", "Chung", "Ticket", "Chuyên môn", "Dịch vụ"];

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "Tất cả" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full sm:px-20 md:px-36 lg:px-40 xl:px-52 py-12 md:py-24">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
            Tìm câu trả lời nhanh cho những vấn đề phổ biến về dịch vụ hỗ trợ
            của chúng tôi.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            return (
              <Card key={faq.id} className="hover:shadow-md transition-shadow">
                <Collapsible
                  open={isOpen}
                  onOpenChange={() => toggleItem(faq.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-2">
                            <HelpCircle className="h-4 w-4 text-green-600" />
                            <Badge variant="outline" className="text-xs">
                              {faq.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {faq.views} lượt xem
                            </span>
                          </div>
                          <CardTitle className="text-lg font-semibold">
                            {faq.question}
                          </CardTitle>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{faq.helpful} người thấy hữu ích</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              👍 Hữu ích
                            </Button>
                            <Button variant="outline" size="sm">
                              👎 Không hữu ích
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              Không tìm thấy câu hỏi nào
            </h3>
            <p className="text-gray-400 mb-4">
              Thử thay đổi từ khóa tìm kiếm hoặc danh mục.
            </p>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Gửi câu hỏi mới
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-2">
                Không tìm thấy câu trả lời?
              </h3>
              <p className="text-gray-600 mb-4">
                Đội ngũ kỹ sư nông nghiệp của chúng tôi sẵn sàng hỗ trợ bạn với
                bất kỳ vấn đề nào.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <TicketForm
                  trigger={
                    <Button className="bg-green-600 hover:bg-green-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Gửi ticket hỗ trợ
                    </Button>
                  }
                />
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat trực tiếp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
