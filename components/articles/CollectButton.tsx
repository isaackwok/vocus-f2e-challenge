import { Bookmark } from "lucide-react";

type CollectButtonProps = {
  onClick?: () => void;
};

export function CollectButton({ onClick }: CollectButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="flex flex-row items-center gap-0.5 text-xs text-gray-2"
    >
      <Bookmark className="size-4" />
    </button>
  );
}
