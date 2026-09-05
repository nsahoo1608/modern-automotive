require("dotenv").config({ path: ".env.local" });
const nodemailer = require("nodemailer");

const port = Number(process.env.SMTP_PORT || 465);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function main() {
  console.log("Testing Resend SMTP...");
  console.log("Host:", process.env.SMTP_HOST);
  console.log("Port:", port);
  console.log("User:", process.env.SMTP_USER);

  await transporter.verify();

  console.log("SMTP CONNECTION: SUCCESS");

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: "ModernAutomotive - Resend SMTP Test",
    text: "This is a test email from ModernAutomotive using Resend SMTP.",
  });

  console.log("EMAIL SENT: SUCCESS");
  console.log("Message ID:", info.messageId);
}

main().catch((error) => {
  console.error("SMTP TEST: FAILED");
  console.error(error.message);
  process.exit(1);
});