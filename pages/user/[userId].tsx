import { AuthorArticleList } from "@/components/articles/AuthorArticleList";
import { UserHeader } from "@/components/users/UserHeader";
import { getUser } from "@/services/user/get-user";
import { getUserArticles } from "@/services/user/get-user-articles";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

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

  const user = await getUser({ userId });

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
      user,
    },
  };
}

export default function AuthorPage({
  articles,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <main className="mx-auto max-w-screen-md">
        <UserHeader user={user} />
        <div className="my-4 h-px w-full bg-gray-4" />
        <AuthorArticleList articles={articles} />
      </main>
    </>
  );
}
