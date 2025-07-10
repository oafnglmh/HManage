package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Team_Member")
public class TeamMember {
    @Id
    private Long  memberId;

    private Long  teamId;
    private Long  userId;
    private String role;
    private Timestamp joinedAt;

    public Long  getMemberId() {
        return memberId;
    }

    public void setMemberId(Long  memberId) {
        this.memberId = memberId;
    }

    public Long  getTeamId() {
        return teamId;
    }

    public void setTeamId(Long  teamId) {
        this.teamId = teamId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Timestamp getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Timestamp joinedAt) {
        this.joinedAt = joinedAt;
    }
}
