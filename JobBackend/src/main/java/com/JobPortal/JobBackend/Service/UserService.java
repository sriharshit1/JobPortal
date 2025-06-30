package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.LoginDto;
import com.JobPortal.JobBackend.DTO.ResponseDto;
import com.JobPortal.JobBackend.DTO.UserDto;
import com.JobPortal.JobBackend.Exception.JobPortalException;


public interface UserService {

    UserDto registerUser(UserDto userDto) throws JobPortalException;
    UserDto getUserByEmail(String email) throws JobPortalException;

    UserDto loginUser(LoginDto loginDto) throws JobPortalException;

    Boolean sendOtp(String email) throws Exception;

    Boolean verifyOtp (String email,String otp) throws JobPortalException;

    ResponseDto changePassword (LoginDto loginDto) throws JobPortalException;
}
