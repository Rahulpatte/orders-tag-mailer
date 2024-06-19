import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import TagInfoModel from "../MONGODB/TagInfoModel";

export const action = async ({ request }) => {
    const data = JSON.parse(await request.text())
    console.log('data from createTag', data);

    try {
        const { admin, session } = await authenticate.admin(request);

        
    } catch (error) {
        console.error("Error on create Tag:", error);
        return json({ error: 'Failed on create Tag.', message: error.message });
    }
};

