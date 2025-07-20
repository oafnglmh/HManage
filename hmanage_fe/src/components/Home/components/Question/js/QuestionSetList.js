import React, { useState,useEffect  } from "react";
import QuestionSetCard from "./QuestionSetCard";
import "../css/QuestionSetList.css";
import AddQuestionModal from "../js/AddQuestionModal";
import { QuestionService } from "../Services/questionService";
import ConfirmModal from "../../../../Notification/js/ConfirmModal";
import Popup from "../../../../Notification/js/Popup";
function QuestionSetList() {

    const [questionSets, setQuestionSets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingSet, setEditingSet] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [popup, setPopup] = useState(null);
    const closePopup = () => setPopup(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await QuestionService.getAll();
            setQuestionSets(data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách:", error);
        }
    };
    const handleAdd = () => {
        setEditingSet(null);
        setShowModal(true);
    };

    const handleEdit = async (id) => {
        try {
            const data = await QuestionService.getById(id);
            setEditingSet(data);
            setShowModal(true);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết bộ câu hỏi:", error);
        }
    };

    const handleDelete = (id) => {
        setConfirmDeleteId(id);
    };
    const confirmDelete = async () => {
        try {
            const data = await QuestionService.getById(confirmDeleteId);
            const item = Array.isArray(data) ? data[0] : data;

            const payload = {
                ...item,
                status: "-1",
                inf01: item.inf01 || []
            };

            await QuestionService.update(payload);

            setPopup({ type: "success", message: "Xóa thành công" });
            setConfirmDeleteId(null);
            fetchData();
        } catch (error) {
            console.error("Lỗi khi xóa bộ câu hỏi:", error);
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
            {popup && (
                <Popup
                type={popup.type}
                message={popup.message}
                onClose={closePopup}
                />
            )}
            {showModal && (
                <AddQuestionModal
                    editingData={editingSet}
                    onClose={() => setShowModal(false)}
                    onAdd={(newSet) => {
                        setQuestionSets([...questionSets, newSet]);
                        setShowModal(false);
                        fetchData();
                    }}
                />
            )}
            {confirmDeleteId && (
                <ConfirmModal
                    message="Bạn có chắc muốn xóa bộ câu hỏi này?"
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmDeleteId(null)}
                />
            )}

        </div>
    );
}

export default QuestionSetList;
