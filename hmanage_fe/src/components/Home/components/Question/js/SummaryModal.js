import React from "react";
import "../css/SummaryModal.css";

function SummaryModal({ isOpen, onClose, results }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Tổng kết kết quả làm bài</h2>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên người làm</th>
                            <th>Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results
                            .slice()
                            .sort((a, b) => b.inf02 - a.inf02)
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.inf02}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>
                <button onClick={onClose} className="close-button">Đóng</button>
            </div>
        </div>
    );
}

export default SummaryModal;
