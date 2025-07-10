package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Feedback")
public class Feedback {
    @Id
    private Long  feedbackId;

    private Long  userId;
    private String content;
    private Long  rating;
    private Timestamp submittedAt;

    public Long  getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long  feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long  getRating() {
        return rating;
    }

    public void setRating(Long  rating) {
        this.rating = rating;
    }

    public Timestamp getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Timestamp submittedAt) {
        this.submittedAt = submittedAt;
    }
}
