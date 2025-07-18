import React, { useState } from "react";
import QuestionStep1 from "./QuestionStep1";
import QuestionStep2 from "./QuestionStep2";
import QuestionStep3 from "./QuestionStep3";
import "../css/AddQuestionModal.css";
import { QuestionService } from "../Services/questionService";
export default function AddQuestionModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [info, setInfo] = useState({ name: "", detail: "", avatar: "" });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        const payload = { ...info, questions };
        try {
            const response = await QuestionService.add(payload);
            console.log("Thêm bộ câu hỏi thành công:", response);
        } catch (error) {
            console.error("Lỗi khi thêm bộ câu hỏi:", error);
        }
        onClose();
    };

    return (
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
                    <QuestionStep1 questions={questions} setQuestions={setQuestions} />
                )}
                {step === 2 && (
                    <QuestionStep2 info={info} setInfo={setInfo} />
                )}
                {step === 3 && (
                    <QuestionStep3
                        questions={questions}
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
    );
}
