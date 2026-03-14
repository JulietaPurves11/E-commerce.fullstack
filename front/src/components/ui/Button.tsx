import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    as: "link";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-pink text-bg-dark hover:bg-pink/80",
  secondary: "bg-purple text-cream hover:bg-purple/80",
  ghost: "bg-transparent text-cream border border-rose/40 hover:bg-rose/20",
};

const baseClasses =
  "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export default function Button(props: ButtonProps) {
  const { variant = "primary", fullWidth = false, className, children } = props;

  const classes = cn(
    baseClasses,
    fullWidth && "w-full",
    variantClasses[variant],
    className
  );

  if (props.as === "link") {
    const { href, as: _as, fullWidth: _fullWidth, variant: _variant, ...linkProps } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { as: _as, fullWidth: _fullWidth, variant: _variant, ...buttonProps } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}