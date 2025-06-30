package com.JobPortal.JobBackend.Entity;


import com.JobPortal.JobBackend.DTO.NotificationDTO;
import com.JobPortal.JobBackend.DTO.NotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notification")
public class Notification {

    private Long id;
    private Long userId;
    private String message;
    private String action;
    private String route;
    private NotificationStatus status;
    private LocalDateTime timestamp;

    public NotificationDTO toDto(){
        return new NotificationDTO(this.id,this.userId,this.message,this.action,this.route,this.status,this.timestamp);
    }
}
