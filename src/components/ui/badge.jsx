import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
  secondary: "bg-slate-100 text-slate-700",
  outline: "border border-slate-200 text-slate-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
};

export const Badge = forwardRef(function Badge(
  { className, variant = "default", ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border border-transparent px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    />
  );
});
