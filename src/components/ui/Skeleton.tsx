import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "rounded",
}) => {
  const variantStyles = {
    text: "h-3 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-2xl",
  };

  return (
    <div
      className={`bg-zinc-200/80 dark:bg-zinc-800/80 animate-pulse relative overflow-hidden ${variantStyles[variant]} ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer" />
    </div>
  );
};

export default Skeleton;
