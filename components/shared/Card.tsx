import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const variants = cva(null, {
  variants: {
    variant: {
      elevated:
        "px-5 py-4 bg-white shadow-card border border-gray-4 rounded-md",
      flat: "bg-transparent",
    },
  },
});

type CardProps = {
  children: React.ReactNode;
  variant: VariantProps<typeof variants>["variant"];
  className?: string;
};

export function Card({ children, variant, className }: CardProps) {
  return (
    <div className={twMerge(variants({ variant }), className)}>{children}</div>
  );
}
