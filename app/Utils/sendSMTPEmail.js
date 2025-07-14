import nodemailer from "nodemailer"
import SMTPModel from "../MONGODB/SMTPModel"

export const sendSMTPEmail = async (shopURL, email, subject, html) => {
    try {
        const SMTPData = await SMTPModel.findOne({ shopURL })
        console.log("SMTPData", SMTPData);
        if (!SMTPData) {
            console.log(`SMTP details not found for shop ${shopURL}`);
            return;
        }

        const isSecure = SMTPData.port === 465;

        const transportOptions = {
            pool: true,
            host: SMTPData.host,
            port: SMTPData.port,
            secure: isSecure,
            auth: {
                user: SMTPData.username,
                pass: SMTPData.password,
            }
        };


        const transporter = nodemailer.createTransport(transportOptions);

        const mailOptions = {
            from: `${shopURL.split(".myshopify.com")[0]}@emailtag.app`,
            to: email,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent using SMTP: ${info.response}`);
    } catch (error) {
        console.log("error on sending email using an SMTP", error);
    }
}
