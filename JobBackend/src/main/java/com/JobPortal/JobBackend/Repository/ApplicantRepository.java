package com.JobPortal.JobBackend.Repository;

import com.JobPortal.JobBackend.Entity.Applicant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicantRepository extends MongoRepository<Applicant,Long> {
}
