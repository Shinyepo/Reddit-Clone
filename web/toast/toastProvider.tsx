"use client";
import { useState, useMemo, createContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./toast";
import { ToastContext } from "./toastContext";

import "./toast.css";

export interface ToastProps {
  id?: number;
  type: "error" | "warning" | "info" | "success";
  message: string;
}

// Create a random ID
function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  return first;
}

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [ready, setReady] = useState(false);
  const open = ({ type, message }: ToastProps) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUEID(), type, message },
    ]);
  };

  const close = (id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  const contextValue = useMemo(() => ({ open }), []);

  useEffect(()=>{
    setReady(true);    
  })
  

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {ready ? createPortal(
        <div className="toast-container">
          {toasts.map((toast) => (
            <Toast key={toast.id} type={toast.type} message={toast.message} close={() => close(toast.id!)} />
          ))}
        </div>,
        document.body
      ) : null}
    </ToastContext.Provider>
  );
};
