import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Xin chào, Admin! Đây là tổng quan về hệ thống của bạn.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-gray-500">
              +12 sản phẩm mới trong tháng
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-gray-500">+24% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Người dùng</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-gray-500">
              +86 người dùng mới trong tháng
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2M</div>
            <p className="text-xs text-green-500">+12.5% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Hạt giống lúa ST25", sales: 124 },
                { name: "Phân bón NPK 16-16-8", sales: 98 },
                { name: "Thuốc trừ sâu sinh học", sales: 86 },
                { name: "Máy phun thuốc", sales: 65 },
                { name: "Hạt giống rau cải xanh", sales: 54 },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-gray-500">{product.sales} đã bán</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#AG1234",
                  customer: "Nguyễn Văn A",
                  status: "Đã giao",
                  amount: "1.2M",
                },
                {
                  id: "#AG1235",
                  customer: "Trần Thị B",
                  status: "Đang giao",
                  amount: "850K",
                },
                {
                  id: "#AG1236",
                  customer: "Lê Văn C",
                  status: "Đang xử lý",
                  amount: "2.4M",
                },
                {
                  id: "#AG1237",
                  customer: "Phạm Thị D",
                  status: "Đã giao",
                  amount: "1.5M",
                },
                {
                  id: "#AG1238",
                  customer: "Hoàng Văn E",
                  status: "Đã hủy",
                  amount: "750K",
                },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-500">
                      {order.customer}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm ${
                        order.status === "Đã giao"
                          ? "text-green-500"
                          : order.status === "Đã hủy"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      {order.status}
                    </div>
                    <div className="font-medium">{order.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
