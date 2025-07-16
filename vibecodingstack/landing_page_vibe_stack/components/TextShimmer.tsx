import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

const TextShimmer = ({
  children,
  as: Component = "h1",
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) => {
  const content = typeof children === "string" ? children : "";

  const dynamicSpread = React.useMemo(() => {
    return content.length * spread;
  }, [content, spread]);

  return (
    <motion.div
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#9ca3af] [--base-gradient-color:#ffffff]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      style={{
        '--spread': `${dynamicSpread}px`,
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
      } as React.CSSProperties}
    >
      <Component>{children}</Component>
    </motion.div>
  );
};

export default TextShimmer;
