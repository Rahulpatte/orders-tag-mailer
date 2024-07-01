import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import TagInfoModel from "../MONGODB/TagInfoModel";

export const action = async ({ request }) => {
    const data = JSON.parse(await request.text())
    console.log('data from actionTag', data);

    try {
        const { admin, session } = await authenticate.admin(request);
        let tagResult
        if (data.idToUpdate) {
            tagResult = await TagInfoModel.findOneAndUpdate({ _id: data.idToUpdate, shopURL: session.shop }, { ...data.FormData })
        } else {
            tagResult = new TagInfoModel({
                ...data.FormData,
                shopURL: session.shop
            })
            await tagResult.save()
        }

        console.log('tagResult..............', tagResult);

        return json({
            shopURL: session.shop,
            data: tagResult,
            message: 'Tag has been created successfully'
        })

    } catch (error) {
        console.error("Error on actionTag:", error);
        return json({ error: 'Failed on actionTag.', message: error.message });
    }
};

