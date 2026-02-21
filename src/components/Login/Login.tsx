import React, { useState } from "react";
import { LoginProps } from "./Login.types";
import { Input } from "../Input";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Card } from "../Card";
import { clsx } from "clsx";

export const Login: React.FC<LoginProps> = ({
  onSubmit,
  loading = false,
  error,
  usernameLabel = "Email or Username",
  passwordLabel = "Password",
  submitText = "Sign In",
  showRememberMe = true,
  showForgotPassword = true,
  onForgotPassword,
  title = "Welcome Back",
  subtitle = "Sign in to your account to continue",
  children,
  className,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState<{
    username: boolean;
    password: boolean;
  }>({
    username: false,
    password: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (username && password) {
      onSubmit({ username, password, rememberMe });
    }
  };

  const usernameError =
    touched.username && !username ? "This field is required" : "";
  const passwordError =
    touched.password && !password ? "This field is required" : "";

  return (
    <Card
      variant="elevated"
      padding="xl"
      className={clsx("pw-login", className)}
      style={{
        maxWidth: 420,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="pw-login__form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
        autoComplete="on"
      >
        {/* Header */}
        {(title || subtitle) && (
          <div
            className="pw-login__header"
            style={{ textAlign: "center", marginBottom: "0.5rem" }}
          >
            {title && (
              <h2
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                  color: "var(--color-text-primary)",
                  lineHeight: "1.2",
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="pw-login__error"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "var(--color-error)",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="9"
                y="7"
                width="2"
                height="6"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="9"
                y="14"
                width="2"
                height="2"
                rx="1"
                fill="currentColor"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Input Fields */}
        <div
          className="pw-login__fields"
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <Input
            label={usernameLabel}
            value={username}
            onFocus={() => setTouched((t) => ({ ...t, username: true }))}
            onBlur={() => setTouched((t) => ({ ...t, username: true }))}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            error={usernameError}
            required
            autoComplete="username"
            fullWidth
            placeholder="Enter your email or username"
          />
          <Input
            label={passwordLabel}
            type="password"
            value={password}
            onFocus={() => setTouched((t) => ({ ...t, password: true }))}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            error={passwordError}
            required
            autoComplete="current-password"
            fullWidth
            placeholder="Enter your password"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div
          className="pw-login__options"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          {showRememberMe && (
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
          )}
          {showForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              disabled={loading}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
                padding: "0.25rem 0.5rem",
                borderRadius: "var(--radius-sm)",
                transition: "all var(--transition-fast)",
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.textDecoration = "underline";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Forgot password?
            </button>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          loading={loading}
          disabled={loading || !username || !password}
          className="pw-login__submit"
          fullWidth
          size="lg"
        >
          {submitText}
        </Button>

        {/* Additional Content */}
        {children && (
          <div
            className="pw-login__extras"
            style={{
              marginTop: "0.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            {children}
          </div>
        )}
      </form>
    </Card>
  );
};
