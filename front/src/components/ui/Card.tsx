import { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type CardVariant = "primary" | "secondary" | "ghost";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  primary: "bg-bg-dark text-cream border border-white/10",
  secondary: "bg-cream text-bg-dark border border-rose/20",
  ghost: "bg-transparent text-cream border border-rose/30",
};

const paddingClasses = {
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

export default function Card({
  variant = "primary",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl shadow-sm",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}