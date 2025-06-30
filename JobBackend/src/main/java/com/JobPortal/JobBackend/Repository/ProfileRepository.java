package com.JobPortal.JobBackend.Repository;

import com.JobPortal.JobBackend.Entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository  extends MongoRepository<Profile,Long> {

}
