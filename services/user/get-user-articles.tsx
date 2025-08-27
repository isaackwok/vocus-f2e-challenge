import z from "zod";

const UserSchema = z.object({
  _id: z.string(),
  fullname: z.string(),
  avatarUrl: z.string(),
  // add more fields if needed
});
const ArticleSchema = z.object({
  _id: z.string(),
  title: z.string(),
  abstract: z.string(),
  thumbnailUrl: z.string(),
  likeCount: z.number(),
  collectCount: z.number(),
  user: UserSchema,
  // add more fields if needed
});
const GetUserArticlesParamsSchema = z
  .object({
    userId: z.string(),
    page: z.number().optional().default(1),
    num: z.number().optional().default(10),
  })
  .transform((params) => {
    return {
      ...params,
      page: params.page.toString(),
      num: params.num.toString(),
    };
  });
const GetUserArticlesResponseSchema = z.object({
  articles: z.array(ArticleSchema),
  count: z.number(),
});

export type GetUserArticlesResponse = z.infer<
  typeof GetUserArticlesResponseSchema
>;
export type GetUserArticlesParams = z.input<typeof GetUserArticlesParamsSchema>;

/**
 * @example `https://api-staging.vocus.cc/api/articles?userId=601aa114fd89780001d24d4d&num=10&page=1`
 * @param `GetUserArticlesParams`
 * @returns `GetUserArticlesResponse`
 */
export async function getUserArticles(
  params: GetUserArticlesParams,
): Promise<GetUserArticlesResponse> {
  const query = new URLSearchParams(GetUserArticlesParamsSchema.parse(params));
  const res = await fetch(
    `https://api-staging.vocus.cc/api/articles?${query.toString()}`,
  );
  const data = await res.json().then(GetUserArticlesResponseSchema.parse);
  return data;
}
