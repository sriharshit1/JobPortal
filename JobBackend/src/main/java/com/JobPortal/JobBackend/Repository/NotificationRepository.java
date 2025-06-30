package com.JobPortal.JobBackend.Repository;

import com.JobPortal.JobBackend.DTO.NotificationStatus;
import com.JobPortal.JobBackend.Entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification,Long> {

    List<Notification> findByUserIdAndStatus (Long userId, NotificationStatus status);
}
