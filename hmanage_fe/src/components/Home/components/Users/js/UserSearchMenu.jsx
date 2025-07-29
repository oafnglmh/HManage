import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaEllipsisV, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import '../css/UserSearchMenu.css';
import { useNavigate } from 'react-router-dom';

const UserSearchMenu = ({ users, currentUserId }) => {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const wrapperRef = useRef(null);

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const navigate = useNavigate();

    const handleUserClick = (userId) => {
        navigate(`/users/${userId}`);
    };
    return (
        <div className="user-search-menu" ref={wrapperRef}>
            <div className="search-bar">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchText}
                    onFocus={() => setIsFocused(true)}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {searchText && isFocused && (
                <ul className="user-list absolute">
                    {filteredUsers.map((user) => (
                        <li
                            key={user.userId}
                            className="user-item cursor-pointer hover:bg-gray-100"
                            onClick={() => handleUserClick(user.userId)}
                        >
                            <img
                                src={user.images}
                                alt="avatar"
                                className="avatar"
                            />
                            <span>{user.fullName}</span>
                        </li>
                    ))}
                    {filteredUsers.length === 0 && (
                        <li className="user-item">Không tìm thấy người dùng</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default UserSearchMenu;
