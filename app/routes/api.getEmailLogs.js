import { authenticate } from "../shopify.server";
import EmailLog from "../MONGODB/EmailLog";

export const action = async ({ request }) => {
    try {
        const { session } = await authenticate.admin(request);
        const data = await request.json();

        const page = parseInt(data.page || "1", 10);
        const limit = parseInt(data.limit || "10", 10);
        const query = data.query?.trim() || "";
        const sort = data.sort || "createdAt";
        const direction = data.direction === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;

        const filter = {
            shopURL: session.shop,
            ...(query
                ? {
                    $or: [
                        { to: { $regex: query, $options: "i" } },
                        { subject: { $regex: query, $options: "i" } },
                    ]
                }
                : {})
        };

        const totalCount = await EmailLog.countDocuments(filter);
        const emailsGot = await EmailLog.find(filter)
            .sort({ [sort]: direction })
            .skip(skip)
            .limit(limit);

        return new Response(JSON.stringify({
            message: "Fetched emails successfully",
            data: emailsGot,
            pageInfo: {
                hasNextPage: skip + limit < totalCount,
                hasPreviousPage: page > 1,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit)
            }
        }), { status: 200 });
    } catch (error) {
        console.error("error in getEmailLogs:", error);
        return new Response(JSON.stringify({
            message: " error occurred while fetching email logs",
            error: error
        }), { status: 500 });
    }
};
