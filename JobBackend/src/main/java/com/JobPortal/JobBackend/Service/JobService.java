package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.ApplicantDTO;
import com.JobPortal.JobBackend.DTO.Application;
import com.JobPortal.JobBackend.DTO.JobDTO;
import com.JobPortal.JobBackend.Exception.JobPortalException;

import java.util.List;

public interface JobService  {

    JobDTO postJob(JobDTO jobDTO) throws JobPortalException;

    List<JobDTO> getAllJobs();

    JobDTO getJob(Long id) throws JobPortalException;

    void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException;

    List<JobDTO> getJobsPostedBy(Long id);

    void changeAppStatus(Application application) throws JobPortalException;

    void deleteJob(Long id) throws JobPortalException;

}
