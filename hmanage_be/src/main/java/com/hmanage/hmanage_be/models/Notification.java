package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Notification")
@Getter
@Setter
public class Notification {
    @Id
    private Long  notificationId;

    private Long  user01;
    private Long  user02;
    private Integer status;
    private Integer type;
    private Long  parentId;
}
