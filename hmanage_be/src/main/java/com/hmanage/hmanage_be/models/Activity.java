package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Activity")
public class Activity {
    @Id
    private Long  activityId;

    private Long  userId;
    private String action;
    private Timestamp actionTime;

    public Long  getActivityId() {
        return activityId;
    }

    public void setActivityId(Long  activityId) {
        this.activityId = activityId;
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

    public Timestamp getActionTime() {
        return actionTime;
    }

    public void setActionTime(Timestamp actionTime) {
        this.actionTime = actionTime;
    }
}
