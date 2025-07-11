package com.JobPortal.JobBackend.DTO;

import com.JobPortal.JobBackend.Entity.Profile;
import com.JobPortal.JobBackend.Entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {

    private Long id;
    @NotBlank(message = "{user.name.absent}")
    private String name;
    @NotBlank(message = "{user.email.absent}")
    @Email(message = "{user.email.invalid}")
    private String email;
    @NotBlank(message = "{user.password.absent}")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!&*?])[A-Za-z\\d@$!&*?]{8,15}$",message = "{user.password.invalid}")
    private String password;
    private AccountType accountType;
    private Long profileId;


    public User toEntity(){
        return new User(this.id,this.name,this.email,this.password,this.accountType,this.profileId);
    }
}
