import { BlockStack, Card, Page, Text } from "@shopify/polaris";
import EmailLogsTable from "../components/EmailLogs/EmailLogsTable";
import { useEffect, useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import "../components/EmailLogs/emailLogs.css"

export default function EmailLogs() {
    const [isTableLoading, setTableLoading] = useState(true)
    const [selectedSorting, setSelectedSorting] = useState(["createdAt desc"]);
    const [emailLogs, setEmailLogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [queryValue, setQueryValue] = useState('');
    const [pageInfo, setPageInfo] = useState({
        hasNextPage: false,
        hasPreviousPage: false
    });
    const [actionId, setActionId] = useState(null)

    useEffect(() => {
        // console.log("queryValue", queryValue)
        fetchEmailLogs()
    }, [currentPage, queryValue, selectedSorting])

    const fetchEmailLogs = async () => {
        try {
            const [sortField, direction] = selectedSorting[0].split(" ");
            const newData = {
                page: currentPage,
                limit: 8,
                query: queryValue,
                sort: sortField,
                direction: direction,
            }
            const response = await fetch("/api/getEmailLogs", {
                method: "POST",
                body: JSON.stringify(newData)
            })
            if (!response.ok) return
            const jsonData = await response.json()
            // console.log("jsonData==========>", jsonData)
            if (!jsonData?.data || !jsonData?.pageInfo) return

            setEmailLogs(jsonData.data)
            setPageInfo(jsonData.pageInfo)
        } catch (error) {
            console.log("error occured while fetching email logs", error)
        } finally {
            isTableLoading && setTableLoading(false)
        }
    }

    const handleRetry = async () => {
        console.log("JSON.stringify({ _id: actionId })", JSON.stringify({ _id: actionId }))
        closeModal()
        try {
            const response = await fetch("/api/retryEmailSending", {
                method: "POST",
                body: JSON.stringify({ _id: actionId })
            })
            const data = await response.json()
            if (!data?.message) return shopify.toast.show("Something went wrong while retrying.")
            shopify.toast.show(data.message)
        } catch (error) {
            console.log("error occured while retrying email", error)
        } finally {
            setActionId(null)
            fetchEmailLogs()
        }
    }
    const openModal = ({ _id }) => {
        setActionId(_id)
        document.getElementById('retry-confirmation-modal').show()
    }

    const closeModal = () => {
        document.getElementById('retry-confirmation-modal').hide()
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
                        selectedSorting={selectedSorting}
                        setSelectedSorting={setSelectedSorting}
                        emailLogs={emailLogs}
                        setCurrentPage={setCurrentPage}
                        pageInfo={pageInfo}
                        isTableLoading={isTableLoading}
                        queryValue={queryValue}
                        setQueryValue={setQueryValue}
                        openModal={openModal}
                        actionId={actionId}
                    />
                </Card>
            </BlockStack>
            <ConfirmationModal
                id={"retry-confirmation-modal"}
                title={"Confirmation"}
                primaryButtonTitle={"Retry"}
                secondaryButtonText={"Cancel"}
                primaryAction={handleRetry}
                secondaryAction={() => {
                    setActionId(null)
                    closeModal()
                }}
                component={<p className="confirmation-text">Are you sure you want to retry?</p>}
            />
        </Page>
    )
}
