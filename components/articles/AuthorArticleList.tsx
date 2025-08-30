import { GetUserArticlesResponse } from "@/services/user/get-user-articles";
import { Fragment } from "react";
import { ArticlePreviewCard } from "./ArticlePreviewCard";
import Link from "next/link";

type AuthorArticleListProps = {
  articles: GetUserArticlesResponse["articles"];
};

export function AuthorArticleList({ articles }: AuthorArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 mx-auto -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-2xl text-gray-2">No articles found.</p>
        <Link className="text-base text-gray-4 underline" href="/">
          Back to home
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="mt-8 flex flex-col px-5 md:hidden">
        {articles.map((article, idx) => (
          <Fragment key={article._id}>
            <ArticlePreviewCard
              variant="flat"
              articleId={article._id}
              title={article.title}
              abstract={article.abstract}
              thumbnailUrl={article.thumbnailUrl}
              likeCount={article.likeCount}
              user={article.user}
            />
            {idx !== articles.length - 1 && (
              <div className="my-5 h-px bg-gray-4" />
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-8 hidden md:grid md:grid-cols-2 md:gap-4">
        {articles.map((article) => (
          <ArticlePreviewCard
            variant="elevated"
            key={article._id}
            articleId={article._id}
            title={article.title}
            abstract={article.abstract}
            thumbnailUrl={article.thumbnailUrl}
            likeCount={article.likeCount}
            user={article.user}
          />
        ))}
      </div>
    </>
  );
}
