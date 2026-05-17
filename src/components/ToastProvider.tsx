"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: 500,
        },
        success: {
          className: "toast-success",
          iconTheme: {
            primary: "#fff",
            secondary: "#22c55e",
          },
        },
        error: {
          className: "toast-error",
          iconTheme: {
            primary: "#fff",
            secondary: "#ef4444",
          },
        },
      }}
    />
  );
}