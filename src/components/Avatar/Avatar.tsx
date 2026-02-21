import React from "react";
import { AvatarProps } from "./Avatar.types";
import { clsx } from "clsx";

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

function getInitials(name?: string) {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) return names[0][0] || "";
  return (names[0][0] || "") + (names[names.length - 1][0] || "");
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  fallback,
  size = "md",
  variant = "circle",
  className,
  ...props
}) => {
  const avatarSize = sizeMap[size] || sizeMap.md;
  const showFallback = !src;

  return (
    <span
      className={clsx(
        "pw-avatar",
        className,
        `pw-avatar--${size}`,
        `pw-avatar--${variant}`,
      )}
      style={{
        width: avatarSize,
        height: avatarSize,
        fontSize: avatarSize / 2.25,
        ...props.style,
      }}
      aria-label={alt || name}
      role="img"
    >
      {src && (
        <img
          src={src}
          alt={alt || name || "avatar"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          draggable={false}
          {...props}
        />
      )}
      {showFallback && (
        <span className="pw-avatar__fallback" aria-hidden="true">
          {fallback ?? getInitials(name || alt)}
        </span>
      )}
    </span>
  );
};
