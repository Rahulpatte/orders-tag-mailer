import nodemailer from "nodemailer"
import SMTPModel from "../MONGODB/SMTPModel"

export const sendSMTPEmail = async (shopURL, email, subject, html) => {
    try {
        const SMTPData = await SMTPModel.findOne({ shopURL })
        console.log("SMTPData", SMTPData);
        const isSecure = SMTPData.port === 465;

        if (SMTPData) {
            const transporter = nodemailer.createTransport({
                pool: true,
                host: SMTPData.host,
                port: SMTPData.port,
                secure: isSecure,
                auth: {
                    user: SMTPData.username,
                    pass: SMTPData.password,
                },
            });

            const mailOptions = {
                from: '"Fred Foo 👻" <foo@example.com>',
                to: "dywelaqi@cyclelove.cc",
                subject: subject,
                html: html
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Message sent using SMTP: ${info.response}`);
                }
            });

        } else {
            console.log(`SMTP details not found for this ${shopURL} store`);
        }
    } catch (error) {
        console.log("error on sending email using an SMTP", error);
    }
}
