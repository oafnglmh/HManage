package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.*;

public class Registration {
    @Id
    private Long  registrationId;

    private Long  userId;
    private Long  eventId;
    private Timestamp registeredAt;

    public Long  getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(Long  registrationId) {
        this.registrationId = registrationId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public Long  getEventId() {
        return eventId;
    }

    public void setEventId(Long  eventId) {
        this.eventId = eventId;
    }

    public Timestamp getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(Timestamp registeredAt) {
        this.registeredAt = registeredAt;
    }
}
