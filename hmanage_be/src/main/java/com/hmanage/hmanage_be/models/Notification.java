package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Notification")
public class Notification {
    @Id
    private Long  notificationId;

    private Long  userId;
    private String message;
    private Boolean isRead;
    private Timestamp sentAt;

    public Long  getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long  notificationId) {
        this.notificationId = notificationId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public Timestamp getSentAt() {
        return sentAt;
    }

    public void setSentAt(Timestamp sentAt) {
        this.sentAt = sentAt;
    }
}
