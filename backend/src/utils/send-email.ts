import nodemailer from "nodemailer";
import { generateHtmlTemplate } from "./generateHtmlTemplate";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (email: string, otp: string) => {
  console.log(email, otp);
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Hello World",
    html: generateHtmlTemplate(otp),
  });
};
