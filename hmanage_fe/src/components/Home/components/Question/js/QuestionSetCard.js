import React, { useState } from "react";
import "../css/QuestionSetCard.css";

function QuestionSetCard({ data, onEdit, onDelete }) {
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
                            onEdit(data.id);
                        }}>Sửa</button>
                        <button className="menu-item delete" onClick={() => {
                            setShowMenu(false);
                            onDelete(data.id);
                        }}>Xóa</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionSetCard;
