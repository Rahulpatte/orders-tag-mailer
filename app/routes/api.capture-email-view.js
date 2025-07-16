import EmailLog from "../MONGODB/EmailLog";

export const loader = async ({ request }) => {
    try {
        // console.log("triggered on capture-email-view")
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        // console.log("id", id)
        if (!id) {
            throw new Response("Missing ID parameter", { status: 400 });
        }
        // console.log("ID received on capture-email-view:", id);
        const result = await EmailLog.findOneAndUpdate(
            { trackingId: id, isViewed: { $ne: true } },
            { $set: { isViewed: true } },
            { new: false }
        );

        // console.log('result', result)

        return new Response(null, {
            status: 200,
        });
    } catch (error) {
        console.error("error in capture-email-view:", error);
        throw new Response(" error occurred while capturing email view", { status: 500 });
    }
};
