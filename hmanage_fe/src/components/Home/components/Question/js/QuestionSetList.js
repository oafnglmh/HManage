import React, { useState } from "react";
import QuestionSetCard from "./QuestionSetCard";
import "../css/QuestionSetList.css";
import AddQuestionModal from "../js/AddQuestionModal";

const dummyData = [
    {
        id: 1,
        name: "Bộ câu hỏi Toán lớp 12",
        detail: "Gồm 100 câu trắc nghiệm về tích phân, giới hạn.",
        avatar: "https://i.pinimg.com/736x/4d/94/26/4d942615efb45071a3e8601a24cc1618.jpg"
    },
    {
        id: 2,
        name: "Bộ câu hỏi Lịch sử",
        detail: "Tổng hợp các sự kiện từ 1945 đến nay.",
        avatar: "https://i.pinimg.com/736x/4d/94/26/4d942615efb45071a3e8601a24cc1618.jpg"
    }
];

function QuestionSetList() {
    const [questionSets, setQuestionSets] = useState(dummyData);
    const [showModal, setShowModal] = useState(false);

    const handleAdd = () => {
        setShowModal(true);
    };

    const handleEdit = (id) => {
        alert(`Sửa bộ câu hỏi ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            setQuestionSets(questionSets.filter(q => q.id !== id));
        }
    };

    return (
        <div className="list-container">
            <div className="list-header">
                <h2>Danh sách bộ câu hỏi</h2>
                <button onClick={handleAdd} className="add-button">+ Thêm bộ câu hỏi</button>
            </div>

            <div className="card-list">
                {questionSets.map(set => (
                    <QuestionSetCard
                        key={set.id}
                        data={set}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {showModal && (
                <AddQuestionModal
                    onClose={() => setShowModal(false)}
                    onAdd={(newSet) => {
                        setQuestionSets([...questionSets, newSet]);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default QuestionSetList;
