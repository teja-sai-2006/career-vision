import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DropdownContext = createContext(null);

function useDropdownContext(component) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(`${component} must be used within <DropdownMenu />`);
  }
  return context;
}

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, menuRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild = false, children, className, ...props }) {
  const { open, setOpen } = useDropdownContext("DropdownMenuTrigger");

  const toggle = () => setOpen(!open);

  if (asChild && children && typeof children === "object") {
    return cloneElement(children, {
      onClick: (event) => {
        children.props.onClick?.(event);
        toggle();
      },
      className: cn(children.props.className, className),
    });
  }

  return (
    <button type="button" className={className} onClick={toggle} {...props}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className, align = "start", children }) {
  const { open, menuRef, setOpen } = useDropdownContext("DropdownMenuContent");

  if (!open) {
    return null;
  }

  const alignment = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 -translate-x-1/2",
  }[align];

  return (
    <div
      ref={menuRef}
      className={cn(
        "absolute z-50 mt-2 min-w-[180px] rounded-xl border border-slate-200 bg-white p-1 shadow-lg",
        alignment,
        className
      )}
    >
      {children}
      <button hidden type="button" onClick={() => setOpen(false)} />
    </div>
  );
}

export function DropdownMenuItem({ className, onClick, children, ...props }) {
  const { setOpen } = useDropdownContext("DropdownMenuItem");

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
