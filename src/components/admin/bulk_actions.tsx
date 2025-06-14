"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Eye, EyeOff } from "lucide-react";

interface BulkActionsProps {
  selectedItems: number[];
  onBulkAction: (action: string, items: number[]) => void;
  onClearSelection: () => void;
}

export function BulkActions({
  selectedItems,
  onBulkAction,
  onClearSelection,
}: BulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const handleBulkAction = () => {
    if (selectedAction === "delete") {
      setShowDeleteDialog(true);
      return;
    }

    onBulkAction(selectedAction, selectedItems);
    onClearSelection();
    setSelectedAction("");
  };

  const handleDelete = () => {
    onBulkAction("delete", selectedItems);
    onClearSelection();
    setShowDeleteDialog(false);
  };

  if (selectedItems.length === 0) return null;

  return (
    <>
      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <span className="text-sm font-medium">
          Đã chọn {selectedItems.length} sản phẩm
        </span>

        <Select value={selectedAction} onValueChange={setSelectedAction}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn thao tác" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="activate">
              <div className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                Kích hoạt
              </div>
            </SelectItem>
            <SelectItem value="deactivate">
              <div className="flex items-center">
                <EyeOff className="mr-2 h-4 w-4" />
                Vô hiệu hóa
              </div>
            </SelectItem>
            <SelectItem value="delete" className="text-red-600">
              <div className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleBulkAction}
          disabled={!selectedAction}
          variant={selectedAction === "delete" ? "destructive" : "default"}
        >
          Thực hiện
        </Button>

        <Button variant="outline" onClick={onClearSelection}>
          Bỏ chọn
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {selectedItems.length} sản phẩm đã chọn?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
