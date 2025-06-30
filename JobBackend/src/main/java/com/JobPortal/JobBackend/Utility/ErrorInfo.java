package com.JobPortal.JobBackend.Utility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorInfo {

    private String errorMessage;
    private Integer errorCode;
    private LocalDateTime timeStamp;
}
