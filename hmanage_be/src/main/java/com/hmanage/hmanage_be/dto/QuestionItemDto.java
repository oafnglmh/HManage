package com.hmanage.hmanage_be.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionItemDto {
    private String question;
    private List<String> answers;
    private int correct;
}
