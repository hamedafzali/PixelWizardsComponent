import { InputHTMLAttributes, ReactNode } from 'react';

/**
 * Props for Checkbox component
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label for the checkbox (for accessibility, optional if used with children) */
  label?: ReactNode;
  /** Whether the checkbox is indeterminate (visual, not form value) */
  indeterminate?: boolean;
  /** Controlled checked value (for controlled checkbox state) */
  checked?: boolean;
  /** Uncontrolled checked value (default state) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Optional additional CSS class */
  className?: string;
  /** Checkbox size (default: md) */
  size?: 'sm' | 'md' | 'lg';
}
