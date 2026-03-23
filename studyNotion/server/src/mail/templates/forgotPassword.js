const forgotPasswordTemplate = (resetUrl) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
  </head>

  <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px;">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; padding:30px; border-radius:8px; text-align:center;">
            
            <!-- Header -->
            <tr>
              <td>
                <h2 style="margin-bottom:10px;">StudyNotion</h2>
                <p style="color:#555;">Password Reset Request</p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:20px 0;">
                <p>Hello,</p>
                <p>
                  We received a request to reset your password.
                  Click the button below to set a new password.
                </p>

                <!-- Reset Button -->
                <a href="${resetUrl}" 
                  style="
                    display:inline-block;
                    background:#4CAF50;
                    color:#ffffff;
                    padding:12px 25px;
                    text-decoration:none;
                    border-radius:6px;
                    margin:20px 0;
                    font-weight:bold;
                  ">
                  Reset Password
                </a>

                <p style="color:#777; font-size:14px;">
                  This link will expire in <b>5 minutes</b>.
                </p>

                <p style="color:#777; font-size:14px;">
                  If you did not request this password reset, 
                  you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="border-top:1px solid #eee; padding-top:15px; font-size:12px; color:#999;">
                Need help? Contact us at 
                <a href="mailto:support@studynotion.com">support@studynotion.com</a>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

export default forgotPasswordTemplate;
