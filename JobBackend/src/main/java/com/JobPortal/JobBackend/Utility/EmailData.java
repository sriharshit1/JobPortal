package com.JobPortal.JobBackend.Utility;

public class EmailData {

    public static String getWelcomeEmail(String name) {
        return """
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #fff8e7; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="text-align: center;">
                            <h2 style="color: #FFA500;">Welcome to HireX, %s! ☀️</h2>
                            <p style="font-size: 16px; color: #555;">We’re thrilled to have you onboard.</p>
                        </div>
                        <p style="font-size: 14px; color: #666;">
                            Thank you for registering with HireX. You’re now part of a platform that connects talented people like you with amazing job opportunities.
                        </p>
                        
                        <p style="font-size: 14px; color: #666;">
                            Click the button below to visit your profile and start exploring:
                        </p>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="https://hirex-o8sd.onrender.com" 
                               style="background: linear-gradient(45deg, #FFA500, #FFD700); color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                               🌟 Go To HireX
                            </a>
                        </div>

                        <p style="font-size: 12px; color: #999;">If you have any questions, just reply to this email. We’re here to help!</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #aaa; text-align: center;">© 2025 HireX. All rights reserved.</p>
                    </div>
                </body>
            </html>
            """.formatted(name);
    }
}
