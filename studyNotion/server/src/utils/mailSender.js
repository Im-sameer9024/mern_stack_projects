import nodeMailer from 'nodemailer';

const transport = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  pool: true, //  keep connection alive
  maxConnections: 5, // allow concurrent sends
});
export const mailSender = async (email, title, body) => {
  try {
    // let transport = nodeMailer.createTransport({
    //   host: process.env.MAIL_HOST, //BREVO_SMTP_SERVER,
    //   // port: Number(process.env.BREVO_PORT),
    //   secure: false, // upgrade later with true only for 465 port.
    //   auth: {
    //     user: process.env.MAIL_USER, //BREVO_LOGIN,
    //     pass: process.env.MAIL_PASS, //BREVO_SMTP_KEY,
    //   },
    // });

    let info = await transport.sendMail({
      from: `StudyNotion Team || Education department ${process.env.MAIL_USER} .`,
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.error('Error occur in mailSender function', error);
    throw error;
  }
};
