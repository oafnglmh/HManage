import React, { useState, useEffect } from "react";
import QuestionStep1 from "./QuestionStep1";
import QuestionStep2 from "./QuestionStep2";
import QuestionStep3 from "./QuestionStep3";
import "../css/AddQuestionModal.css";
import Popup from "../../../../Notification/js/Popup";
import { QuestionService } from "../Services/questionService";

export default function AddQuestionModal({ onClose, onAdd, editingData }) {
    const [step, setStep] = useState(1);
    const [inf01, setQuestions] = useState([]);
    const [info, setInfo] = useState({ name: "", description: "", avatar: "", minutes: "", projectId: null });
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        if (editingData) {
        const data = Array.isArray(editingData) ? editingData[0] : editingData;
        setQuestions(data.inf01 || []);
        setInfo({
            name: data.name || "",
            description: data.description || "",
            avatar: data.avatar || "",
            minutes: data.minutes || "",
            projectId: data.projectId || null,
            code:data.code || "",
            userId:data.userId ||"",
            status:1||""
        });
        }
    }, [editingData]);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    const closePopup = () => setPopup(null);

    const handleSubmit = async () => {
        const payload = { ...info, inf01 };
        try {
        if (editingData) {
            await QuestionService.update(payload); 
            setPopup({ type: "success", message: "Cập nhật thành công" });
        } else {
            await QuestionService.add(payload);
            setPopup({ type: "success", message: "Thêm mới thành công" });
        }
        setTimeout(() => {
            if (onAdd) onAdd();
            onClose();

        }, 2000)
        } catch (error) {
        console.error("Lỗi khi lưu bộ câu hỏi:", error);
        setPopup({ type: "error", message: "Có lỗi xảy ra" });
        }

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

            <h2>{editingData ? "Sửa Bộ Câu Hỏi" : "Thêm Bộ Câu Hỏi"} (Bước {step}/3)</h2>

            {step === 1 && (
                <QuestionStep1 questions={inf01} setQuestions={setQuestions} />
            )}
            {step === 2 && (
                <QuestionStep2 info={info} setInfo={setInfo} />
            )}
            {step === 3 && (
                <QuestionStep3 questions={inf01} info={info} />
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
