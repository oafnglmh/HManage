package com.hmanage.hmanage_be.models;

import java.math.BigDecimal;
import java.security.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Payment")
public class Payment {
    @Id
    private Long  paymentId;

    private Long  userId;
    private BigDecimal amount;
    private String paymentMethod;
    private Timestamp paidAt;

    public Long  getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long  paymentId) {
        this.paymentId = paymentId;
    }

    public Long  getUserId() {
        return userId;
    }

    public void setUserId(Long  userId) {
        this.userId = userId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Timestamp getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(Timestamp paidAt) {
        this.paidAt = paidAt;
    }
}
