import { ReactNode } from "react";
import { cn } from "../lib/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm opacity-80 mt-1">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}