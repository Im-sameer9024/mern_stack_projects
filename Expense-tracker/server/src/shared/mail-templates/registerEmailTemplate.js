export const registerEmailTemplate = (name) => `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f4f5;
    padding: 20px;
  ">
    <div style="
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    ">
      
      <h2 style="color: #2563eb; margin-bottom: 10px;">
        Welcome to Expense Tracker 🎉
      </h2>

      <p style="font-size: 14px; color: #333;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size: 14px; color: #333;">
        Your account has been successfully created.
        We"re excited to help you manage your expenses smarter and better.
      </p>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Expense Tracker Team
      </p>

    </div>
  </div>
`;
