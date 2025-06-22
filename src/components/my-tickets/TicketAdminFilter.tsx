import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { TicketFormDialog } from "../admin/ticket_form_dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface TicketFilterProps {
  onFilterChange: (filters: TicketsQueryParams) => void;
  currentFilters: TicketsQueryParams;
}

export function TicketAdminFilter({
  currentFilters,
  onFilterChange,
}: TicketFilterProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.title || "");
  const [searchFarmerTerm, setSearchFarmerTerm] = useState(
    currentFilters.farmerName || ""
  );
  const [searchEngineerTerm, setSearchEngineerTerm] = useState(
    currentFilters.assignedEngineerName || ""
  );

  const [selectedStatus, setSelectedStatus] = useState<
    "open" | "assigned" | "in_progress" | "resolved" | "closed" | undefined
  >(currentFilters.status || undefined);
  const [selectedPriority, setSelectedPriority] = useState<
    "low" | "medium" | "high" | "urgent" | undefined
  >(currentFilters.priority || undefined);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedSearchFarmerTerm = useDebounce(searchFarmerTerm, 500);
  const debouncedSearchEngineerTerm = useDebounce(searchEngineerTerm, 500);

  useEffect(() => {
    onFilterChange({
      title: debouncedSearchTerm,
      farmerName: debouncedSearchFarmerTerm,
      assignedEngineerName: debouncedSearchEngineerTerm,
      priority: selectedPriority,
      status: selectedStatus,
      pageNumber: 1, // Reset to first page when filters change
    });
  }, [
    debouncedSearchTerm,
    debouncedSearchFarmerTerm,
    debouncedSearchEngineerTerm,
    selectedPriority,
    selectedStatus,
    onFilterChange,
  ]);

  const handleStatusChange = (
    status:
      | "open"
      | "assigned"
      | "in_progress"
      | "resolved"
      | "closed"
      | undefined
  ) => {
    setSelectedStatus(status);
  };

  const handlePriorityChange = (
    priority: "low" | "medium" | "high" | "urgent" | undefined
  ) => {
    setSelectedPriority(priority);
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm ticket"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm nông dân"
            value={searchFarmerTerm}
            onChange={(e) => setSearchFarmerTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm kỹ sư"
            value={searchEngineerTerm}
            onChange={(e) => setSearchEngineerTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <TicketFormDialog
          trigger={
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Ticket
            </Button>
          }
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <Select
          value={selectedStatus ? selectedStatus : "all"}
          onValueChange={(value) => {
            handleStatusChange(
              value === "all"
                ? undefined
                : (value as
                    | "open"
                    | "assigned"
                    | "in_progress"
                    | "resolved"
                    | "closed")
            );
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="open">Mở</SelectItem>
            <SelectItem value="assigned">Đã phân công</SelectItem>
            <SelectItem value="in_progress">Đang xử lý</SelectItem>
            <SelectItem value="resolved">Đã giải quyết</SelectItem>
            <SelectItem value="closed">Đã đóng</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedPriority ? selectedPriority : "all"}
          onValueChange={(value) => {
            handlePriorityChange(
              value === "all"
                ? undefined
                : (value as "low" | "medium" | "high" | "urgent")
            );
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Độ ưu tiên" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả độ ưu tiên</SelectItem>
            <SelectItem value="low">Thấp</SelectItem>
            <SelectItem value="medium">Trung bình</SelectItem>
            <SelectItem value="high">Cao</SelectItem>
            <SelectItem value="urgent">Khẩn cấp</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
