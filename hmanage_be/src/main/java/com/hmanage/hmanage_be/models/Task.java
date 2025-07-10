package com.hmanage.hmanage_be.models;

import java.security.Timestamp;


import jakarta.persistence.*;

@Entity
@Table(name = "Task")
public class Task {
    @Id
    private Long  taskId;

    private Long  projectId;
    private String name;
    private String description;
    private Long  assignedTo;
    private String status;
    private Timestamp dueDate;
    private Timestamp createdAt;

    public Long  getTaskId() {
        return taskId;
    }

    public void setTaskId(Long  taskId) {
        this.taskId = taskId;
    }

    public Long  getProjectId() {
        return projectId;
    }

    public void setProjectId(Long  projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long  getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Long  assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getDueDate() {
        return dueDate;
    }

    public void setDueDate(Timestamp dueDate) {
        this.dueDate = dueDate;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
