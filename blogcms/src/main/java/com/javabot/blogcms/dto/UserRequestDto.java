package com.javabot.blogcms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {
    @NotBlank(message = "username is required")
    @Size(min = 3,message = "Enter at leat 3 characters")
    private String username;

    @NotBlank(message = "Password cant be empty")
    @Size(min=3,message = "Password should be min 6 characters")
    private String password;
}
