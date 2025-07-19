import React, { useState } from "react";
import QuestionStep1 from "./QuestionStep1";
import QuestionStep2 from "./QuestionStep2";
import QuestionStep3 from "./QuestionStep3";
import "../css/AddQuestionModal.css";
import Popup from "../../../../Notification/js/Popup";
import { QuestionService } from "../Services/questionService";
export default function AddQuestionModal({ onClose, onAdd  }) {
    const [step, setStep] = useState(1);
    const [inf01, setQuestions] = useState([]);
    const [info, setInfo] = useState({ name: "", description: "", avatar: "", minutes: "" });
    const [popup, setPopup] = useState(null);
    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    const closePopup = () => {
        setPopup(null);
    };
    const handleSubmit = async () => {
        const payload = { ...info, inf01 };
        try {
            const response = await QuestionService.add(payload);
            console.log("add",response)
            if (onAdd) onAdd();
            setPopup({ type: "success", message: "Thêm mới thành công" })
        } catch (error) {
            console.error("Lỗi khi thêm bộ câu hỏi:", error);
        }
        onClose();
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="step-indicator">
                        <div className={`step ${step === 1 ? "active" : ""}`}>1</div>
                        <div className={`line ${step > 1 ? "filled" : ""}`}></div>
                        <div className={`step ${step === 2 ? "active" : ""}`}>2</div>
                        <div className={`line ${step > 2 ? "filled" : ""}`}></div>
                        <div className={`step ${step === 3 ? "active" : ""}`}>3</div>
                    </div>

                    <h2>Thêm Bộ Câu Hỏi (Bước {step}/3)</h2> 

                    {step === 1 && (
                        <QuestionStep1 questions={inf01} setQuestions={setQuestions} />
                    )}
                    {step === 2 && (
                        <QuestionStep2 info={info} setInfo={setInfo} />
                    )}
                    {step === 3 && (
                        <QuestionStep3
                            questions={inf01}
                            info={info}
                        />
                    )}

                    <div className="modal-buttons">
                        {step > 1 && <button onClick={handleBack}>←</button>}
                        {step < 3 && <button onClick={handleNext}>→</button>}
                        {step === 3 && <button onClick={handleSubmit}>Xác nhận</button>}
                        <button onClick={onClose} className="close-btn">✖</button>
                    </div>
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
