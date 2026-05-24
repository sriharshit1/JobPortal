package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.Utility.EmailData;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${brevo.sender.email}")
    private String senderEmail;

    @Async
    public void sendWelcomeEmail(String email, String name) {
        try {
            String htmlContent = EmailData.getWelcomeEmail(name)
                    .replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "");

            String jsonBody = """
                    {
                        "sender": {"name": "HireX", "email": "%s"},
                        "to": [{"email": "%s", "name": "%s"}],
                        "subject": "Welcome to HireX – Your Job Journey Starts Here!",
                        "htmlContent": "%s"
                    }
                    """.formatted(senderEmail, email, name, htmlContent);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
                    .header("accept", "application/json")
                    .header("api-key", brevoApiKey)
                    .header("content-type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 201) {
                System.out.println("Welcome email sent successfully to " + email);
            } else {
                System.err.println("Brevo API error: " + response.statusCode() + " " + response.body());
            }

        } catch (Exception e) {
            System.err.println("Welcome email failed (non-fatal): " + e.getMessage());
        }
    }
}