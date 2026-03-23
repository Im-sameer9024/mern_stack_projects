export const getInTouchEmailTemplate = (data) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">

      <h2 style="margin-bottom: 20px; color: #222;">📩 New Contact Form Submission</h2>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Full Name:</td>
          <td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Email:</td>
          <td style="padding: 8px 0;">${data.email}</td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
          <td style="padding: 8px 0;">${data.countryCode} ${data.contactNumber}</td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Message:</td>
          <td style="padding: 8px 0;">${data.message}</td>
        </tr>
      </table>

      <hr style="margin: 25px 0;" />

      <p style="font-size: 14px; color: #555;">
        This email was sent from your website contact form.
      </p>

    </div>
  </div>
  `;
};
