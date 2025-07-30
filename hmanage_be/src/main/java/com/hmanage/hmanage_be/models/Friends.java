package com.hmanage.hmanage_be.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "friends")
public class Friends {
    @Id
    private Long friendsId;
    private Long user01;
    private Long user02;
    private Integer status;
}
