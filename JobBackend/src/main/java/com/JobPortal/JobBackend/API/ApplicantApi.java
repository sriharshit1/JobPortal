package com.JobPortal.JobBackend.API;

import com.JobPortal.JobBackend.DTO.ApplicantDTO;
import com.JobPortal.JobBackend.Exception.JobPortalException;
import com.JobPortal.JobBackend.Service.ApplicantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/applicant")
public class ApplicantApi {

    private final ApplicantService applicantService;

    @PutMapping("resume")
    public ResponseEntity<ApplicantDTO> updateResume(@RequestBody ApplicantDTO applicantDTO) throws JobPortalException{
        return new ResponseEntity<>(applicantService.updateResume(applicantDTO), HttpStatus.OK);
    }

    @GetMapping("/{id}/resume")
    public ResponseEntity<ApplicantDTO> getResume(@PathVariable Long id) throws JobPortalException{
        return new ResponseEntity<>(applicantService.getApplicantById(id),HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApplicantDTO> createApplicant(@RequestBody ApplicantDTO applicantDTO) throws JobPortalException{
        return new ResponseEntity<>(applicantService.createApplicant(applicantDTO),HttpStatus.CREATED);
    }

}
