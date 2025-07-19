import React, { useState,useEffect  } from "react";
import QuestionSetCard from "./QuestionSetCard";
import "../css/QuestionSetList.css";
import AddQuestionModal from "../js/AddQuestionModal";
import { QuestionService } from "../Services/questionService";

function QuestionSetList() {

    const [questionSets, setQuestionSets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await QuestionService.getAll();
            setQuestionSets(data);
            console.log("set",data)
        } catch (error) {
            console.error("Lỗi khi tải danh sách:", error);
        }
    };
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
                {questionSets?.filter(q => q?.projectId).map(set => (
                    <QuestionSetCard
                        key={set.projectId}
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
                        fetchData();
                    }}
                />
            )}
        </div>
    );
}

export default QuestionSetList;
