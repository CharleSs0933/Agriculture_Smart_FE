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
import { Clock, Award } from "lucide-react";

interface AssignEngineerDialogProps {
  ticketId: number;
  trigger: React.ReactNode;
}

const mockEngineers = [
  {
    id: 1,
    userName: "TS. Nguyễn Văn Minh",
    specialization: "Bệnh cây trồng",
    experienceYears: 12,
    certification: "Tiến sĩ Nông nghiệp",
    currentTickets: 3,
  },
  {
    id: 2,
    userName: "KS. Lê Thị Hoa",
    specialization: "Sâu hại",
    experienceYears: 8,
    certification: "Kỹ sư Bảo vệ thực vật",
    currentTickets: 2,
  },
  {
    id: 3,
    userName: "KS. Phạm Văn Tùng",
    specialization: "Kỹ thuật canh tác",
    experienceYears: 10,
    certification: "Kỹ sư Cơ khí nông nghiệp",
    currentTickets: 1,
  },
  {
    id: 4,
    userName: "TS. Trần Thị Lan",
    specialization: "Dinh dưỡng cây trồng",
    experienceYears: 15,
    certification: "Tiến sĩ Khoa học đất",
    currentTickets: 4,
  },
];

export function AssignEngineerDialog({
  ticketId,
  trigger,
}: AssignEngineerDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedEngineerId, setSelectedEngineerId] = useState("");

  const handleAssign = () => {
    if (selectedEngineerId) {
      console.log(
        "Assigning engineer",
        selectedEngineerId,
        "to ticket",
        ticketId
      );
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Phân công kỹ sư cho Ticket #{ticketId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Chọn kỹ sư</Label>
            <Select
              value={selectedEngineerId}
              onValueChange={setSelectedEngineerId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn kỹ sư phù hợp" />
              </SelectTrigger>
              <SelectContent>
                {mockEngineers.map((engineer) => (
                  <SelectItem key={engineer.id} value={engineer.id.toString()}>
                    <div className="flex items-center gap-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          {engineer.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{engineer.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {engineer.specialization}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Engineer Details */}
          <div className="space-y-4">
            <h4 className="font-semibold">Danh sách kỹ sư</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {mockEngineers.map((engineer) => (
                <div
                  key={engineer.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedEngineerId === engineer.id.toString()
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedEngineerId(engineer.id.toString())}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        {engineer.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium">{engineer.userName}</h5>
                        <Badge variant="outline">
                          {engineer.specialization}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{engineer.experienceYears} năm KN</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          <span>{engineer.certification}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge
                          variant={
                            engineer.currentTickets > 3
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {engineer.currentTickets} ticket đang xử lý
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleAssign} disabled={!selectedEngineerId}>
              Phân công
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
