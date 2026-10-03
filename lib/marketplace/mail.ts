import 'server-only';
import nodemailer from 'nodemailer';
export async function adminMail(subject: string, text: string) {
 if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.MAIL_TO || !process.env.MAIL_FROM) throw new Error('Administrator email is not configured.');
 const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: Number(process.env.SMTP_PORT) === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
 await transport.sendMail({ from: process.env.MAIL_FROM, to: process.env.MAIL_TO, subject, text });
}
