import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const { verify } = jwt;

export const verifyUserEmail = async (fullName, userEmail, userName, token) => {
  console.log({
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  });

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  try {
    console.log("Recipient Email:", userEmail, token); // Debugging line
    const info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: userEmail, // Verify that userEmail is correctly passed here
      subject: `Hello ${fullName}, please verify your email`,
      html: `<p>Please verify your email by clicking the link: <a href="http://localhost:3000/verifyUserEmail/${userName}/${token}">Verify Email</a></p>`,
    });
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
