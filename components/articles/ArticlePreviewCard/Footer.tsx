import { CollectButton } from "../CollectButton";
import { LikeButton } from "../LikeButton";
import Image from "next/image";

type FooterProps = {
  user: {
    fullname: string;
    avatarUrl: string;
  };
  likeCount: number;
};

export function Footer({ user, likeCount }: FooterProps) {
  return (
    <div className="flex flex-row items-baseline justify-between gap-4">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={user.avatarUrl}
          alt={user.fullname}
          className="rounded-full object-cover object-center"
          width={29.86}
          height={29.86}
        />
        <div className="text-sm text-gray-1">{user.fullname}</div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <LikeButton likeCount={likeCount} />
        <CollectButton />
      </div>
    </div>
  );
}
