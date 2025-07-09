"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, X } from "lucide-react";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/state/apiAdmin";
import { toast } from "sonner";
import Image from "next/image";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: () => void;
}

const categories = [
  { id: 1, name: "Phân bón", slug: "phan-bon" },
  { id: 2, name: "Thuốc BVTV", slug: "thuoc-bvtv" },
  { id: 3, name: "Giống cây trồng", slug: "giong-cay-trong" },
  { id: 4, name: "Dụng cụ nông nghiệp", slug: "dung-cu-nong-nghiep" },
  { id: 5, name: "Máy móc", slug: "may-moc" },
];

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSave,
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    categoryId: 0,
    stock: 0,
    sku: "",
    isActive: true,
    imageUrl: "",
  });

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        discountPrice: product.discountPrice || 0,
        categoryId: product.categoryId || 0,
        stock: product.stock || 0,
        sku: product.sku || "",
        isActive: product.isActive ?? true,
        imageUrl: product.imageUrl || "",
      });
    } else {
      resetForm();
    }
  }, [product, open]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      categoryId: 0,
      stock: 0,
      sku: "",
      isActive: true,
      imageUrl: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, sku, categoryId, price, stock } = formData;

    if (!name || !sku || !categoryId || !price || !stock) {
      toast.error("Vui lòng nhập đầy đủ các trường bắt buộc");
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price) || 0,
      discountPrice: Number(formData.discountPrice) || 0,
      categoryId: Number(formData.categoryId) || 0,
      stock: Number(formData.stock) || 0,
    };

    try {
      if (product) {
        await updateProduct({ id: product.id, data: productData }).unwrap();
        toast.success("Cập nhật sản phẩm thành công");
      } else {
        await createProduct(productData).unwrap();
        toast.success("Thêm sản phẩm thành công");
      }

      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error("Save product error:", error);
      toast.error("Có lỗi xảy ra khi lưu sản phẩm");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Cập nhật thông tin sản phẩm"
              : "Nhập thông tin sản phẩm mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên + SKU */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên sản phẩm *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* Giá, khuyến mãi, tồn kho */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Giá bán *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPrice">Giá khuyến mãi</Label>
              <Input
                id="discountPrice"
                type="number"
                value={formData.discountPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPrice: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Tồn kho *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>

          {/* Danh mục */}
          <div className="space-y-2">
            <Label>Danh mục *</Label>
            <Select
              value={formData.categoryId.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: Number(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hình ảnh */}
          <div className="space-y-2">
            <Label>Hình ảnh</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              {formData.imageUrl ? (
                <div className="relative">
                  <Image
                    src={formData.imageUrl}
                    alt="Ảnh sản phẩm"
                    className="w-full h-48 object-cover rounded-lg"
                    width={400}
                    height={200}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:text-primary/80">
                      Tải ảnh lên
                    </span>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF tối đa 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Kích hoạt */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
            <Label htmlFor="isActive">Kích hoạt sản phẩm</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Đang xử lý..."
                : product
                ? "Cập nhật"
                : "Thêm mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
