import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

function useTabsContext(component) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${component} must be used within <Tabs />`);
  }
  return context;
}

export function Tabs({ value, defaultValue, onValueChange, children, className }) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);

  const activeValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (nextValue) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange]
  );

  const contextValue = useMemo(() => ({ value: activeValue, setValue }), [activeValue, setValue]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-slate-100 p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children, ...props }) {
  const { value: activeValue, setValue } = useTabsContext("TabsTrigger");
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => setValue(value)}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all",
        isActive
          ? "bg-white text-purple-600 shadow"
          : "text-slate-600 hover:text-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { value: activeValue } = useTabsContext("TabsContent");
  if (activeValue !== value) {
    return null;
  }
  return <div className={className}>{children}</div>;
}
