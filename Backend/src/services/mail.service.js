// USING NODEMAILER FOR EMAIL SERVICE :- 

// import nodemailer from "nodemailer";
// import { setDefaultResultOrder } from "dns"


// setDefaultResultOrder("ipv4first");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: 'OAuth2',
//         user: process.env.GOOGLE_USER,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//         clientId: process.env.GOOGLE_CLIENT_ID
//     }
// })

// transporter.verify()
//     .then(() => { console.log("Email transporter is ready to send emails"); })
//     .catch((err) => { console.error("Email transporter verification failed:", err); });

// export async function sendEmail({ to, subject, html, text }) {
//     const mailOptions = {
//         from: process.env.GOOGLE_USER,
//         to,
//         subject,
//         html,
//         text
//     };

//     const details = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", details);
// }


// USING RESEND FOR EMAIL SERVICES :-

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
    const { data, error } = await resend.emails.send({
        from: "Nexus <onboarding@resend.dev>",
        to,
        subject,
        html,
    });

    if (error) {
        console.error("Email error:", error);
        throw error;
    }

    console.log("Email sent:", data);
}