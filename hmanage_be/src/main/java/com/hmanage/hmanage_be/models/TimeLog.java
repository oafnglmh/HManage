package com.hmanage.hmanage_be.models;

import java.math.BigDecimal;
import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Time_Log")
public class TimeLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer timeLogId;

    private Integer userId;
    private Integer taskId;
    private BigDecimal hoursWorked;
    private Timestamp logDate;

    public Integer getTimeLogId() {
        return timeLogId;
    }

    public void setTimeLogId(Integer timeLogId) {
        this.timeLogId = timeLogId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
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
