import { authenticate } from "../shopify.server"
export const action = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request)
    try {
        return
    } catch (error) {
        return
    }
}