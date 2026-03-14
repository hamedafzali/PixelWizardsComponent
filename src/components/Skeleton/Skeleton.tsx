import React from "react";
import { clsx } from "clsx";
import { SkeletonProps } from "./Skeleton.types";

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  radius = "8px",
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={clsx("pw-skeleton", className)}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
      {...props}
    />
  );
};
