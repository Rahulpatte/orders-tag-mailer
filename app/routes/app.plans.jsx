import {
    Card,
    Page,
    InlineGrid,
    Text,
    BlockStack,
    Button,
    List,
    Box,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import Placeholder from "../components/Placeholder";
import { authenticate } from "../shopify.server";
import { useActionData, useSubmit, useOutletContext } from "@remix-run/react";

export const action = async ({ request }) => {
    const { session, billing } = await authenticate.admin(request);
    const formData = await request.formData();
    const planName = formData.get("planName");
    // console.log("planName", planName);
    await billing.require({
        plans: [planName],
        isTest: (process.env.NODE_ENV === "production" && session.shop !== 'quickstart-37dc4acc.myshopify.com') ? false : true,
        onFailure: async () =>
            billing.request({
                plan: planName,
                isTest: (process.env.NODE_ENV === "production" && session.shop !== 'quickstart-37dc4acc.myshopify.com') ? false : true,
            }),
    });

    return { success: true };
};


const premiumFeatures = [
    "Add your own SMTP server",
    "Send emails when orders are tagged",
    "Customize email templates as per the tags"
];

export default function Plans() {
    const [isLoading, setLoading] = useState(null);
    const submit = useSubmit();

    const actionData = useActionData();
    const { activeSubscriptionsData } =
        useOutletContext();

    const plans = [
        {
            name: "Premium plan",
            priceLabel: "$9.99/month",
            features: premiumFeatures,
        },
    ];

    useEffect(() => {
        // console.log("activeSubscriptionsData", activeSubscriptionsData);
        if (!activeSubscriptionsData.length) {
            setLoading(null);
        }
    }, [activeSubscriptionsData]);

    useEffect(() => {
        if (actionData?.success) {
            //
        }
    }, [actionData]);

    const handleSelectPlan = (planName) => {
        setLoading(planName);
        try {
            const formData = new FormData();
            formData.append("planName", planName);
            submit(formData, { method: "POST" });
        } catch (error) {
            console.log("error occured on handleSelectPlan", error);
        }
    };

    return (
        <Page>
            <Placeholder
                component={
                    <>
                        <Box paddingBlockEnd={800}>
                            <Text variant="heading2xl" as="h3">
                                Your Plan
                            </Text>
                        </Box>
                        <InlineGrid gap="600" columns={3}>
                            {plans.map((plan, idx) => (
                                <Card key={idx}>
                                    <Box paddingBlockEnd={600} paddingBlockStart={200}>
                                        <BlockStack gap={200}>
                                            <Text variant="headingXl" as="h4">
                                                {plan.name}
                                            </Text>
                                            <Text variant="subdued">
                                                {plan.priceLabel}
                                            </Text>
                                            <Button
                                                size="large"
                                                loading={isLoading === plan.name}
                                                disabled={
                                                    plan.name &&
                                                    activeSubscriptionsData?.[0]?.status ===
                                                    "ACTIVE"
                                                }
                                                fullWidth
                                                variant="primary"
                                                onClick={() => handleSelectPlan(plan.name)}
                                            >
                                                {activeSubscriptionsData?.length &&
                                                    activeSubscriptionsData[0]?.name === plan.name &&
                                                    activeSubscriptionsData[0]?.status === "ACTIVE"
                                                    ? "Selected"
                                                    : "Select Plan"
                                                }
                                            </Button>
                                        </BlockStack>
                                    </Box>
                                    <BlockStack gap={200}>
                                        <List type="bullet">
                                            {plan.features.map((feature, i) => (
                                                <List.Item key={i}>{feature}</List.Item>
                                            ))}{" "}
                                        </List>
                                    </BlockStack>
                                </Card>
                            ))}
                        </InlineGrid>
                    </>
                }
                marginTop="6rem"
                height="auto"
                width="auto"
                itemsCentered={false}
            />
        </Page>
    );
}
