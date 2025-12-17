import dotenv from 'dotenv';

dotenv.config();

const user = process.env.BREVO_MAIL;
const apiKey = process.env.BREVO_KEY;

if (!user || !apiKey) {
    throw new Error('Missing Brevo API credentials');
}

const sendEmail = async (to, subject, text, html) => {
    if (!to || !subject || (!text && !html)) {
        throw new Error('Missing email fields');
    }
    const payload = {
        sender: { email: user },
        to: [{ email: to }],
        subject,
        textContent: text || undefined,
        htmlContent: html || undefined,
    };
    try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const body = await res.text();
            throw new Error(`Brevo API failed ${res.status}: ${body}`);
        }
        const data = await res.json();
        console.log('Email sent', data.messageId || data);
        return data;
    } catch (err) {
        console.error('Error sending email', err);
        throw err;
    }
};

export default sendEmail;


