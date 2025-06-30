package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.NotificationDTO;
import com.JobPortal.JobBackend.DTO.NotificationStatus;
import com.JobPortal.JobBackend.Entity.Notification;
import com.JobPortal.JobBackend.Exception.JobPortalException;
import com.JobPortal.JobBackend.Repository.NotificationRepository;
import com.JobPortal.JobBackend.Utility.Utilities;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final NotificationRepository notificationRepository;

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
        notificationDTO.setId(Utilities.getNextSequence("notification"));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimestamp(LocalDateTime.now());
        notificationRepository.save(notificationDTO.toEntity());
    }

    @Override
    public List<Notification> getUnreadNotification(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotification(Long id) throws JobPortalException {
        Notification notify = notificationRepository.findById(id).orElseThrow(()-> new JobPortalException("No notification found"));
        notify.setStatus(NotificationStatus.READ);
        notificationRepository.save(notify);
    }
}
