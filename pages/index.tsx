import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-md">
      <Link className="underline" href="/user/601aa114fd89780001d24d4d">
        前往彭顯惠的文章
      </Link>
    </div>
  );
}
