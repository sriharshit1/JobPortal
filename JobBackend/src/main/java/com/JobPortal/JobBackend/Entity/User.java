package com.JobPortal.JobBackend.Entity;

import com.JobPortal.JobBackend.DTO.AccountType;
import com.JobPortal.JobBackend.DTO.UserDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private Long id;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
    private AccountType accountType;
    private  Long profileId;


    public UserDto toDto(){
        return new UserDto(this.id,this.name,this.email,this.password,this.accountType,this.profileId);
    }
}
