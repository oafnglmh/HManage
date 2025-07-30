package com.hmanage.hmanage_be.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class NotificationDto {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long  notificationId;

    private Long  user01;
    private Long  user02;
    private Integer status;
    private Integer type;
    private String nameUserSend;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long  parentId;
}
