package com.hmanage.hmanage_be.models;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "Item")
public class Item {
    @Id
    private Long  itemId;

    private String name;
    private String description;
    private BigDecimal price;
    private Long  stockQuantity;

    public Long  getItemId() {
        return itemId;
    }

    public void setItemId(Long  itemId) {
        this.itemId = itemId;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long  getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Long  stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
