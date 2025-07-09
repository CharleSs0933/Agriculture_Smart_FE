import * as z from "zod";

export const farmerSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "Bắt buộc nhập tên đăng nhập"),
  email: z.string().email("Email không hợp lệ"),
  password: z
    .union([z.string().min(6, "Mật khẩu phải từ 6 ký tự"), z.literal("")])
    .optional(), // Cho phép bỏ trống khi cập nhật
  address: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, "Bắt buộc nhập số điện thoại")
    .regex(/^[0-9+()\-\s]{6,}$/, "Số điện thoại không hợp lệ"),
  farmLocation: z.string().optional(),
  farmSize: z
    .number({ invalid_type_error: "Phải là số" })
    .min(1, "Vui lòng nhập diện tích hợp lệ"),
  cropTypes: z.string(),
  farmingExperienceYears: z
    .number({ invalid_type_error: "Phải là số" })
    .min(0, "Kinh nghiệm không được âm"),
});

export type FarmerFormData = z.infer<typeof farmerSchema>;

export const engineerSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password: z
    .union([z.string().min(6, "Mật khẩu phải từ 6 ký tự"), z.literal("")])
    .optional(), // Cho phép bỏ trống khi cập nhật
  address: z.string().min(5, "Vui lòng nhập địa chỉ"),
  phoneNumber: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^[0-9+()\-\s]{6,}$/, "Số điện thoại không hợp lệ"),
  specialization: z.string().optional(),
  experienceYears: z
    .number({ invalid_type_error: "Phải là số" })
    .min(0, "Không được âm"),
  certification: z.string(), // JSON string dạng ["cert1", "cert2"]
  bio: z.string().optional(),
});

export type EngineerFormData = z.infer<typeof engineerSchema>;
