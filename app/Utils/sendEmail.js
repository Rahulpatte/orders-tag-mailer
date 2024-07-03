import nodemailer from "nodemailer"
import SMTPModel from "../MONGODB/SMTPModel"


const sendEmail = async (shopURL, email, subject, html) => {

    const emailConfigData = await SMTPModel.findOne({ shopURL })

    const transporter = nodemailer.createTransport({
        pool: true,
        host: emailConfigData.host,
        port: emailConfigData.port || 465,
        secure: true, // use TLS
        auth: {
            user: emailConfigData.username,
            pass: emailConfigData.password,
        },
    });

    const mailOptions = {
        from: emailConfigData.username,
        to: email,
        subject: subject,
        html: html 
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


export default sendEmail