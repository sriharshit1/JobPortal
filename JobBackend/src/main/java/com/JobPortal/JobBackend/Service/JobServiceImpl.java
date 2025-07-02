package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.*;
import com.JobPortal.JobBackend.Entity.Applicant;
import com.JobPortal.JobBackend.Entity.Job;
import com.JobPortal.JobBackend.Exception.JobPortalException;
//import com.JobPortal.JobBackend.Repository.JobRepository;
import com.JobPortal.JobBackend.Repository.JobRepository;
import com.JobPortal.JobBackend.Utility.Utilities;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    private final JobRepository jobRepository;
    private final NotificationService notificationService;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {


        //VIDEO
        if(jobDTO.getId() == 0){
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Job posted");
            notificationDTO.setMessage("Job posted successfully for: "+jobDTO.getJobTitle()+" at "+jobDTO.getCompany());

            notificationDTO.setUserId(jobDTO.getPostedBy());
            notificationDTO.setRoute("/posted-jobs/"+jobDTO.getId());
            notificationService.sendNotification(notificationDTO);
        }else{
            Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(()-> new JobPortalException("JOB_NOT_FOUND"));
            if(job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED))jobDTO.setPostTime(
                    LocalDateTime.now()
            );
        }

        return jobRepository.save(jobDTO.toEntity()).toDto();

    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map((x)-> x.toDto()).toList();
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        return jobRepository.findById(id).orElseThrow(()-> new JobPortalException("JOB_NOT_FOUND")).toDto();
    }

    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
        Job job = jobRepository.findById(id).orElseThrow(()-> new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant>applicants = job.getApplicants();
        if(applicants==null) applicants= new ArrayList<>();
        if(applicants.stream().filter((x)-> x.getApplicantId() == applicantDTO.getApplicantId()).toList().size() > 0)
            throw new JobPortalException("JOB_APPLIED_ALREADY");
        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);

    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) {
        return jobRepository.findByPostedBy(id).stream().map((x)-> x.toDto()).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
        Job job = jobRepository.findById(application.getId()).orElseThrow(()-> new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant>applicants = job.getApplicants().stream().map((x)-> {
            if(application.getApplicantId() == x.getApplicantId()){
                x.setApplicationStatus(application.getApplicationStatus());
                if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING))x.setInterviewTime(application.getInterviewTime());
                NotificationDTO notificationDTO = new NotificationDTO();
                notificationDTO.setAction("Interview scheduled");
                notificationDTO.setMessage("Interview scheduled for job id: "+application.getId());
                notificationDTO.setUserId(application.getApplicantId());
                notificationDTO.setRoute("/job-history");
                try {
                    notificationService.sendNotification(notificationDTO);
                } catch (JobPortalException e) {
                    e.printStackTrace();
                }
            }
            return x;
        }).toList();
        job.setApplicants(applicants);
        jobRepository.save(job);


//        List<Applicant> applicants = job.getApplicants(); // ✅ fetch original reference
//
//        for (Applicant x : applicants) {
//            if (Objects.equals(application.getApplicantId(), x.getApplicantId())) {
//                x.setApplicationStatus(application.getApplicationStatus());
//
//                if (application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
//                    x.setInterviewTime(application.getInterviewTime());
//                }
//
//                NotificationDTO notificationDTO = new NotificationDTO();
//                notificationDTO.setAction("Interview scheduled");
//                notificationDTO.setMessage("Interview scheduled for job id: " + application.getId());
//                notificationDTO.setUserId(application.getApplicantId());
//                notificationDTO.setRoute("/job-history");
//                notificationService.sendNotification(notificationDTO);
//                break;
//            }
//        }
//
//// No need to call setApplicants() again!
//// Hibernate tracks the change in-place
//        jobRepository.save(job);

    }

    @Override
    public void deleteJob(Long id) throws JobPortalException {
        System.out.println("JobService: deleting job with id = " + id);
        Optional<Job> job = jobRepository.findById(id);
        if (job.isEmpty()) {
            throw new JobPortalException("Job not found with id " + id);
        }

        // add any permission checks here

        jobRepository.deleteById(id);
        System.out.println("Job deleted successfully");
    }
}
