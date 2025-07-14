import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../shopify.server";
import ToastExample from "../components/Toast";
import { useEffect } from "react";


export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  const { admin, billing, session } = await authenticate.admin(request)

  const response = await admin.graphql(
    `#graphql
          query GetRecurringApplicationCharges {
            currentAppInstallation {
              activeSubscriptions {
                id
                createdAt
                currentPeriodEnd
                name
                test
                trialDays
                status
                lineItems {
                  id
                  plan {
                    pricingDetails {
                      __typename
                    }
                  }
                }
              }
            }
          }`,
  );
  const data = await response.json();
  const activeSubscriptionsData = data?.data?.currentAppInstallation?.activeSubscriptions;
  // console.log('activeSubscriptionsData', activeSubscriptionsData);


  if (!(activeSubscriptionsData?.[0]?.name && Boolean(activeSubscriptionsData?.[0]?.status))) {
    await billing.require({
      plans: [MONTHLY_PLAN],
      isTest: (process.env.NODE_ENV === "production" && session.shop !== 'quickstart-37dc4acc.myshopify.com') ? false : true,
      onFailure: async () =>
        billing.request({
          plan: MONTHLY_PLAN,
          trialDays: 14,
          isTest: (process.env.NODE_ENV === "production" && session.shop !== 'quickstart-37dc4acc.myshopify.com') ? false : true,
        }),
    });
  } else {
    // const cancelledSubscription = await billing.cancel({
    //   subscriptionId: activeSubscriptionsData?.[0]?.id,
    //   isTest: process.env.production ? false : true,
    //   prorate: true,
    // });
  }

  return { apiKey: process.env.SHOPIFY_API_KEY || "", activeSubscriptionsData };
};

export default function App() {
  const { apiKey, activeSubscriptionsData } = useLoaderData();

  useEffect(() => {
    document.querySelector(".Polaris-Frame").style.display = 'none';
  }, []);

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/tags">Manage Tags</Link>
        <Link to="/app/ManageSmtp">
          Manage SMTP
        </Link>
        <Link to="/app/plans">
          Plan
        </Link>
      </NavMenu>
      <Outlet context={{ activeSubscriptionsData }} />
      <ToastExample />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
