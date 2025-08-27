import { Heart } from "lucide-react";

type LikeButtonProps = {
  likeCount: number;
  onClick?: () => void;
  hideCount?: boolean;
};

export function LikeButton({ likeCount, onClick }: LikeButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="flex flex-row items-center gap-0.5 text-xs text-gray-2"
    >
      <Heart className="size-4" />
      {<span>{likeCount}</span>}
    </button>
  );
}
