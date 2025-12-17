import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.BREVO_MAIL;
const pass = process.env.BREVO_KEY;

if (!user || !pass) {
    throw new Error('Missing Brevo SMTP credentials');
}

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user,
        pass,
    },
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: user,
        to,
        subject,
        text,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmail;


