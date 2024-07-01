import { authenticate } from "../shopify.server";
import TagInfoModel from "../MONGODB/TagInfoModel";
import { json } from "@remix-run/node";

export const loader = async ({ request, params }) => {
    const { admin, session } = await authenticate.admin(request);

    const limit = parseInt(params.limit);
    const page = parseInt(params.page);

    try {
        const totalItems = await TagInfoModel.countDocuments({ shopURL: session.shop });
        // console.log('totalItems==================.',  totalItems);
        // console.log('limit===================.',  limit);
        // console.log('page================.',  page);

        const totalPages = Math.ceil(totalItems / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        // console.log('totalPages hasNextPage hasPrevPage', totalPages, '   ', hasNextPage, '   ', hasPrevPage);

        const tagData = await TagInfoModel.aggregate([
            {
                $match: {
                    shopURL: session.shop,
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 1,
                    storeURL: 1,
                    createdAt: 1,
                    tagEmailContent: 1,
                    tag: 1
                }
            }
        ]);

        // console.log('tagData-------------------------------------', tagData);

        return json({
            message: 'Tags retrieved successfully!',
            data: tagData,
            hasNextPage, hasPrevPage, totalPages, limit
        });
    } catch (error) {
        console.error('Error occurred while retrieving tags:', error);
        return json({
            message: 'Something went wrong',
            error
        });
    }
};
