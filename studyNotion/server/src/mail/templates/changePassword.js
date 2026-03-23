export const changePasswordTemplate = (email, name) => {
  return `<!DOCTYPE html>
  <html>

  <head>
      <meta charset="UTF-8">
      <title>Password Changed Successfully</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }

          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }

          .message {
              font-size: 20px;
              font-weight: bold;
              color: #22c55e;
              margin-bottom: 20px;
          }

          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }

          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }

          .highlight {
              font-weight: bold;
          }
      </style>

  </head>

  <body>
      <div class="container">
          <a href="https://studynotion-edtech-project.vercel.app">
              <img class="logo"
              src="https://i.ibb.co/7Xyj3PC/logo.png" 
              alt="StudyNotion Logo">
          </a>

          <div class="message">
              Your Password Has Been Changed Successfully ✅
          </div>

          <div class="body">
              <p>Hello ${name},</p>

              <p>
                This is a confirmation that the password for the account 
                associated with <span class="highlight">${email}</span> 
                has been changed successfully.
              </p>

              <p>
                If you made this change, no further action is required.
              </p>

              <p>
                If you did not change your password, please contact our support 
                team immediately to secure your account.
              </p>
          </div>

          <div class="support">
              Need help? Contact us at 
              <a href="mailto:info@studynotion.com">
                info@studynotion.com
              </a>
          </div>

      </div>
  </body>

  </html>`;
};
