import React, { useState } from "react";
import "../css/QuestionSetCard.css";
import QuizScreen from "./QuizScreen";
function QuestionSetCard({ data, onEdit, onDelete ,onSummary,onStart}) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="card-container">
            <div className="info-container">
                <img src={data.avatar} alt="avatar" className="avatar" />
                <div>
                    <h3 className="title">{data.name}</h3>
                    <p className="detail">{data.description}</p>
                </div>
            </div>

            <div className="menu-container">
                <button onClick={() => setShowMenu(!showMenu)} className="menu-button">
                    ⋮
                </button>

                {showMenu && (
                    <div className="menu-dropdown">
                        <button className="menu-item" onClick={() => {
                            setShowMenu(false);
                            onEdit(data.projectId);
                        }}>Sửa</button>
                        <button className="menu-item delete" onClick={() => {
                            setShowMenu(false);
                            onDelete(data.projectId);
                        }}>Xóa</button>
                        <button className="menu-item summary" onClick={() => {
                            setShowMenu(false);
                            onSummary(data.projectId);
                        }}>Tổng kết</button>
                        <button className="menu-item start" onClick={() => {
                            setShowMenu(false);
                            onStart(data.projectId);
                        }}>Bắt đầu</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionSetCard;
