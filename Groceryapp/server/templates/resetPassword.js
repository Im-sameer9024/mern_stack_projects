export const resetPasswordTemplate = (url) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        
        .icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: white;
        }
        
        .content h2 {
            font-size: 24px;
            color: #1e293b;
            margin-bottom: 16px;
            font-weight: 600;
        }
        
        .content p {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 30px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .alternative-link {
            background-color: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .alternative-link p {
            font-size: 14px;
            color: #475569;
            margin-bottom: 10px;
        }
        
        .alternative-link a {
            color: #667eea;
            word-break: break-all;
            text-decoration: none;
        }
        
        .alternative-link {
            background-color: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .alternative-link p {
            font-size: 14px;
            color: #475569;
            margin-bottom: 10px;
        }
        
        .alternative-link a {
            color: #667eea;
            word-break: break-all;
            text-decoration: none;
        }
        
        .security-notice {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            border-radius: 4px;
            margin-bottom: 30px;
            text-align: left;
        }
        
        .security-notice h3 {
            color: #92400e;
            font-size: 16px;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        .security-notice p {
            color: #92400e;
            font-size: 14px;
            margin: 0;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 8px;
        }
        
        .footer .company-name {
            font-weight: 600;
            color: #334155;
        }
        
        .expiry-info {
            background-color: #fee2e2;
            border: 1px solid #fecaca;
            border-radius: 6px;
            padding: 12px;
            margin-top: 20px;
        }
        
        .expiry-info p {
            color: #dc2626;
            font-size: 14px;
            margin: 0;
            font-weight: 500;
        }
        
        /* Responsive Design */
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content h2 {
                font-size: 20px;
            }
            
            .reset-button {
                padding: 14px 28px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="header">
            <h1>Password Reset Request</h1>
            <p>We received a request to reset your password</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="icon">🔐</div>
            
            <h2>Reset Your Password</h2>
            <p> Please use the link below to reset the password.</p>
            
            <!-- Alternative Link -->
            <div class="alternative-link">
                <p><strong>Click the link below to reset your password:</strong></p>
                <p>${url} </p>
            </div>
            
            <!-- Security Notice -->
            <div class="security-notice">
                <h3>🛡️ Security Notice</h3>
                <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged. For security reasons, this link will expire in {{expiryTime}} hours.</p>
            </div>
            
            <!-- Expiry Information -->
            <div class="expiry-info">
                <p>⏰ This reset link expires on {{expiryDate}}</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="company-name">GreenCart Pvt. Ltd.</p>
            <p>A000-1004, Thaper house near Radisson hotel, VKI area, Tonk</p>
            <p>If you have any questions, contact us at studynotion557@gmail.com</p>
        </div>
    </div>
</body>
</html>`;
