package com.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRequest {
    @NotEmpty(message = "Name must not be empty or null")
    @Size(max = 53, message = "Username cannot have more than 53 characters")
    private String name;
    @NotEmpty(message = "Email must not be empty or null")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Invalid email address")
    @Size(max = 254, message = "Email address is tool long to exist")
    private String email;
    private String role;

}

