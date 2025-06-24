"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  Award,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { useGetEngineerQuery } from "@/state/apiAdmin";

interface AssignEngineerDialogProps {
  ticketId: number;
  trigger: React.ReactNode;
}

const SPECIALIZATIONS = [
  "Bệnh học thực vật",
  "Bệnh cây trồng",
  "Sâu hại",
  "Kỹ thuật canh tác",
  "Dinh dưỡng cây trồng",
  "Bảo vệ thực vật",
  "Cơ khí nông nghiệp",
  "Khoa học đất",
  "Tưới tiêu",
  "Công nghệ sinh học",
];

export function AssignEngineerDialog({
  ticketId,
  trigger,
}: AssignEngineerDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(
    null
  );
  const [filterSpecialization, setFilterSpecialization] = useState<
    string | undefined
  >(undefined);
  const [filterExperience, setFilterExperience] = useState<string | undefined>(
    undefined
  );

  // Fetch engineers data
  const {
    data: engineersData,
    isLoading: isLoadingEngineers,
    error: engineersError,
  } = useGetEngineerQuery({
    pageNumber: 1,
    pageSize: 50,
    specialization: filterSpecialization,
    experienceYears: filterExperience ? Number(filterExperience) : undefined,
  });

  // Assign engineer mutation
  // const [assignEngineer, { isLoading: isAssigning }] =
  //   useAssignEngineerToTicketMutation();

  const handleAssign = async () => {
    if (!selectedEngineer) return;

    // try {
    //   await assignEngineer({
    //     ticketId,
    //     engineerId: selectedEngineerId,
    //   }).unwrap();

    //   toast({
    //     title: "Thành công",
    //     description: `Đã phân công kỹ sư ${selectedEngineer?.userName} cho ticket #${ticketId}`,
    //   });

    //   setOpen(false);
    //   setSelectedEngineerId(null);
    //   setSearchTerm("");
    //   setFilterSpecialization("");
    //   setFilterExperience("");
    // } catch (error) {
    //   toast({
    //     title: "Lỗi",
    //     description: "Không thể phân công kỹ sư. Vui lòng thử lại.",
    //     variant: "destructive",
    //   });
    // }
  };

  const resetFilters = () => {
    setFilterSpecialization("");
    setFilterExperience(undefined);
    setSelectedEngineer(null);
  };

  const parseCertifications = (certificationString: string): string[] => {
    try {
      return JSON.parse(certificationString);
    } catch {
      return [certificationString];
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="min-w-[70vw] max-h-[95vh]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">
            Phân công kỹ sư cho Ticket #{ticketId}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Filters & Search */}
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Label className="font-medium">Bộ lọc</Label>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Kinh nghiệm tối thiểu"
                  value={filterExperience || ""}
                  onChange={(e) => setFilterExperience(e.target.value)}
                  type="number"
                  className="pl-10"
                />
              </div>

              {/* Specialization Filter */}
              <div className="space-y-2">
                <Label className="text-sm">Chuyên môn</Label>
                <Select
                  value={filterSpecialization}
                  onValueChange={(value) =>
                    setFilterSpecialization(value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chuyên môn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả chuyên môn</SelectItem>
                    {SPECIALIZATIONS.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full"
              >
                Xóa bộ lọc
              </Button>
            </div>

            {/* Stats */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="text-sm font-medium">Thống kê</div>
              <div className="text-xs text-muted-foreground">
                Tổng: {engineersData?.totalCount || 0} kỹ sư
              </div>
              <div className="text-xs text-muted-foreground">
                Hiển thị: {engineersData?.items.length || 0} kỹ sư
              </div>
            </div>
          </div>

          {/* Middle Panel - Engineers List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Danh sách kỹ sư</Label>
              {isLoadingEngineers && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>

            <ScrollArea className="h-[400px] pr-4">
              {isLoadingEngineers ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Đang tải...</p>
                  </div>
                </div>
              ) : engineersError ? (
                <div className="text-center py-8 text-red-500">
                  <p>Không thể tải danh sách kỹ sư</p>
                  <p className="text-sm">Vui lòng thử lại</p>
                </div>
              ) : engineersData?.items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Không tìm thấy kỹ sư phù hợp</p>
                  <p className="text-sm">Thử điều chỉnh bộ lọc</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {engineersData?.items.map((engineer: Engineer) => (
                    <div
                      key={engineer.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedEngineer?.id === engineer.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedEngineer(engineer)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback className="bg-primary/10">
                            {engineer.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">
                              {engineer.userName}
                            </h4>
                            {selectedEngineer === engineer && (
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs mb-2">
                            {engineer.specialization}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{engineer.experienceYears} năm KN</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Right Panel - Engineer Details */}
          <div className="lg:col-span-1 space-y-4">
            <Label className="font-medium">Chi tiết kỹ sư</Label>

            {selectedEngineer ? (
              <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-primary/10 text-lg">
                      {selectedEngineer.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">
                    {selectedEngineer.userName}
                  </h3>
                  <Badge variant="outline" className="mt-1">
                    {selectedEngineer.specialization}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{selectedEngineer.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEngineer.phoneNumber}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-xs leading-relaxed">
                      {selectedEngineer.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedEngineer.experienceYears} năm kinh nghiệm
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium">Chứng chỉ:</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {parseCertifications(selectedEngineer.certification).map(
                        (cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs mr-1 mb-1"
                          >
                            {cert}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">
                      Tham gia:{" "}
                      {new Date(selectedEngineer.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <User className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Chọn một kỹ sư để xem chi tiết
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedEngineer ? (
              <span>
                Đã chọn: <strong>{selectedEngineer.userName}</strong>
              </span>
            ) : (
              <span>Chưa chọn kỹ sư nào</span>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              // disabled={isAssigning}
            >
              Hủy
            </Button>
            <Button
              onClick={handleAssign}
              // disabled={
              //   !selectedEngineerId || isAssigning || isLoadingEngineers
              // }
              className="min-w-[120px]"
            >
              {/* {isAssigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAssigning ? "Đang phân công..." : "Phân công"} */}
              Phân công
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
