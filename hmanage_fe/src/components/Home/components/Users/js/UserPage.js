import React, { useState } from 'react';
import '../css/UserPage.css';
import { FaUserPlus, FaEnvelope, FaThumbsUp, FaComment, FaUserFriends, FaEllipsisH } from 'react-icons/fa';

const posts = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png",
        caption: "Một ngày thật tuyệt vời!",
        likes: 120,
        comments: 34,
        createdAt: "2025-07-20",
        user: {
            name: "Lê Minh Hoàng",
            avatar: "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png",
        }
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png",
        caption: "Check-in cuối tuần 🎉",
        likes: 85,
        comments: 20,
        createdAt: "2025-07-19",
        user: {
        name: "Lê Minh Hoàng",
        avatar: "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png",
        }
    },
];

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
}
    
function UserProfile() {
    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleMenu = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleEdit = (id) => {
        alert(`Sửa bài viết ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Xóa bài viết ID: ${id}`);
    };

    return (
        <div className="profile-container">
        <div className="cover-photo" />
        <div className="profile-header">
            <img
            src="https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png"
            alt="Avatar"
            className="avatar"
            />
            <div className="profile-info">
            <h2>Lê Minh Hoàng</h2>
            <p>@leminhdev</p>
            <p>🌏 Full-stack Developer | 📍 Hồ Chí Minh</p>
            <div className="profile-actions">
                <button className="btn follow"><FaUserPlus /> Theo dõi</button>
                <button className="btn message"><FaEnvelope /> Nhắn tin</button>
                <button className="btn friends"><FaUserFriends /> 215 bạn bè</button>
            </div>
            </div>
        </div>

        <div className="posts-section">
            {posts.map((post) => (
            <div className="post-card" key={post.id}>
                <div className="post-header">
                <img src={post.user.avatar} alt="user" className="post-avatar" />
                <div className="post-user-info">
                    <strong>{post.user.name}</strong>
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                </div>
                <div className="post-menu">
                    <FaEllipsisH
                    className="menu-icon"
                    onClick={() => toggleMenu(post.id)}
                    />
                    {openMenuId === post.id && (
                    <div className="menu-dropdown">
                        <div onClick={() => handleEdit(post.id)}>✏️</div>
                        <div onClick={() => handleDelete(post.id)}>🗑️</div>
                    </div>
                    )}
                </div>
                </div>
                <img src={post.image} alt="post" className="post-image" />
                <p className="caption">{post.caption}</p>
                <div className="post-actions">
                    <span><FaThumbsUp /> {post.likes}</span>
                    <span><FaComment /> {post.comments}</span>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default UserProfile;