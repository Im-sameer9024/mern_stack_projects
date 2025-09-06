export const otpTemplate = (otp) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
        }
        
        .content {
            padding: 50px 40px;
            text-align: center;
        }
        
      
        
        .message {
            font-size: 16px;
            color: #666;
            margin-bottom: 40px;
            line-height: 1.6;
        }
        
        .otp-container {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            display: inline-block;
        }
        
        .otp-label {
            color: #ffffff;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .otp-code {
            font-family: 'Courier New', monospace;
            font-size: 36px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 8px;
            margin: 0;
        }
        
        .validity {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 30px 0;
            color: #856404;
            font-size: 14px;
        }
        
        .security-notice {
            background-color: #f8f9fa;
            border-left: 4px solid #e74c3c;
            padding: 20px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .security-notice h3 {
            color: #e74c3c;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .security-notice h3::before {
            content: "⚠️";
            margin-right: 8px;
        }
        
        .security-notice p {
            color: #555;
            font-size: 14px;
            margin: 0;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #dee2e6;
        }
        
        .footer p {
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .company-info {
            color: #495057;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .contact-info {
            color: #6c757d;
            font-size: 13px;
        }
        
        /* Responsive design */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 40px 20px;
            }
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 6px;
            }
            
            .footer {
                padding: 25px 20px;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .security-notice {
                background-color: #2d3748;
                border-left-color: #fc8181;
            }
            
            .security-notice h3 {
                color: #fc8181;
            }
            
            .security-notice p {
                color: #e2e8f0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>🔐 Verification Required</h1>
            <p>Secure access to your account</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
           
            
            <div class="message">
                We received a request to verify your account. Please use the following One-Time Password (OTP) to complete your verification:
            </div>
            
            <!-- OTP Display -->
            <div class="otp-container">
                <div class="otp-label">Your OTP Code</div>
                <div class="otp-code">${otp}</div>
            </div>
            
            <!-- Validity Notice -->
            <div class="validity">
                <strong>⏰ Important:</strong> This OTP is valid for <strong>5 minutes</strong> only.
            </div>
            
            <!-- Security Notice -->
            <div class="security-notice">
                <h3>Security Notice</h3>
                <p>
                    Never share this OTP with anyone. Our team will never ask for your OTP via phone, email, or any other method. 
                    If you didn't request this verification, please ignore this email or contact our support team immediately.
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="company-info">GreenCart Pvt. Ltd.</div>
            <p class="contact-info">
                A000-1004, Thaper house near Radisson hotel, VKI area, Tonk<br>
                Need help? Contact us at studynotion557@gmail.com
            </p>
            <p style="font-size: 12px; color: #adb5bd;">
                This is an automated message. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>`