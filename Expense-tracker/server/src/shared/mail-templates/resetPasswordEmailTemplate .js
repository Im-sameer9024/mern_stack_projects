export const resetPasswordEmailTemplate = (name, resetUrl) => `
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
      
      <h2 style="color: #dc2626; margin-bottom: 10px;">
        Reset Your Password 🔐
      </h2>

      <p style="font-size: 14px; color: #333;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size: 14px; color: #333;">
        We received a request to reset your password. Click the button below to set a new password.
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetUrl}" 
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
          Reset Password
        </a>
      </div>

      <p style="font-size: 13px; color: #555;">
        ⏳ This link will expire in <strong>5 minutes</strong>.
      </p>

      <p style="font-size: 13px; color: #555;">
        If you did not request this, you can safely ignore this email.
      </p>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Expense Tracker Team
      </p>

    </div>
  </div>
`;
