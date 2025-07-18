package com.JobPortal.JobBackend.API;

import com.JobPortal.JobBackend.DTO.LoginDto;
import com.JobPortal.JobBackend.DTO.ResponseDto;
import com.JobPortal.JobBackend.DTO.UserDto;
import com.JobPortal.JobBackend.Exception.JobPortalException;
import com.JobPortal.JobBackend.Service.EmailService;
import com.JobPortal.JobBackend.Service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@Validated
@RequestMapping("/users")
public class UserApi {

    private final UserService userService;
    private final EmailService emailService;


    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody @Valid UserDto userDto) throws JobPortalException {
        userDto = userService.registerUser(userDto);
        emailService.sendWelcomeEmail(userDto.getEmail(),userDto.getName());
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }


    @PostMapping("/changePass")
    public ResponseEntity<ResponseDto> changePassword(@RequestBody @Valid LoginDto loginDto) throws JobPortalException {
        return new ResponseEntity<>(userService.changePassword(loginDto), HttpStatus.OK);
    }

    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDto> sendOtp(@PathVariable @Email(message = "{user.email.invalid}") String email) throws Exception {
        userService.sendOtp(email);
        return new ResponseEntity<>(new ResponseDto("OTP send successfully"), HttpStatus.OK);
    }

    @GetMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<ResponseDto> verifyOtp(@PathVariable @Email(message = "{user.email.invalid}") String email,@PathVariable @Pattern(regexp="^[0-9]{6}$" ,message = "{otp.invalid}")  String otp) throws Exception {
        userService.verifyOtp(email,otp);
        return new ResponseEntity<>(new ResponseDto("OTP is Verified"), HttpStatus.OK);
    }


}
