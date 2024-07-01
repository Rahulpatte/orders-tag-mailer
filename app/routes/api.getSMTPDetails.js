import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import SMTPModel from "../MONGODB/SMTPModel";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request)

    try {

        const dataGot = await SMTPModel.find({ shopURL: session.shop })
        console.log('dataGot.........', dataGot);

        return json({
            message: 'Got data successfully',
            data: dataGot
        })

    } catch (error) {
        console.log('error got from getSMTPDetails', error)
    }
}