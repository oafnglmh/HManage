package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Message")
public class Message {
    @Id
    private Long  messageId;

    private Long  senderId;
    private Long  receiverId;
    private String content;
    private Timestamp sentAt;

    public Long  getMessageId() {
        return messageId;
    }

    public void setMessageId(Long  messageId) {
        this.messageId = messageId;
    }

    public Long  getSenderId() {
        return senderId;
    }

    public void setSenderId(Long  senderId) {
        this.senderId = senderId;
    }

    public Long  getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long  receiverId) {
        this.receiverId = receiverId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getSentAt() {
        return sentAt;
    }

    public void setSentAt(Timestamp sentAt) {
        this.sentAt = sentAt;
    }
}
