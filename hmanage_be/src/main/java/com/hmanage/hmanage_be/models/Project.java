package com.hmanage.hmanage_be.models;

import java.sql.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Project")
public class Project {
     @Id
    private Long  projectId;

    private Long      userId;
    private String      code;
    private Integer     minutes;
    @Column(columnDefinition = "TEXT")
    private String      inf01;
    private String      name;
    private String      description;
    private String      status;
    private Timestamp   createdAt;
    private Timestamp   updatedAt;

    public Long  getProjectId() {
        return projectId;
    }

    public void setProjectId(Long  projectId) {
        this.projectId = projectId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
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

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public String getInf01() {
        return inf01;
    }

    public void setInf01(String inf01) {
        this.inf01 = inf01;
    }
}
