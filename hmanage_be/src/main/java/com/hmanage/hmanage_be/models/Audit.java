package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Audit")
public class Audit {
    @Id
    private Long  auditId;

    private Long  userId;
    private String action;
    private String tableName;
    private Timestamp actionTime;

    public Long  getAuditId() {
        return auditId;
    }

    public void setAuditId(Long  auditId) {
        this.auditId = auditId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Timestamp getActionTime() {
        return actionTime;
    }

    public void setActionTime(Timestamp actionTime) {
        this.actionTime = actionTime;
    }
}
