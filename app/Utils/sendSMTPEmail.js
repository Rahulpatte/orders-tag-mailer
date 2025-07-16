import nodemailer from "nodemailer"
import SMTPModel from "../MONGODB/SMTPModel"
import EmailLog from "../MONGODB/EmailLog";

export const sendSMTPEmail = async (trackingId, shopURL, email, subject, html, id) => {
    try {
        const SMTPData = await SMTPModel.findOne({ shopURL })
        console.log("SMTPData", SMTPData);
        if (!SMTPData) {
            console.log(`SMTP details not found for shop ${shopURL}`);
            if (id) {
                await EmailLog.findByIdAndUpdate(id, {
                    status: 'failed',
                    error: 'SMTP credentials not found',
                    response: null
                });
            } else {
                await EmailLog.create({
                    trackingId,
                    shopURL,
                    to: email,
                    subject,
                    html,
                    status: 'failed',
                    error: 'SMTP credentials not found',
                });
            }
            return 'SMTP credentials not found';
        }

        const isSecure = SMTPData.port === 465;

        // for testing purpose only
        // const transportOptions = {
        //     pool: true,
        //     host: "smtp.freesmtpservers.com",
        //     port: 25,
        //     secure: isSecure,
        // };

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

        if (id) {
            await EmailLog.findByIdAndUpdate(id, {
                status: 'sent',
                response: info.response,
                error: null
            });
            return 'Email sent successfully'
        } else {
            await EmailLog.create({
                trackingId,
                shopURL,
                to: email,
                subject,
                html,
                status: 'sent',
                response: info.response,
            });
            return 'Email sent successfully'
        }

    } catch (error) {
        console.log("error on sending email using an SMTP", error);
        if (id) {
            await EmailLog.findByIdAndUpdate(id, {
                status: 'failed',
                error: error.message || String(error),
                response: null
            });
            return error.message || String(error)
        } else {
            await EmailLog.create({
                trackingId,
                shopURL,
                to: email,
                subject,
                html,
                status: 'failed',
                error: error.message || String(error),
            });
            return error.message || String(error)
        }
    }
}
