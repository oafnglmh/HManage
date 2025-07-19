package com.hmanage.hmanage_be.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class UserDto {
    private long   userId;
    private String username;
    private String password;
    private String token;
    private String first_name;
    private String last_name;
}
