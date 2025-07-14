import { BlockStack, Card, Page, Text } from "@shopify/polaris";
import EmailLogsTable from "../components/EmailLogs/EmailLogsTable";
import { useEffect, useState } from "react";

export default function EmailLogs() {
    const [isTableLoading, setTableLoading] = useState(true)
    const [selectedFilter, setSelectedFilter] = useState(["createdAt desc"]);
    const [emailLogs, setEmailLogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [queryValue, setQueryValue] = useState('');
    const [pageInfo, setPageInfo] = useState({
        hasNextPage: false,
        hasPreviousPage: false
    });

    useEffect(() => {
        fetchEmailLogs()
    }, [])

    const fetchEmailLogs = async () => {
        try {
            const response = await fetch("/api/getEmailLogs")
            if (!response.ok) return
            const { data } = await response.json()
            console.log("data==========>", data)
            setEmailLogs(data)
        } catch (error) {
            console.log("error occured while fetching email logs", error)
        } finally {
            setTableLoading(false)
        }
    }

    const handleRetry = async () => {
        try {
            const response = await fetch()
        } catch (error) {
            console.log("error occured while retrying email", error)
        }
    }

    return (
        <Page>
            <BlockStack gap={"1600"}>
                <div style={{ marginTop: "0rem" }}></div>
                <Text alignment="center" variant="heading3xl" as="h3" fontWeight="bold">
                    Email Logs Table
                </Text>

                <Card
                    padding={{ xs: '190', sm: '190' }}
                >
                    <EmailLogsTable
                        sortSelected={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        emailLogs={emailLogs}
                        setCurrentPage={setCurrentPage}
                        pageInfo={pageInfo}
                        isTableLoading={isTableLoading}
                        queryValue={queryValue}
                        setQueryValue={setQueryValue}
                        fetchEmailLogs={fetchEmailLogs}
                    />
                </Card>
            </BlockStack>
        </Page>
    )
}
