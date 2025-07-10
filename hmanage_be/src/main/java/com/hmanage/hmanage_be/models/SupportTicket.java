package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Support_Ticket")
public class SupportTicket {
    @Id
    private Long  ticketId;

    private Long  userId;
    private String issue;
    private String status;
    private Timestamp createdAt;
    private Timestamp resolvedAt;

    public Long  getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long  ticketId) {
        this.ticketId = ticketId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(Timestamp resolvedAt) {
        this.resolvedAt = resolvedAt;
    }
}
