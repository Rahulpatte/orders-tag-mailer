import { authenticate } from "../shopify.server";
import EmailLog from "../MONGODB/EmailLog";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request)

    try {
        const emailsGot = await EmailLog.find({ shopURL: session.shop })
        console.log('emailsGot.........', emailsGot);

        return new Response(JSON.stringify({
            message: 'Got emails successfully',
            data: emailsGot
        }), { status: 200 })
    } catch (error) {
        console.log('error got from getEmailLogs', error)
        return new Response(JSON.stringify({
            message: 'Error occured on getEmailLogs',
            error: error
        }), { status: 500 })
    }
}