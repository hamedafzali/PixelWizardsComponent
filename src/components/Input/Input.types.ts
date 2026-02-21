import { InputHTMLAttributes, ReactNode } from 'react'

/**
 * Props for Input component.
 * - Use with forms, search fields, filter bars, etc.
 * - Includes ARIA attributes for error/help/description and required marker.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helper?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

