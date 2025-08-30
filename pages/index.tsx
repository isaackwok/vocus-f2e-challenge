import { Card } from "@/components/shared/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto mt-[70px] flex max-w-screen-md justify-center gap-5">
      <Link
        className="hidden size-fit underline md:block"
        href="/user/601aa114fd89780001d24d4d"
      >
        <Card variant="elevated">前往彭顯惠的文章</Card>
      </Link>
      <Link
        className="block size-fit underline md:hidden"
        href="/user/601aa114fd89780001d24d4d"
      >
        <Card variant="flat">前往彭顯惠的文章</Card>
      </Link>
    </div>
  );
}
