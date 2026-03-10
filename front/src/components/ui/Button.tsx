import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-pink text-bg-dark hover:bg-pink/80",
  secondary:
    "bg-purple text-cream hover:bg-purple/80",
  ghost:
    "bg-transparent text-cream border border-rose/40 hover:bg-rose/20",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}