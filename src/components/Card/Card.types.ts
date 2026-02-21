import { HTMLAttributes, ReactNode } from 'react'

/**
 * Props for Card component.
 * - Use for surface containers, grouping content, panels, etc.
 * - Accepts role to support section landmarks as needed.
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
  hover?: boolean
  children?: ReactNode
}

