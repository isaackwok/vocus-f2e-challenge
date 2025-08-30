import { User } from "@/services/user/get-user";
import Image from "next/image";

type UserHeaderProps = {
  user: User;
};

export function UserHeader({ user }: UserHeaderProps) {
  return (
    <div className="mt-[28px] flex flex-col gap-5 p-4 md:mt-[70px] md:p-0">
      <div className="flex items-center gap-5">
        <Image
          src={user.avatarUrl}
          alt={user.fullname}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{user.fullname}</h1>
          <p className="text-sm text-gray-2">
            {user.articleCount} 篇文章 | {user.followCount} 個追蹤
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-2">{user.intro}</p>
    </div>
  );
}
