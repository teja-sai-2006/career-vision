import { Children, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const SelectContext = createContext(null);

function useSelectContext(component) {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(`${component} must be used within <Select />`);
  }
  return context;
}

export function Select({
  value,
  defaultValue = "",
  onValueChange,
  disabled = false,
  name,
  id,
  children,
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [options, setOptions] = useState([]);
  const [placeholder, setPlaceholder] = useState("");

  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (nextValue) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange]
  );

  const contextValue = useMemo(
    () => ({
      value: currentValue ?? "",
      disabled,
      setValue,
      name,
      id,
      options,
      setOptions,
      placeholder,
      setPlaceholder,
    }),
    [currentValue, disabled, id, name, options, placeholder, setValue, setOptions, setPlaceholder]
  );

  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>;
}

export function SelectTrigger({ className, children, ...props }) {
  const { value, disabled, setValue, name, id, options, placeholder } = useSelectContext("SelectTrigger");

  return (
    <div className="relative w-full">
      <select
        id={id}
        name={name}
        disabled={disabled}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={cn(
          "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }) {
  const { setPlaceholder } = useSelectContext("SelectValue");

  useEffect(() => {
    if (placeholder) {
      setPlaceholder(placeholder);
    }
  }, [placeholder, setPlaceholder]);

  return null;
}

export function SelectContent({ children }) {
  const { setOptions } = useSelectContext("SelectContent");

  const options = useMemo(() => {
    return ChildrenToOptions(children);
  }, [children]);

  useEffect(() => {
    setOptions(options);
    return () => setOptions([]);
  }, [options, setOptions]);

  return null;
}

function ChildrenToOptions(children) {
  return Children.toArray(children)
    .flatMap((child, index) => {
      if (child?.type === SelectItem) {
        return (
          <option key={child.key ?? index} value={child.props.value} disabled={child.props.disabled}>
            {child.props.children}
          </option>
        );
      }
      if (child?.props?.children) {
        return ChildrenToOptions(child.props.children);
      }
      return [];
    });
}

export function SelectItem({ value, children, disabled }) {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  );
}
