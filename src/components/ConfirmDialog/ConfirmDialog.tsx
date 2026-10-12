import React, { useId, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";

export interface ConfirmDialogProps {
  open: boolean;
  title: React.ReactNode;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Style the confirm button as destructive. @default true */
  danger?: boolean;
  /** Require the user to type this text before confirming. */
  requireText?: string;
  /** Shows a spinner on the confirm button and blocks closing. */
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Confirmation for destructive or irreversible actions. */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = true,
  requireText,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const [typed, setTyped] = useState("");
  const inputId = useId();

  // Clear the typed text each time the dialog opens.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setTyped("");
  }

  const blocked = requireText ? typed !== requireText : false;

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      disableClose={loading}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={danger ? "danger" : "primary"}
            size="sm"
            onClick={onConfirm}
            disabled={blocked}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="pw-confirm">
        <div className="pw-confirm__message">{message}</div>
        {requireText && (
          <div className="pw-confirm__field">
            <label htmlFor={inputId} className="pw-confirm__label">
              Type <code>{requireText}</code> to confirm
            </label>
            <input
              id={inputId}
              className="pw-input pw-input--sm"
              autoComplete="off"
              spellCheck={false}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !blocked && !loading) onConfirm();
              }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
