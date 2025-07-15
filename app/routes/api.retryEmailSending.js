import EmailLog from "../MONGODB/EmailLog"
import { authenticate } from "../shopify.server"
import { sendSMTPEmail } from "../Utils/sendSMTPEmail"
export const action = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request)
    const data = await request.json()

    if (!data?._id) {
        return new Response(JSON.stringify({ message: "Id not found to retry email sending" }, { status: 404 }))
    }

    try {
        const gotEmailLog = await EmailLog.findOne({ shopURL: session.shop, _id: data._id })
        if (!gotEmailLog) {
            return new Response(JSON.stringify({ message: "Email log matching id not found in the database" }), { status: 403 })
        }
        console.log("gotEmailLog", gotEmailLog)

        const sendStatus = await sendSMTPEmail(gotEmailLog.shopURL, gotEmailLog.to, gotEmailLog.subject, gotEmailLog.html, data._id)
        return new Response(JSON.stringify({ message: sendStatus }, { status: 200 }))
    } catch (error) {
        return new Response(JSON.stringify({ message: "error occured on retrying to send email", error }, { status: 500 }))
    }
}