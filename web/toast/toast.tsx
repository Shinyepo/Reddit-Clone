
import { useTimeout } from "@/utils/useTimeout";
import React, { FC, useState } from "react";

interface Props {
  close: () => void;
  type: "error" | "warning" | "info" | "success";
  message: string;
}

/*
#37C2F5 - info
#22F52D - success
#F5D322 - warnign 
#F62118 - error
*/

export const Toast: FC<Props> = ({ close, type, message }) => {
  const [toDelete, setToDelete] = useState(false);
  useTimeout(() => {
    setToDelete(true);
  }, 2000);
  useTimeout(close, 2190);

  let color = "#37C2F5";

  switch (type) {
    case "error":
      color = "#F62118";
      break;
    case "success":
      color = "#22F52D";
      break;
    case "warning":
      color = "#F5D322";
      break;
    default:
      color = "#37C2F5";
      break;
  }

  return (
    <div
      className={"toast " + (toDelete ? "toast-delete" : null)}
      style={{ borderBottom: "3px solid" + color, zIndex: 1000 }}
    >
      <div className="toast-title" style={{ color }}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className="toast-content">{message}</div>
      <div className="toast-btn">
        <button onClick={close} className="toast-close">
          x
        </button>
      </div>
    </div>
  );
};
