import { ReactNode } from 'react';

/**
 * Props for Login component
 */
export interface LoginProps {
  /** Called with credentials object when form is submitted */
  onSubmit: (values: { username: string; password: string; rememberMe?: boolean }) => void | Promise<void>;
  /** Is the form currently submitting (shows spinner, disables button) */
  loading?: boolean;
  /** Error message to display */
  error?: ReactNode;
  /** Label for username/email field */
  usernameLabel?: string;
  /** Label for password field */
  passwordLabel?: string;
  /** Text for submit button (default: "Login") */
  submitText?: string;
  /** Show "Remember me" checkbox */
  showRememberMe?: boolean;
  /** Show "Forgot password" link */
  showForgotPassword?: boolean;
  /** Callback when "Forgot password" is clicked */
  onForgotPassword?: () => void;
  /** Title/header text for the login form */
  title?: ReactNode;
  /** Subtitle/description text */
  subtitle?: ReactNode;
  /** Optionally provide children (e.g. for additional links or content) */
  children?: ReactNode;
  /** Optional class for the wrapper */
  className?: string;
}

