import { cloneElement, forwardRef } from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700",
  secondary: "bg-slate-800 text-white hover:bg-slate-900",
  outline: "border border-slate-200 text-slate-700 hover:bg-slate-50",
  ghost: "hover:bg-slate-100 text-slate-600",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export const Button = forwardRef(function Button(
  { className, variant = "default", size = "default", asChild = false, children, ...props },
  ref
) {
  if (asChild && children && typeof children === "object") {
    return cloneElement(children, {
      ref,
      className: cn(
        baseClasses,
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.default,
        children.props.className,
        className
      ),
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
