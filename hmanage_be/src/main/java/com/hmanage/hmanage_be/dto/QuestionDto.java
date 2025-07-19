package com.hmanage.hmanage_be.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class QuestionDto {
    private Long  projectId;

    private Long      userId;
    private String      code;
    private Integer     minutes;
    private List<QuestionItemDto> inf01;
    private String      name;
    private String      description;
    private String      status;
    private String      avatar;
    private Timestamp   createdAt;
    private Timestamp   updatedAt;
}
