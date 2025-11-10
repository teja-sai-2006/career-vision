import { cn } from "@/lib/utils";

export function Progress({ value = 0, className }) {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
