import { createTransport } from "nodemailer";
import "dotenv/config.js";

const mailSender = async (email, title, body) => {
  try {
    const transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: process.env.NODE_ENV === "production" ? true : false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = transporter.sendMail({
      from: "Forever Fashion by @sam ",
      to: email,
      subject: title,
      html: body,
    });

    // console.log("information of mail", info);

    return info;
  } catch (error) {
    console.log("Error occur while sending mail",error)
  }
};

export default mailSender;
