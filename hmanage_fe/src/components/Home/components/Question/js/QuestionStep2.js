import React from "react";
import "../css/QuestionStep2.css";

export default function QuestionStep2({ info, setInfo }) {
    return (
        <div className="qs2-container">
            <label className="qs2-label">Tên bộ câu hỏi:</label>
            <input
                className="qs2-input"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />

            <label className="qs2-label">Chi tiết:</label>
            <textarea
                className="qs2-textarea"
                value={info.detail}
                onChange={(e) => setInfo({ ...info, detail: e.target.value })}
            />

            <label className="qs2-label">Số phút làm bài</label>
            <input type="number" min={0}
                className="qs2-input"
                value={info.minute}
                onChange={(e) => setInfo({ ...info, minute: e.target.value })}
            />

            <label className="qs2-label">Avatar (URL):</label>
            <input
                className="qs2-input"
                value={info.avatar}
                onChange={(e) => setInfo({ ...info, avatar: e.target.value })}
            />
        </div>
    );
}
