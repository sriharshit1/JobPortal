package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.Exception.JobPortalException;

public interface  EmailService {

    void sendWelcomeEmail(String email, String name) throws JobPortalException;
}
