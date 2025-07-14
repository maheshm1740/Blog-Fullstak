package com.javabot.blogcms.mapper;

import com.javabot.blogcms.dto.UserRequestDto;
import com.javabot.blogcms.dto.UserResponseDto;
import com.javabot.blogcms.model.Users;

public class UserMapper {

    public static Users toEntity(UserRequestDto dto){
        Users users =new Users();
        users.setUsername(dto.getUsername());
        users.setPassword(dto.getPassword());
        return users;
    }
    public static UserResponseDto toDto(Users users){
        return new UserResponseDto(users.getId(), users.getUsername());
    }
}
