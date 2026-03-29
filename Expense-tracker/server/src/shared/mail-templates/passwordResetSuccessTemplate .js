export const passwordResetSuccessTemplate = (name) => `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f4f5;
    padding: 20px;
  ">
    <div style="
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    ">
      
      <h2 style="color: #16a34a; margin-bottom: 10px;">
        Password Reset Successful ✅
      </h2>

      <p style="font-size: 14px; color: #333;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size: 14px; color: #333;">
        Your password has been successfully reset. You can now log in using your new password.
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <a href="${process.env.FRONTEND_URL}/login" 
           style="
             display: inline-block;
             padding: 10px 20px;
             background-color: #2563eb;
             color: #ffffff;
             text-decoration: none;
             border-radius: 6px;
             font-size: 14px;
             font-weight: 500;
           ">
          Go to Login
        </a>
      </div>

      <p style="font-size: 13px; color: #555;">
        🔒 If you did not perform this action, please reset your password immediately or contact support.
      </p>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Expense Tracker Team
      </p>

    </div>
  </div>
`;
