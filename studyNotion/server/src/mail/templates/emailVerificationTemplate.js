const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>

  <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px;">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; padding:30px; border-radius:8px; text-align:center;">
            
            <tr>
              <td>
                <h2 style="margin-bottom:10px;">StudyNotion</h2>
                <p style="color:#555;">OTP Verification</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 0;">
                <p>Hello,</p>
                <p>
                  Use the following OTP to verify your account.
                  This OTP is valid for <b>5 minutes</b>.
                </p>

                <h1 style="
                  letter-spacing:4px;
                  background:#f2f2f2;
                  display:inline-block;
                  padding:10px 20px;
                  border-radius:6px;
                  margin:20px 0;
                ">
                  ${otp}
                </h1>

                <p style="color:#777; font-size:14px;">
                  If you did not request this OTP, please ignore this email.
                </p>
              </td>
            </tr>

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

export default otpTemplate;
