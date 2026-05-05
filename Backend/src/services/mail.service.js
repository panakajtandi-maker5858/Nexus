import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,  
        pass: process.env.BREVO_SMTP_KEY,  
    }
})

export async function sendEmail({ to, subject, html }) {
    const info = await transporter.sendMail({
        from: '"Nexus" <nexus@gmail.com>',
        to,
        subject,
        html,
    })
    console.log("Email sent:", info.messageId)
}