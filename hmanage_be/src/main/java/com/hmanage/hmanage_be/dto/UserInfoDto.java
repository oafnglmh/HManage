package com.hmanage.hmanage_be.dto;

import com.hmanage.hmanage_be.models.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class UserInfoDto {
    private Long userId;
    private String fullName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String firstName;
    private String images;
    private List<QuestionDto> O_Project;
    private List<String> userLikeId;
    private List<CommentDto> O_Comments;
    private Integer statusFriend;
}
