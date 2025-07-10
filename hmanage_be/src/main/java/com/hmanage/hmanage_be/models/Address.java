package com.hmanage.hmanage_be.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Address")
public class Address {
    @Id
    private Long  addressId;

    private Long  userId;
    private String street;
    private String city;
    private String state;
    private String zipCode;

    public Long  getAddressId() {
        return addressId;
    }

    public void setAddressId(Long  addressId) {
        this.addressId = addressId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
