import { ImgHTMLAttributes, ReactNode } from 'react';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size' | 'srcSet'> {
  /** Image source (optional if using fallback) */
  src?: string;
  /** Alt text for image, or name for initials fallback (for accessibility) */
  alt?: string;
  /** User name, used for initials fallback if no src */
  name?: string;
  /** Size of Avatar (default: md) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Rendered when no src: string, element, or function */
  fallback?: ReactNode;
  /** Variant: circle (default) or square */
  variant?: 'circle' | 'square';
  /** Optional extra className */
  className?: string;
}
