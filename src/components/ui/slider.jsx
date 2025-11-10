import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Slider = forwardRef(function Slider(
  { value = [0], min = 0, max = 100, step = 1, onValueChange, className, ...props },
  ref
) {
  const currentValue = Array.isArray(value) ? Number(value[0]) : Number(value);

  return (
    <input
      type="range"
      ref={ref}
      value={Number.isFinite(currentValue) ? currentValue : 0}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onValueChange?.([Number(event.target.value)])}
      className={cn(
        "h-2 w-full appearance-none rounded-full bg-slate-200",
        "accent-purple-600",
        className
      )}
      {...props}
    />
  );
});
