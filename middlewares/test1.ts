import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function doSomething(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/signup/verify/${token}`; // Nowy format URL
  try {
    await transporter.sendMail({
      from: `"Eventopia" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `Please click on the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
    });
  } catch (error) {
    console.error(error);
  }
}
