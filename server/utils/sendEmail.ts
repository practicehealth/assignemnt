import { createTransport } from "nodemailer";


export const sentEmail = async (to: string, subject: string, text: string) => {
    const transporter = createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c78f51896061a0",
            pass: "5ea41f12153847"
        }
    });
    await transporter.sendMail({
        to,
        subject,
        text,
        // html : text 
    })
}