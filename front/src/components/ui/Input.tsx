import { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type InputVariant = "primary" | "secondary" | "ghost";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
}

const variantClasses: Record<InputVariant, string> = {
  primary: "bg-white/10 border border-white/20 focus:ring-pink",
  secondary: "bg-cream text-bg-dark border border-rose/30 focus:ring-purple",
  ghost: "bg-transparent border border-rose/40 focus:ring-rose",
};

export default function Input({
  label,
  error,
  variant = "primary",
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm mb-1">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={cn(
          "w-full px-3 py-2 rounded-md outline-none focus:ring-2",
          variantClasses[variant],
          error && "border-red-400 focus:ring-red-400",
          className
        )}
        {...props}
      />

      {error && <p className="text-xs text-red-300 mt-1">{error}</p>}
    </div>
  );
}