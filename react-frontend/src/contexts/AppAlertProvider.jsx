import { useMemo, useRef, useState } from "react";
import ReactDom from "react-dom";
import { AppAlertContext } from "./AppAlertContext";

const dialogClasses = {
  info: "app-alert-confirm--green",
  success: "app-alert-confirm--green",
  warning: "app-alert-confirm--green",
  error: "app-alert-confirm--red",
};

const CloseIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const WarningIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 3 22 20H2L12 3Z" />
    <path d="M12 9v5" />
    <path d="M12 17h.01" />
  </svg>
);

const ShieldIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

export const AppAlertProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);
  const [toasts, setToasts] = useState([]);
  const inputRef = useRef(null);

  const removeToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const closeDialog = (value) => {
    if (dialog?.resolve) {
      dialog.resolve(value);
    }

    setDialog(null);
  };

  const api = useMemo(
    () => ({
      alert: (message, options = {}) => {
        const id = crypto.randomUUID();

        setToasts((current) => [
          ...current,
          {
            id,
            message,
            duration: options.duration || 5000,
          },
        ]);

        window.setTimeout(() => removeToast(id), options.duration || 5000);
        return Promise.resolve();
      },
      confirm: (message, options = {}) =>
        new Promise((resolve) => {
          setDialog({
            mode: "confirm",
            message,
            title: options.title || "",
            description: options.description || "",
            warning: options.warning || "",
            type: options.type || "warning",
            confirmText: options.confirmText || "Yes",
            cancelText: options.cancelText || "No",
            resolve,
          });
        }),
      prompt: (message, defaultValue = "", options = {}) =>
        new Promise((resolve) => {
          setDialog({
            mode: "prompt",
            message,
            value: defaultValue,
            type: options.type || "info",
            confirmText: options.confirmText || "Save",
            cancelText: options.cancelText || "Cancel",
            placeholder: options.placeholder || "",
            resolve,
          });
        }),
    }),
    []
  );

  const portalTarget = document.getElementById("portal") || document.body;
  const dialogClass = dialog
    ? dialogClasses[dialog.type] || dialogClasses.info
    : dialogClasses.info;
  const isPrompt = dialog?.mode === "prompt";
  const isRedDialog = dialogClass === "app-alert-confirm--red";
  const dialogTitle = dialog?.title || dialog?.message;
  const dialogDescription = dialog?.title ? dialog?.message : dialog?.description;

  return (
    <AppAlertContext.Provider value={api}>
      {children}

      {ReactDom.createPortal(
        <div className="app-alert-toast-region" aria-live="polite">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="app-alert-toast"
              style={{ "--app-alert-toast-duration": `${toast.duration}ms` }}
            >
              <div className="app-alert-toast__icon" aria-hidden="true">
                !
              </div>
              <p className="app-alert-toast__message">{toast.message}</p>
            </div>
          ))}
        </div>,
        portalTarget
      )}

      {dialog &&
        ReactDom.createPortal(
          <div
            className={`app-alert-overlay ${
              isRedDialog ? "app-alert-overlay--top" : ""
            }`}
          >
            <div
              className={`app-alert-confirm ${dialogClass}`}
              role="alertdialog"
              aria-modal="true"
            >
              <button
                type="button"
                className="app-alert-confirm__close"
                aria-label="Close"
                onClick={() => closeDialog(null)}
              >
                <CloseIcon />
              </button>

              <div className="app-alert-confirm__visual" aria-hidden="true">
                <div className="app-alert-confirm__icon">
                  {isRedDialog ? "!" : "i"}
                </div>
              </div>

              <div className="app-alert-confirm__content">
                <div className="app-alert-confirm__header">
                  <div className="app-alert-confirm__header-icon">
                    {isRedDialog ? <WarningIcon /> : "i"}
                  </div>
                  <h2 className="app-alert-confirm__title">{dialogTitle}</h2>
                </div>

                {dialogDescription && (
                  <p className="app-alert-confirm__message">
                    {dialogDescription}
                  </p>
                )}

                {dialog.warning && (
                  <div className="app-alert-confirm__warning">
                    <ShieldIcon />
                    <p>{dialog.warning}</p>
                  </div>
                )}

                {isPrompt && (
                  <div className="app-alert-confirm__field">
                    <input
                      ref={inputRef}
                      autoFocus
                      className="input input-bordered w-full"
                      placeholder={dialog.placeholder}
                      value={dialog.value}
                      onChange={(event) =>
                        setDialog((prev) => ({
                          ...prev,
                          value: event.target.value,
                        }))
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          closeDialog(inputRef.current?.value ?? "");
                        }
                      }}
                    />
                  </div>
                )}

                <div className="app-alert-confirm__actions">
                  <button
                    type="button"
                    className="app-alert-confirm__button app-alert-confirm__button--secondary"
                    onClick={() => closeDialog(null)}
                  >
                    {dialog.cancelText}
                  </button>

                  <button
                    type="button"
                    className="app-alert-confirm__button app-alert-confirm__button--primary"
                    autoFocus={dialog.mode !== "prompt"}
                    onClick={() =>
                      closeDialog(
                        dialog.mode === "confirm" ? true : dialog.value
                      )
                    }
                  >
                    {dialog.confirmText}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          portalTarget
        )}
    </AppAlertContext.Provider>
  );
};
