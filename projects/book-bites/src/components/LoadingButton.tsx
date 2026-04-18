import React from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  spinnerColor?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = "Carregando...",
  spinnerColor = "#fff",
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      aria-disabled={loading || disabled}
      style={loading ? { opacity: 0.5, pointerEvents: "none" } : {}}
      {...props}
      className={[
        "loading-btn",
        props.className,
        loading ? "loading-btn--loading" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <span className="loading-btn__spinner" aria-label={loadingText}>
          <i
            className="fa-solid fa-spinner fa-spin loading-btn__icon"
            style={{ color: spinnerColor }}
            aria-hidden="true"
          ></i>{" "}
          {loadingText}
        </span>
      ) : (
        children
      )}
      <style>{`
        .loading-btn {
          background: var(--color-primary);
          color: var(--color-white);
          border: none;
          border-radius: 999px;
          padding: 8px 18px;
          font-weight: 600;
          font-size: 1em;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(122, 73, 197, 0.10);
          transition: background 0.18s, transform 0.18s;
        }
        .loading-btn__icon {
          font-size: 1.1em;
          vertical-align: middle;
          line-height: 1;
          display: inline-block;
        }
        .loading-btn__spinner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-style: italic;
          opacity: 0.8;
        }
        .fa-spinner {
          animation: fa-spin 1s infinite linear;
        }
        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(359deg); }
        }
        .loading-btn[disabled], .loading-btn[aria-disabled="true"] {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .loading-btn:hover:not([disabled]):not([aria-disabled="true"]),
        .loading-btn:focus-visible:not([disabled]):not([aria-disabled="true"]) {
          background: var(--color-primary-light);
          color: var(--color-white);
          transform: translateY(-1px) scale(1.03);
          outline: none;
        }
      `}</style>
    </button>
  );
};

export default LoadingButton;
