package com.JobPortal.JobBackend.Entity;

import com.JobPortal.JobBackend.DTO.ApplicantDTO;
import com.JobPortal.JobBackend.DTO.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Base64;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "applicants")
public class Applicant {

@Id
    private Long applicantId;
    private String name;
    private String email;
    private Long phone;
    private String website;
    private byte[] resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;
    private LocalDateTime interviewTime;



    public ApplicantDTO toDto() {
        return new ApplicantDTO(
                this.applicantId,
                this.name,
                this.email,
                this.phone,
                this.website,
                this.resume!= null? Base64.getEncoder().encodeToString(this.resume) :null,
                this.coverLetter,
                this.timestamp,
                this.applicationStatus,
                this.interviewTime

        );
    }
}
