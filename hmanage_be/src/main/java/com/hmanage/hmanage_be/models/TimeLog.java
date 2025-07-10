package com.hmanage.hmanage_be.models;

import java.math.BigDecimal;
import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Time_Log")
public class TimeLog {
    @Id
    private Long  timeLogId;

    private Long  userId;
    private Long  taskId;
    private BigDecimal hoursWorked;
    private Timestamp logDate;

    public Long  getTimeLogId() {
        return timeLogId;
    }

    public void setTimeLogId(Long  timeLogId) {
        this.timeLogId = timeLogId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public Long  getTaskId() {
        return taskId;
    }

    public void setTaskId(Long  taskId) {
        this.taskId = taskId;
    }

    public BigDecimal getHoursWorked() {
        return hoursWorked;
    }

    public void setHoursWorked(BigDecimal hoursWorked) {
        this.hoursWorked = hoursWorked;
    }

    public Timestamp getLogDate() {
        return logDate;
    }

    public void setLogDate(Timestamp logDate) {
        this.logDate = logDate;
    }
}
