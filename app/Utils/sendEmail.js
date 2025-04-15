import sgMail from "@sendgrid/mail"

import dotenv from "dotenv"
dotenv.config()

const sendEmail = async (shopURL, email, subject, html) => {
    console.log("triggred on sendEmail....")
    try {

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            from: `${shopURL.split(".myshopify.com")[0]}@emailtag.app`,
            to: email,
            subject: subject,
            html: html,
            replyTo: "replyto@emailtag.app",
        }

        const res = await sgMail.send(msg)

        console.log("email response", res[0]?.statusCode)

    } catch (error) {
        console.log("email error", error)
    }

}

export default sendEmail 