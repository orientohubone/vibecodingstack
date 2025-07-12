"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ className, value, onValueChange, children, ...props }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(value);

  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  // Find first TabsTrigger's value as default if not set
  React.useEffect(() => {
    if (!internalValue) {
      React.Children.forEach(children, (child: any) => {
        if (
          React.isValidElement(child) &&
          typeof child.type === "function" &&
          (child.type.displayName === "TabsTrigger")
        ) {
          setInternalValue(child.props.value);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  // Clone children and inject props
  const clonedChildren = React.Children.map(children, (child: any) => {
    if (!React.isValidElement(child)) return child;
    if (
      typeof child.type === "function" &&
      child.type.displayName === "TabsList"
    ) {
      return React.cloneElement(child, {
        value: internalValue,
        onValueChange: handleValueChange,
      });
    }
    if (
      typeof child.type === "function" &&
      child.type.displayName === "TabsContent"
    ) {
      return React.cloneElement(child, {
        activeValue: internalValue,
      });
    }
    return child;
  });

  return (
    <div className={cn("w-full", className)} {...props}>
      {clonedChildren}
    </div>
  );
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}
export function TabsList({ className, value, onValueChange, children, ...props }: TabsListProps) {
  return (
    <div className={cn("inline-flex items-center justify-center rounded-lg bg-muted p-1", className)} {...props}>
      {React.Children.map(children, (child: any) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              isActive: child.props.value === value,
              onClick: () => onValueChange?.(child.props.value),
            })
          : child
      )}
    </div>
  );
}
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  isActive?: boolean;
  children: React.ReactNode;
}
export function TabsTrigger({ className, value, isActive, children, ...props }: TabsTriggerProps) {
  return (
    <button
      className={cn(
        "inline-flex min-w-[100px] items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-background text-foreground shadow"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue?: string;
  children: React.ReactNode;
}
export function TabsContent({ className, value, activeValue, children, ...props }: TabsContentProps) {
  if (value !== activeValue) return null;
  return (
    <div
      className={cn(
        "mt-2 rounded-xl border border-muted bg-background p-6 shadow-sm focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
TabsContent.displayName = "TabsContent";
