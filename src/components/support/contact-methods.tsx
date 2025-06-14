"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, Clock, MapPin, Users } from "lucide-react";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Chat trực tiếp",
    description: "Nhận hỗ trợ ngay lập tức từ đội ngũ tư vấn viên",
    availability: "24/7",
    action: "Bắt đầu chat",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Phone,
    title: "Hotline hỗ trợ",
    description: "Gọi điện trực tiếp để được tư vấn khẩn cấp",
    availability: "8:00 - 22:00",
    action: "1900 1234",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email hỗ trợ",
    description: "Gửi email chi tiết về vấn đề cần hỗ trợ",
    availability: "Phản hồi trong 24h",
    action: "support@agriculture.vn",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Users,
    title: "Cộng đồng",
    description: "Tham gia thảo luận với cộng đồng nông dân",
    availability: "Luôn hoạt động",
    action: "Tham gia ngay",
    color: "bg-orange-100 text-orange-600",
  },
];

const supportTeam = [
  {
    name: "TS. Nguyễn Văn An",
    role: "Chuyên gia cây lương thực",
    experience: "15 năm kinh nghiệm",
    specialties: ["Lúa", "Ngô", "Khoai"],
  },
  {
    name: "KS. Trần Thị Bình",
    role: "Chuyên gia bảo vệ thực vật",
    experience: "12 năm kinh nghiệm",
    specialties: ["Sâu bệnh", "Thuốc BVTV", "IPM"],
  },
  {
    name: "KS. Lê Minh Tuấn",
    role: "Chuyên gia kỹ thuật canh tác",
    experience: "10 năm kinh nghiệm",
    specialties: ["Tưới tiêu", "Nhà kính", "Hydroponics"],
  },
];

export function ContactMethods() {
  return (
    <section className="w-full sm:px-20 md:px-36 lg:px-40 xl:px-52 py-12">
      <div className=" px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Methods */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Các cách liên hệ</h3>
            <div className="grid gap-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${method.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">
                            {method.title}
                          </h4>
                          <p className="text-gray-600 mb-2">
                            {method.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              {method.availability}
                            </div>
                            <Button variant="outline" size="sm">
                              {method.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Support Team */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Đội ngũ chuyên gia</h3>
            <div className="space-y-4">
              {supportTeam.map((expert, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{expert.name}</h4>
                        <p className="text-green-600 font-medium mb-1">
                          {expert.role}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          {expert.experience}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {expert.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Location */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Văn phòng hỗ trợ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Trụ sở chính:</strong> 123 Đường Nông Nghiệp, Quận
                    1, TP.HCM
                  </p>
                  <p>
                    <strong>Chi nhánh Hà Nội:</strong> 456 Phố Nông Dân, Hoàn
                    Kiếm, Hà Nội
                  </p>
                  <p>
                    <strong>Chi nhánh Cần Thơ:</strong> 789 Đường Lúa Gạo, Ninh
                    Kiều, Cần Thơ
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
