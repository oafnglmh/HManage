package com.hmanage.hmanage_be.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class CommentDto {
    private Long commentId;
    private Long projectId;
    private Long userId;
    private String text;
    private Timestamp createdAt;
    private String userName;
}
