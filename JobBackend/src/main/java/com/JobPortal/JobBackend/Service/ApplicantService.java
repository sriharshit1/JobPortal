package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.ApplicantDTO;
import com.JobPortal.JobBackend.Exception.JobPortalException;

public interface ApplicantService {

    ApplicantDTO getApplicantById(Long id) throws JobPortalException;

    ApplicantDTO updateResume(ApplicantDTO applicantDTO) throws JobPortalException;

    ApplicantDTO createApplicant (ApplicantDTO applicantDTO) throws JobPortalException;
}
