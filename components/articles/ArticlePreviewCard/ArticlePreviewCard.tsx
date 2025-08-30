import Link from "next/link";
import { Card } from "../../shared/Card";
import { Thumbnail } from "./Thumbnail";
import { Footer } from "./Footer";
import { Abstract } from "./Abstract";

type ArticlePreviewCardProps = {
  variant: "elevated" | "flat";
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
    <Link href={`/article/${articleId}`}>
      <Card variant={variant} className="flex flex-col gap-5">
        <div className="flex flex-row gap-7">
          <Abstract title={title} abstract={abstract} />
          <Thumbnail
            variant={variant}
            thumbnailUrl={thumbnailUrl}
            alt={title}
          />
        </div>

        <Footer user={user} likeCount={likeCount} />
      </Card>
    </Link>
  );
}
