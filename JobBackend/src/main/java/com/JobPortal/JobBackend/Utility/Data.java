package com.JobPortal.JobBackend.Utility;

public class Data {
    public static String getMessageBody(String otp, String name) {
        return String.format("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>OTP Verification</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f6f8;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.05);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 1px solid #ddd;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              color: #333;
            }
            .content {
              padding: 20px 0;
              text-align: center;
            }
            .otp {
              font-size: 36px;
              font-weight: bold;
              color: #1e88e5;
              letter-spacing: 4px;
              margin: 20px 0;
            }
            .footer {
              font-size: 12px;
              color: #888;
              text-align: center;
              border-top: 1px solid #ddd;
              padding-top: 10px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Job Portal - Email Verification</h1>
            </div>
            <div class="content">
              <p>Hello %s, </p>
              <p>Use the following OTP to verify your email address:</p>
              <div class="otp">%s</div>
              <p>This OTP is valid for the next 10 minutes.</p>
            </div>
            <div class="footer">
              If you didn’t request this, please ignore this email.<br>
              © 2025 Job Portal. All rights reserved.
            </div>
          </div>
        </body>
        </html>
        """, name, otp);
    }
}
