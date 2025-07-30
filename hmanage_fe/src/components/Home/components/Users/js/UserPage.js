import React, { useEffect, useRef, useState } from 'react';
import {
    FaUserPlus,
    FaEnvelope,
    FaThumbsUp,
    FaComment,
    FaUserFriends,
    FaEllipsisH,
    FaTimes,
    FaEdit,
    FaSignOutAlt,
    FaEllipsisV,
    FaUserClock
} from 'react-icons/fa';
import '../css/UserPage.css';
import { UserService } from '../Services/UserService';
import { motion, AnimatePresence } from 'framer-motion';
import UserSearchMenu from './UserSearchMenu';
import { useParams } from 'react-router-dom';
import Popup from "../../../../Notification/js/Popup";
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN');
}

function UserProfile() {
    const userId = Number(localStorage.getItem("userId"));;
    const { id: userIdParam } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [commentPopup, setCommentPopup] = useState({ open: false, project: null });
    const [newComment, setNewComment] = useState('');
    const [userAll, setUserAll] = useState(null);
    const [popup, setPopup] = useState(null);
    const closePopup = () => setPopup(null);
    useEffect(() => {
        fetchData();
    }, [userIdParam]);
    const fetchData = async () => {
        try {
            const [user] = await UserService.getById(userIdParam);
            console.log("userId",userId);
            console.log("user",user);
            const dataUser = await UserService.getAll();
            const mappedUsers = dataUser.map((u, index) => ({
                userId: u.userId.toString(),
                fullName: u.fullName || `${u.firstName || ""} ${u.lastName || ""}`.trim(),
                images: u.images || `https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png`,
            }));
            setUserInfo(user);
            setUserAll(mappedUsers);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu người dùng:", error);
        }
    };

    const toggleMenu = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleEdit = (id) => {
        alert(`Sửa dự án ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Xóa dự án ID: ${id}`);
    };

    const toggleLike = (projectId) => {
        setUserInfo((prev) => {
            const updatedProjects = prev.o_Project.map(p => {
                if (p.projectId !== projectId) return p;
                const liked = p.userLikeId?.includes(userId);
                const updatedLikes = liked
                    ? p.userLikeId.filter(uid => uid !== userId)
                    : [...(p.userLikeId || []), userId];
                return {
                    ...p,
                    userLikeId: updatedLikes,
                    countLike: updatedLikes.length
                };
            });
            return { ...prev, o_Project: updatedProjects };
        });
    };

    const openCommentPopup = (project) => {
        setCommentPopup({ open: true, project });
        setNewComment('');
    };

    const handleAddFriend =async (idUser) =>{
        const data = {
            user02 : idUser
        }
        await UserService.friend(data);
        setPopup({ type: "success", message: "Đã gửi lời mời kết bạn" });
        fetchData();
    }

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;
        const newCommentObj = {
            commentId: Date.now(),
            text: newComment,
            projectId: commentPopup.project.projectId,
            createdAt: Date.now(),
            userName: userInfo.fullName
        };
        setUserInfo((prev) => {
            const updatedProjects = prev.o_Project.map(p => {
                if (p.projectId !== newCommentObj.projectId) return p;
                return {
                    ...p,
                    o_Comments: [...(p.o_Comments || []), newCommentObj]
                };
            });
            return { ...prev, o_Project: updatedProjects };
        });
        setNewComment('');
    };

    if (!userInfo) return <div>Đang tải dữ liệu...</div>;

    return (
        <><div>
            <UserSearchMenu
                users={userAll}
                currentUserId={userId}
            />
        </div><div className="profile-container_user">
                <motion.div className="cover-photo_user" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
                <motion.div className="profile-header_user" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                    <motion.img
                        src={userInfo.images || "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png"}
                        alt="Avatar"
                        className="avatar_user"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }} />
                    <div className="profile-info_user">
                        <h2>{userInfo.fullName}</h2>
                        <p>@{userInfo.firstName?.toLowerCase() || "username"}</p>
                        <p>{userInfo.address || "🌏 Chưa có địa chỉ"}</p>
                        <div className="profile-actions_user">
                            {userInfo.userId !== userId && (
                                <>
                                    {userInfo.statusFriend === null && (
                                    <button
                                        onClick={() => handleAddFriend(userInfo.userId)}
                                        className="btn_user follow_user"
                                    >
                                        <FaUserPlus /> Theo dõi
                                        <div className="birds">🐦🐦🐦</div>
                                    </button>
                                    )}

                                    {userInfo.statusFriend === 0 && (
                                    <button className="btn_user sent_request" disabled>
                                        <FaUserClock /> Đã gửi lời mời
                                    </button>
                                    )}

                                    {userInfo.statusFriend === 1 && (
                                    <button className="btn_user friends_user" disabled>
                                        <FaUserFriends /> Bạn bè
                                    </button>
                                    )}

                                    <button className="fire-hover">
                                        <FaEnvelope /> Nhắn tin
                                        <span className="flame"></span>
                                        <span className="flame"></span>
                                        <span className="flame"></span>
                                        <span className="flame"></span>
                                    </button>
                                </>
                            )}

                            <button className="btn_user friends_user">
                                <FaUserFriends /> {userInfo.userLikeId?.length || 0} bạn bè
                                <span className="heart"></span>
                                <span className="heart"></span>
                                <span className="heart"></span>
                            </button>

                            {userInfo.userId === userId && (
                                <button onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/";
                                }}>
                                    <FaSignOutAlt />
                                </button>
                            )}
                        </div>

                    </div>
                </motion.div>

                <div className="posts-section_user">
                    <AnimatePresence>
                        {userInfo.o_Project?.map((project) => {
                            const liked = project.userLikeId?.includes(userId);
                            const comments = project.o_Comments || [];

                            return (
                                <motion.div
                                    className="post-card_user"
                                    key={project.projectId}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="post-header_user">
                                        <img
                                            src={userInfo.images || "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png"}
                                            alt="user"
                                            className="post-avatar_user" />
                                        <div className="post-user-info_user">
                                            <strong>{userInfo.fullName}</strong>
                                            <span className="post-date_user">{formatDate(project.createdAt)}</span>
                                        </div>
                                        <div className="post-menu_user">
                                            <FaEllipsisH className="menu-icon_user" onClick={() => toggleMenu(project.projectId)} />
                                            {openMenuId === project.projectId && (
                                                <div className="menu-dropdown_user">
                                                    <div onClick={() => handleEdit(project.projectId)}>✏️</div>
                                                    <div onClick={() => handleDelete(project.projectId)}>🗑️</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="caption_user" style={{ whiteSpace: "pre-line" }}>{project.description}</p>

                                    {project.images?.length > 0 && (
                                        <div className="image-grid_user">
                                            {project.images.map((img, idx) => (
                                                <img key={idx} src={`/uploaded-media/${img}`} alt="Ảnh" />
                                            ))}
                                        </div>
                                    )}

                                    <div className="post-actions_user">
                                        <span
                                            onClick={() => toggleLike(project.projectId)}
                                            style={{ color: liked ? 'hotpink' : 'steelblue', cursor: 'pointer', transition: 'color 0.2s' }}
                                        >
                                            <FaThumbsUp /> {project.countLike || 0}
                                        </span>
                                        <span onClick={() => openCommentPopup(project)} style={{ cursor: 'pointer' }}>
                                            <FaComment /> {comments.length}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {commentPopup.open && (
                        <motion.div
                            className="comment-popup_user"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="comment-popup-content_user"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            >
                                <div className="popup-header_user">
                                    <strong>Bình luận bài viết</strong>
                                    <FaTimes onClick={() => setCommentPopup({ open: false, project: null })} style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="popup-comments_user">
                                    {commentPopup.project.o_Comments?.map((cmt) => (
                                        <div key={cmt.commentId} className="comment-card_user">
                                            <div className="comment-user-info">
                                                <img
                                                    src="https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png"
                                                    alt="avatar"
                                                    className="comment-avatar" />
                                                <strong className="comment-username">{cmt.userName}</strong>
                                            </div>
                                            <p className="comment-text">{cmt.text}</p>
                                            <small className="comment-time">{formatDate(cmt.createdAt)}</small>
                                        </div>
                                    ))}
                                </div>

                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Viết bình luận..."
                                    rows={3} />
                                <button onClick={handleCommentSubmit}>Gửi bình luận</button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {popup && (
                    <Popup
                    type={popup.type}
                    message={popup.message}
                    onClose={closePopup}
                    />
                )}
            </div></>
    );
}

export default UserProfile;