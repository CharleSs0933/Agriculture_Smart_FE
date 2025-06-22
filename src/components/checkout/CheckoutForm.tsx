"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Truck, MapPin } from "lucide-react";
import {
  useCreateOrderMutation,
  useCreatePaymentMutation,
  useGetCartQuery,
} from "@/state/api";

export function CheckoutForm() {
  const { data: cart } = useGetCartQuery();
  const router = useRouter();

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [createPayment, { isLoading: isCreatingPayment }] =
    useCreatePaymentMutation();

  const [formData, setFormData] = useState<{
    shippingAddress: string;
    paymentMethod: "cod" | "bank_transfer" | "wallet";
  }>({
    shippingAddress: "",
    paymentMethod: "cod",
  });

  // Safe access to cart items and totals
  const cartItems = cart?.cartItems || [];
  const subtotal = cart?.totalAmount || 0;

  // Calculate additional costs
  // const shipping = subtotal > 500000 ? 0 : 30000;
  // const tax = subtotal * 0.1;
  // const total = subtotal + shipping + tax;
  const total = subtotal;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate API call

      await createOrder({
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
      })
        .unwrap()
        .then(async (res) => {
          if (res.paymentMethod === "bank_transfer") {
            await createPayment({
              orderId: res.id,
              fullName: res.userName,
            })
              .unwrap()
              .then((res) => {
                window.location.href = res.paymentUrl;
              })
              .catch((error) => {
                console.log("Error creating payment", error);
              });
          }
          router.push("/checkout/success");
        });
    } catch (error) {
      console.log("Checkout error:", error);
      // Handle error - could show toast notification here
    }
  };

  // Show message if no items in cart
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Truck className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy thêm sản phẩm để tiếp tục
          thanh toán.
        </p>
        <Button onClick={() => router.push("/products")}>Mua sắm ngay</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Địa chỉ giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Địa chỉ *</Label>
                  <Input
                    id="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={(e) =>
                      handleInputChange("shippingAddress", e.target.value)
                    }
                    required
                  />
                </div>
                {/* 
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">Quận/Huyện *</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) =>
                        handleInputChange("district", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    id="note"
                    value={formData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết"
                  />
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Phương thức thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  handleInputChange("paymentMethod", value)
                }
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">
                    Thanh toán khi nhận hàng (COD)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50 mt-2">
                  <RadioGroupItem value="bank_transfer" id="bank" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    Chuyển khoản ngân hàng
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Đơn hàng của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-2 border-b"
                >
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                  <span>{formatCurrency(item.totalPrice)}</span>
                </div>
              ))}
              {/* 
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Thuế (10%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Phí vận chuyển:</span>
                {shipping === 0 ? (
                  <span className="text-green-600">Miễn phí</span>
                ) : (
                  <span>{formatCurrency(shipping)}</span>
                )}
              </div> */}

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isCreating || isCreatingPayment}
              >
                {isCreating || isCreatingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Đặt hàng
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
