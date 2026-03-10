import { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type BadgeVariant = "primary" | "secondary" | "ghost";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-pink text-bg-dark",
  secondary: "bg-purple text-cream",
  ghost: "bg-transparent text-cream border border-rose/40",
};

export default function Badge({
  variant = "primary",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}