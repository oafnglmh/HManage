import React from "react";
import "../css/ConfirmModal.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="confirm-modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="confirm-btn" onClick={onConfirm}>Xác nhận</button>
                    <button className="cancel-btn" onClick={onCancel}>Hủy</button>
                </div>
            </div>
        </div>
    );
}
