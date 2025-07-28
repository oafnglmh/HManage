import React, { useEffect, useRef, useState } from 'react';
import '../css/Message.css';
import {
    FaRegCommentDots,
    FaEllipsisV,
    FaSearch,
    FaPhone,
    FaVideo,
    FaInfoCircle,
    FaRegSmile,
    FaPaperclip,
    FaPaperPlane,
    FaCheck,
} from "react-icons/fa";

const fakeUsers = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        avatar: 'https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png',
        lastMessage: 'Em đã làm bài tập xong chưa?',
        time: '2 phút trước',
        unread: 3,
        online: true,
    },
    {
        id: 2,
        name: 'Trần Thị B',
        avatar: 'https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png',
        lastMessage: 'Cuối tuần này mình đi chơi không?',
        time: '30 phút trước',
        unread: 0,
    },
    {
        id: 3,
        name: 'Lê Văn C',
        avatar: 'https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png',
        lastMessage: 'Bạn có tài liệu môn học không?',
        time: '1 giờ trước',
        unread: 1,
    },
];

const replies = [
    'Mình đang bận, lát nữa nhắn lại nhé!',
    'Ok, cảm ơn bạn!',
    'Ý bạn là gì vậy?',
    'Mình sẽ kiểm tra và phản hồi bạn sau.',
    'Hiểu rồi, mình sẽ xem xét ngay.',
    'Cảm ơn thông tin bạn đã chia sẻ!'
];

function ChatApp() {
    const [selectedUserId, setSelectedUserId] = useState(1);
    const [messages, setMessages] = useState([
        { from: 'them', content: 'Chào bạn! Bạn đã làm bài tập xong chưa?', time: '10:30' },
        { from: 'me', content: 'Mình làm xong rồi, nhưng còn vài chỗ chưa hiểu lắm', time: '10:32' },
        { from: 'them', content: 'Chỗ nào vậy? Mình có thể giúp được không?', time: '10:33' },
    ]);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const getTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    };

    const sendMessage = () => {
        if (!message.trim()) return;

        setMessages((prev) => [...prev, { from: 'me', content: message, time: getTime() }]);
        setMessage('');
        setIsTyping(true);

        setTimeout(() => {
        setIsTyping(false);
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages((prev) => [...prev, { from: 'them', content: randomReply, time: getTime() }]);
        }, 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        }
    };

    return (
        <div className="web-messenger">
        <div className="chat-sidebar">
            <div className="sidebar-header">
            <div className="profile-info">
                <img src="https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png" className="profile-avatar" alt="avatar" />
                <div className="profile-name">Tài khoản của bạn</div>
            </div>
            <div className="sidebar-actions">
                <FaRegCommentDots className="icon" />
                <FaEllipsisV className="icon" />
            </div>
            </div>
            <div className="search-bar">
                <FaSearch className="search-icon" />
            <input type="text" className="search-input" placeholder="Tìm kiếm bạn bè..." />
            </div>
            <div className="chat-list">
            {fakeUsers.map((user) => (
                <div
                key={user.id}
                className={`chat-item ${selectedUserId === user.id ? 'active' : ''}`}
                onClick={() => setSelectedUserId(user.id)}
                >
                <img src={user.avatar} className="chat-avatar" alt={user.name} />
                <div className="chat-info">
                    <div className="chat-header">
                    <div className="chat-name">{user.name}</div>
                    <div className="chat-time">{user.time}</div>
                    </div>
                    <div className="message-preview">{user.lastMessage}</div>
                </div>
                {user.unread > 0 && <div className="unread-badge">{user.unread}</div>}
                </div>
            ))}
            </div>
        </div>

        <div className="chat-area">
            <div className="chat-header">
            <img
                src={fakeUsers.find((u) => u.id === selectedUserId)?.avatar}
                className="chat-user-avatar"
                alt="avatar"
            />
            <div className="chat-user-info">
                <div className="chat-user-name">{fakeUsers.find((u) => u.id === selectedUserId)?.name}</div>
                <div className="chat-user-status online">Đang trực tuyến</div>
            </div>
            <div className="chat-actions">
                <FaPhone className="icon" />
                <FaVideo className="icon" />
                <FaInfoCircle className="icon" />
            </div>
            </div>

            <div className="messages-container">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.from === 'me' ? 'outgoing' : 'incoming'}`}>
                <div className="message-content">{msg.content}</div>
                <div className="message-time">
                    {msg.time} {msg.from === 'me' && <i className="fas fa-check"></i>}
                </div>
                </div>
            ))}
            {isTyping && (
                <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
                </div>
            )}
            <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
            <div className="input-tools">
                <FaRegSmile className="icon" />
                <FaPaperclip className="icon" />
            </div>
            <textarea
                className="message-input"
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
            ></textarea>
            <button className="send-button" onClick={sendMessage}>
                <FaPaperPlane className="icon" />
            </button>
            </div>
        </div>
        </div>
    );
}

export default ChatApp;
