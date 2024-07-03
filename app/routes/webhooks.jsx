import { authenticate } from "../shopify.server";
import shopModel from "../MONGODB/ShopModel";

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(request);
  console.log(`webhook triggered.............. topic ${topic} shop ${shop} session ${session} admin ${admin}`);

  // got to know about the order tag webhook from here   https://community.shopify.com/c/webhooks-and-events/webhook-tag-creation/td-p/1987847

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await shopModel.deleteMany({ where: { shop } });
      }

      break;
    case "ORDERS_UPDATED":
      console.log("payload ORDERS_UPDATED", payload)
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
