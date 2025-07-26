package com.hmanage.hmanage_be.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "favourite")
public class Favourite {
    @Id
    private Long  favouriteId;
    private Long projectId;
    private Long userId;

    public Long getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(Long eventId) {
        this.favouriteId = eventId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
