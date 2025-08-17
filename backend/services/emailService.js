
import nodemailer from 'nodemailer';

export const sendSummaryEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASS,
            },
        });

        const mailOptions = {
            from: "INFINITY SMART SUMMERIZER",
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("mail send success: ", to);

        return info;
    } catch (err) {
        console.error("Mail error", err);
        throw err;

    }
}