package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.NotificationDTO;
import com.JobPortal.JobBackend.Entity.Notification;
import com.JobPortal.JobBackend.Exception.JobPortalException;

import java.util.List;

public interface NotificationService {

     void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;

        List<Notification> getUnreadNotification (Long userId);

        void readNotification(Long id) throws JobPortalException;
}
