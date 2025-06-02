package com.hmanage.hmanage_be.mappers;
import com.hmanage.hmanage_be.dto.SignUpDto;
import com.hmanage.hmanage_be.dto.UserDto;
import com.hmanage.hmanage_be.models.User;
import org.mapstruct.MapMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "passwordHash",ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
