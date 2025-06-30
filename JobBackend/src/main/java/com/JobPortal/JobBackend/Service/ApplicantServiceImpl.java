package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.ApplicantDTO;
import com.JobPortal.JobBackend.DTO.Application;
import com.JobPortal.JobBackend.DTO.NotificationDTO;
import com.JobPortal.JobBackend.Entity.Applicant;
import com.JobPortal.JobBackend.Exception.JobPortalException;
import com.JobPortal.JobBackend.Repository.ApplicantRepository;
import com.JobPortal.JobBackend.Utility.Utilities;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicantServiceImpl implements ApplicantService{

    private final ApplicantRepository applicantRepository;

    private final NotificationService notificationService;


    @Override
    public ApplicantDTO getApplicantById(Long id) throws JobPortalException {
        Applicant applicant = applicantRepository.findById(id)
                .orElseThrow(()-> new JobPortalException("APPLICANT_NOT_FOUND"));
        return applicant.toDto();
    }

    @Override
    public ApplicantDTO updateResume(ApplicantDTO applicantDTO) throws JobPortalException {
        Applicant existing = applicantRepository.findById(applicantDTO.getApplicantId())
                .orElseThrow(()-> new JobPortalException("APPLICANT NOT FOUND"));
        existing.setResume(applicantDTO.toEntity().getResume());
        applicantRepository.save(existing);
        NotificationDTO notification = new NotificationDTO();
        notification.setUserId(existing.getApplicantId());
        notification.setMessage("Your resume was updated successfully.");
        notification.setAction("Resume Updated");
        notification.setRoute("/resume"); // or wherever you want the user to land
        notificationService.sendNotification(notification);
        return existing.toDto();
    }

    @Override
    public ApplicantDTO createApplicant(ApplicantDTO applicantDTO) throws JobPortalException {
        if(applicantDTO.getApplicantId() == null){
            applicantDTO.setApplicantId(Utilities.getNextSequence("applicants"));
        }
        Applicant newApplicant = applicantDTO.toEntity();
        applicantRepository.save(newApplicant);
        return newApplicant.toDto();
    }
}
