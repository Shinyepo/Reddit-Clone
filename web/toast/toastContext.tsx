"use client";
import { createContext } from "react";
import { ToastProps } from "./toastProvider";

interface contextValue {
  open: ({ type, message }: ToastProps) => void;
}
const open = ({ type, message }: ToastProps) => {};
export const ToastContext = createContext<contextValue>({ open });
