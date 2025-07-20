import React, { useEffect } from "react";
import "../css/Popup.css";

export default function Popup({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div
        className={`popup-container ${
          type === "success" ? "popup-success" : "popup-error"
        }`}
      >
        <div className="popup-title">
          {type === "success" ? "Thành công!" : "Thất bại!"}
        </div>
        <div className="popup-message">{message}</div>
        <button
          className={`popup-button ${
            type === "success"
              ? "popup-button-success"
              : "popup-button-error"
          }`}
          onClick={onClose}
        >
          Đóng
        </button>
        <div className="progress-bar" />
      </div>
    </div>
  );
}
