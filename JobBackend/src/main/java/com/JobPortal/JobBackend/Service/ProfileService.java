package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.ProfileDTO;
import com.JobPortal.JobBackend.Exception.JobPortalException;

import java.util.List;

public interface ProfileService {

     Long createProfile(String name,String email) throws JobPortalException;

     ProfileDTO getProfile(Long id) throws JobPortalException;


     ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException;

     List<ProfileDTO> getAllProfiles();

}
