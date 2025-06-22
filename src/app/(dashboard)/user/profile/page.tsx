"use client";

import { useUser } from "@/hooks/userUser";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  const { user, isLoading: userLoading } = useUser();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Không thể tải thông tin hồ sơ
        </h1>
        <p className="text-gray-600">
          Đã xảy ra lỗi khi tải thông tin hồ sơ của bạn. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-6 max-w-4xl">
      <ProfileForm user={user} />
    </div>
  );
}
