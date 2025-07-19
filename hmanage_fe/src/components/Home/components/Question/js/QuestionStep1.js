import React, { useState } from "react";
import "../css/QuestionStep1.css";
import Popup from "../../../../Notification/js/Popup";
export default function QuestionStep1({ questions, setQuestions }) {
    const [current, setCurrent] = useState({
        question: "",
        answers: ["", "", "", ""],
        correct: 0,
    });
    const [menuIndex, setMenuIndex] = useState(null);
    const [popup, setPopup] = useState(null);
    const handleToggleMenu = (index) => {
        setMenuIndex(menuIndex === index ? null : index);
    };

    const handleDelete = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
        setMenuIndex(null);
    };

    const handleAdd = () => {   
        if (!current.question.trim()) return setPopup({ type: "error", message: "Vui lòng nhập câu hỏi!" });

        if (current.answers.some(a => !a.trim())) return setPopup({ type: "error", message: "Không được để trống đáp án!" });;
        setQuestions([...questions, current]);
        setCurrent({ question: "", answers: ["", "", "", ""], correct: 0 });
    };

    const closePopup = () => {
        setPopup(null);
    };

    return (
        <>
        <div className="question-form">
            <label>Câu hỏi:</label>
            <input
                type="text"
                value={current.question}
                onChange={(e) =>
                    setCurrent({ ...current, question: e.target.value })
                }
            />

            <div className="answers">
                {current.answers.map((a, idx) => (
                    <div className="answer-item" key={idx}>
                        <input
                            type="text"
                            placeholder={`Đáp án ${String.fromCharCode(65 + idx)}`}
                            value={a}
                            onChange={(e) => {
                                const newAns = [...current.answers];
                                newAns[idx] = e.target.value;
                                setCurrent({ ...current, answers: newAns });
                            }}
                        />
                        <input
                            type="radio"
                            name="correct"
                            checked={current.correct === idx}
                            onChange={() =>
                                setCurrent({ ...current, correct: idx })
                            }
                        />
                        <span></span>
                    </div>
                ))}
            </div>

            <button onClick={handleAdd}>+</button>

            <div className="question-list">
                <h4>Danh sách câu hỏi:</h4>
                <ul>
                    {questions.map((q, i) => (
                        <li key={i} className="question-item">
                            <div className="question-content">
                                <strong>{i + 1}. {q.question}</strong><br />
                                Đúng: {q.answers[q.correct]}
                            </div>
                            <div className="question-actions">
                                <button onClick={() => handleToggleMenu(i)} className="dot-menu">⋮</button>
                                {menuIndex === i && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleDelete(i)}>🗑️</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
        {popup && (
            <Popup
                type={popup.type}
                message={popup.message}
                onClose={closePopup}
            />
        )}
        </>
    );
}
