package com.JobPortal.JobBackend.Repository;

import com.JobPortal.JobBackend.Entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JobRepository extends MongoRepository<Job,Long> {

     List<Job> findByPostedBy(Long postedBy);
}
