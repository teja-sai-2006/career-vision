import { cloneElement, createContext, useContext, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const SidebarContext = createContext(null);

function useSidebar(component) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(`${component} must be used within <SidebarProvider />`);
  }
  return context;
}

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const contextValue = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </SidebarContext.Provider>
  );
}

export function Sidebar({ className, children }) {
  const { open } = useSidebar("Sidebar");

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-white/90 backdrop-blur-xl transition-transform duration-300 md:relative md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ className, children }) {
  return <div className={cn("px-4 py-5", className)}>{children}</div>;
}

export function SidebarContent({ className, children }) {
  return <div className={cn("flex-1 overflow-y-auto", className)}>{children}</div>;
}

export function SidebarFooter({ className, children }) {
  return <div className={cn("px-4 py-5", className)}>{children}</div>;
}

export function SidebarGroup({ className, children }) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function SidebarGroupLabel({ className, children }) {
  return <div className={cn("px-4 text-xs font-semibold uppercase text-slate-500", className)}>{children}</div>;
}

export function SidebarGroupContent({ className, children }) {
  return <div className={cn("space-y-1", className)}>{children}</div>;
}

export function SidebarMenu({ className, children }) {
  return <nav className={cn("space-y-1 px-1", className)}>{children}</nav>;
}

export function SidebarMenuItem({ className, children }) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

export function SidebarMenuButton({ className, asChild = false, children, ...props }) {
  const contentClassName = cn(
    "flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
    className
  );

  if (asChild && children && typeof children === "object") {
    return cloneElement(children, {
      ...props,
      className: cn(children.props.className, contentClassName),
    });
  }

  return (
    <button type="button" className={contentClassName} {...props}>
      {children}
    </button>
  );
}

export function SidebarTrigger({ className, children, ...props }) {
  const { open, setOpen } = useSidebar("SidebarTrigger");

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 md:hidden",
        className
      )}
      onClick={() => setOpen(!open)}
      aria-label="Toggle navigation"
      {...props}
    >
      {children ?? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
