import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import SMTPModel from "../MONGODB/SMTPModel";

export const action = async ({ request }) => {
    const data = JSON.parse(await request.text())
    console.log('data from manageSMTP', data);

    try {
        const { admin, session } = await authenticate.admin(request);

        if (data._id) {
            console.log('inside if data._id', data._id);
            await SMTPModel.findOneAndUpdate(
                { _id: data._id },
                { ...data, shopURL: session.shop }
            )

        } else {
            const newData = new SMTPModel({
                ...data,
                shopURL: session.shop
            })

            await newData.save()
        }

        return json({
            message: `Successfully ${data._id ? "updated" : "saved"} SMTP details.`
        })

    } catch (error) {
        console.error("Error on manageSMTP:", error);
        return json({ error: error, message: 'something went wrong wile saving.' });
    }
};

