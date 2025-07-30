import React, { useEffect, useState } from 'react';
import '../css/notification.css';
import { SocialService } from '../../Services/SocialService';
import { NotificationService } from '../Services/notificationSerivce';

function NotificationPage() {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [page, hasMore]);
    const fetchData = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const data = await SocialService.getNoti(page);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setNotifications((prev) => [...prev, ...data]);
            }
            const unread = data.filter((n) => n.status === 0).length;
            setUnreadCount((prev) => prev + unread);
        } catch (error) {
            console.error("Lỗi khi tải danh sách:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        const sentinel = document.querySelector("#scroll-sentinel");
        if (sentinel) observer.observe(sentinel);

        return () => {
            if (sentinel) observer.unobserve(sentinel);
        };
    }, [hasMore, isLoading]);

    const handleAccept = async(id,notificationId) => {
        const payload = {
            parentId : id,
            status : 1,
            type: 1001,
            notificationId:notificationId
        }
        await NotificationService.update(payload)
        fetchData();
    };

    const handleDecline = (id) => {
        console.log('Từ chối lời mời kết bạn:', id);
    };

    return (
        <div className="notification-container">
            {notifications.map((noti) => (
                <div
                    key={noti.notificationId}
                    className={`notification-item animated ${noti.status === 0 ? 'unread' : ''}`}
                >
                    {noti.type === 1000 ? (
                        <>
                            <p className="notification-message">
                                <strong>{noti.nameUserSend}</strong> đã gửi lời mời kết bạn cho bạn
                            </p>
                            <div className="noti-actions">
                                <button onClick={() => handleAccept(noti.parentId, noti.notificationId)} className="btn btn-accept">
                                    Xác nhận
                                </button>
                                <button onClick={() => handleDecline(noti.parentId)} className="btn btn-decline">
                                    Từ chối
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="notification-message">{noti.content}</p>
                    )}
                    {noti.type === 2000 ? (
                        <>
                            <p className="notification-message">
                                <strong>{noti.nameUserSend}</strong> đã chấp nhận lời mời của bạn
                            </p>
                            
                        </>
                    ) : (
                        <p className="notification-message">{noti.content}</p>
                    )}
                </div>
            ))}
            {isLoading && <p className="loading">Đang tải thêm...</p>}
            <div id="scroll-sentinel" style={{ height: '1px' }}></div>
        </div>
    );
}

export default NotificationPage;
