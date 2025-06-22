import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { plantDiseases } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function getPlantDiseaseInfo(
  plantName: string,
  diseaseName: string
): {
  symptoms: string[];
  description: string;
  treatment: string;
} {
  const plantData = plantDiseases[plantName];
  if (plantData && plantData[diseaseName]) {
    return plantData[diseaseName];
  }

  // Fallback data if not found in database
  return {
    symptoms: [
      "Triệu chứng chưa được xác định cụ thể",
      "Cần quan sát thêm để đưa ra chẩn đoán chính xác",
      "Liên hệ chuyên gia để được tư vấn chi tiết",
    ],
    description: `Bệnh ${diseaseName} trên cây ${plantName} cần được nghiên cứu thêm để đưa ra thông tin chi tiết. Vui lòng liên hệ với chuyên gia nông nghiệp để được tư vấn cụ thể.`,
    treatment:
      "Liên hệ chuyên gia nông nghiệp để được tư vấn phương pháp điều trị phù hợp. Trong thời gian chờ đợi, hãy cách ly cây bệnh và theo dõi sự lan truyền.",
  };
}

// Helper function to parse crop types from JSON string to array
export function parseCropTypes(cropTypesJson: string): string[] {
  try {
    return JSON.parse(cropTypesJson);
  } catch {
    return [];
  }
}

// Helper function to stringify crop types from array to JSON string
export function stringifyCropTypes(cropTypes: string[]): string {
  return JSON.stringify(cropTypes);
}
