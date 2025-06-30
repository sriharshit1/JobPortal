package com.JobPortal.JobBackend.JWT;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
//public AuthenticationResponse(String jwt){
//      this.jwt = jwt
//}
        private final String jwt;
}
