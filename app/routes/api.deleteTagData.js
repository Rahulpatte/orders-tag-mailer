import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import TagInfoModel from "../MONGODB/TagInfoModel";

export const action = async ({ request }) => {

    const { admin, session } = await authenticate.admin(request)
    const data = JSON.parse(await request.text())
    console.log('data of deleteTagData', data);

    try {
        const tagResult = await TagInfoModel.findOneAndDelete({ _id: data.actionID, shopURL: session.shop })

        console.log('tagResult.........../', tagResult);

        return json({
            message: 'Tag deleted successfully',
            data: tagResult
        })

    } catch (error) {
        return json({
            message: 'Error occured while deleting a tag',
            error: error
        })
    }
}