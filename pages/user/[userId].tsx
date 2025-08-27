import { ArticlePreviewCard } from "@/components/articles/ArticlePreviewCard";
import { getUserArticles } from "@/services/user/get-user-articles";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

const PAGE_SIZE = 4;
const MAX_AGE = 3600;

export async function getServerSideProps({
  params,
  req,
  res,
}: GetServerSidePropsContext) {
  const { userId } = params as { userId: string };

  const offset = Number(req.cookies.offset ?? "0");

  const { articles, count } = await getUserArticles({
    userId,
    page: offset / PAGE_SIZE + 1,
    num: PAGE_SIZE,
  });

  if (offset + PAGE_SIZE < count) {
    res.setHeader(
      "Set-Cookie",
      `offset=${offset + PAGE_SIZE}; max-age=${MAX_AGE}; path=/user/${userId}; HttpOnly`,
    );
  } else {
    res.setHeader(
      "Set-Cookie",
      `offset=${0}; max-age=${MAX_AGE}; path=/user/${userId}; HttpOnly`,
    );
  }

  return {
    props: {
      articles,
    },
  };
}

export default function AuthorPage({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <Head>
        <title>{articles[0].title}</title>
        <meta name="description" content={articles[0].abstract} />
        <meta property="og:title" content={articles[0].title} />
        <meta property="og:description" content={articles[0].abstract} />
        <meta property="og:image" content={articles[0].thumbnailUrl} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/user/${articles[0].user._id}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="vocus 方格子" />
      </Head>
      <main>
        <div className="mt-[28px] flex flex-col px-5 md:hidden">
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
        <div className="mt-[70px] hidden md:grid md:grid-cols-2 md:gap-4">
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
      </main>
    </>
  );
}
