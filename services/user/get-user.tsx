import z from "zod";

type GetUserParams = {
  userId: string;
};

const UserResponseSchema = z.object({
  _id: z.string(),
  username: z.string(),
  fullname: z.string(),
  avatarUrl: z.string(),
  followCount: z.number(),
  socialLinks: z.object({
    facebook: z.string().optional(),
  }),
  articleCount: z.number(),
  intro: z.string().optional(),
});

export type User = z.infer<typeof UserResponseSchema>;

export async function getUser({ userId }: GetUserParams) {
  const response = await fetch(`${process.env.VOCUS_API_URL}/users/${userId}`);
  const data = await response.json();
  return UserResponseSchema.parse(data);
}
