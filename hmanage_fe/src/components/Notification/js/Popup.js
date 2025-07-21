import React, { useEffect } from "react";
import "../css/Popup.css";

export default function Popup({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getTitle = () => {
    switch (type) {
      case "success":
        return "Thành công!";
      case "error":
        return "Thất bại!";
      case "info":
        return "Thông báo!";
      default:
        return "";
    }
  };

  return (
    <div className="popup-overlay">
      <div className={`popup-container popup-${type}`}>
        <div className="popup-title">{getTitle()}</div>
        <div className="popup-message">{message}</div>
        <button
          className={`popup-button popup-button-${type}`}
          onClick={onClose}
        >
          Đóng
        </button>
        <div className="progress-bar" />
      </div>
    </div>
  );
}
