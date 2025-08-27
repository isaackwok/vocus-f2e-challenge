import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "./LikeButton";
import { CollectButton } from "./CollectButton";
import { cva, VariantProps } from "class-variance-authority";

const variants = cva("flex flex-col gap-5", {
  variants: {
    variant: {
      elevated:
        "px-5 py-4 bg-white shadow-card border border-gray-4 rounded-md",
      flat: "bg-transparent",
    },
  },
});

const thumbnailVariants = cva(
  "relative flex-shrink-0 rounded-[3px] overflow-hidden",
  {
    variants: {
      variant: {
        flat: "h-[52.5px] w-[100px]",
        elevated: "h-[57.75px] w-[110px]",
      },
    },
  },
);

type ArticlePreviewCardProps = {
  variant: VariantProps<typeof variants>["variant"];
  articleId: string;
  title: string;
  abstract: string;
  thumbnailUrl: string;
  likeCount: number;
  user: {
    fullname: string;
    avatarUrl: string;
  };
};

export function ArticlePreviewCard({
  variant,
  articleId,
  title,
  abstract,
  thumbnailUrl,
  likeCount,
  user,
}: ArticlePreviewCardProps) {
  return (
    <Link href={`/articles/${articleId}`} className={variants({ variant })}>
      <div className="flex flex-row gap-7">
        {/* title and abstract */}
        <div className="flex flex-grow flex-col gap-[15px] *:leading-6">
          <h2 className="text-lg font-bold text-secondary-dark">{title}</h2>
          <p className="line-clamp-3 min-h-18 text-sm text-gray-2">
            {abstract}
          </p>
        </div>
        {/* thumbnail */}
        <div className={thumbnailVariants({ variant })}>
          <Image
            src={thumbnailUrl}
            alt={title}
            sizes="110px"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* user and like/collect */}
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
    </Link>
  );
}
