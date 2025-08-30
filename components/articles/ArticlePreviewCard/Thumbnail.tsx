import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

const variants = cva("relative flex-shrink-0 rounded-[3px] overflow-hidden", {
  variants: {
    variant: {
      flat: "h-[52.5px] w-[100px]",
      elevated: "h-[57.75px] w-[110px]",
    },
  },
});

type ThumbnailProps = {
  variant: VariantProps<typeof variants>["variant"];
  thumbnailUrl: string;
  alt: string;
};

export function Thumbnail({ variant, thumbnailUrl, alt }: ThumbnailProps) {
  return (
    <div className={variants({ variant })}>
      <Image
        src={thumbnailUrl}
        alt={alt}
        sizes="110px"
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
