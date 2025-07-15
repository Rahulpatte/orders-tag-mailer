import {
    IndexTable,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    useBreakpoints,
    EmptySearchResult,
    ButtonGroup,
    Button,
    Text,
    Badge
} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { ResponsePopover } from './ResponsePopover';

const emptyStateMarkup = (
    <EmptySearchResult
        title={'No Email logs found'}
        description={'Try changing the filters or search term'}
        withIllustration
    />
);

export default function EmailLogsTable({
    selectedSorting,
    emailLogs,
    setSelectedSorting,
    setCurrentPage,
    pageInfo,
    isTableLoading,
    queryValue,
    setQueryValue,
    openModal,
    actionId
}) {
    const [selected, setSelected] = useState(0);
    const { mode, setMode } = useSetIndexFiltersMode();
    const sortOptions = [
        { label: "Created At", value: 'createdAt asc', directionLabel: "Oldest to newest" },
        { label: "Created At", value: 'createdAt desc', directionLabel: "Newest to oldest" },
    ];

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(emailLogs);

    const onHandleCancel = () => { };

    const handleFiltersQueryChange = useCallback((value) => {
        setQueryValue(value);
        setCurrentPage(1);
    }, []);


    const handleNext = () => {
        if (pageInfo.hasNextPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (pageInfo.hasPreviousPage) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const resourceName = {
        singular: 'email',
        plural: 'emails',
    };


    const rowMarkup = emailLogs.length ? emailLogs.map(
        (
            { _id, to, subject, status, response, error },
            index,
        ) => {

            return (
                <IndexTable.Row
                    id={_id}
                    key={_id}
                    selected={selectedResources.includes(_id)}
                    position={index}
                >
                    <IndexTable.Cell>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                            #{_id}
                        </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                            {to}
                        </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                            {subject}
                        </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Badge
                            progress={status === 'sent' ? 'complete' : 'incomplete'}
                            tone={status === 'sent' ? 'success' : 'critical'}
                        >
                            {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
                        </Badge>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <ResponsePopover content={response} />
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <ResponsePopover content={error} />
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <ButtonGroup>
                            <Button tone={error ? 'critical' : 'success'} loading={_id === actionId} onClick={() => openModal({
                                _id
                            })}>
                                {error ? "Retry" : "Resend"}</Button>
                        </ButtonGroup>
                    </IndexTable.Cell>
                </IndexTable.Row>
            );
        }
    ) : []

    return (
        <>
            <IndexFilters
                sortOptions={sortOptions}
                onSort={(selected) => {
                    setSelectedSorting(selected);
                    setCurrentPage(1);
                }}
                sortSelected={selectedSorting}
                queryPlaceholder={"Search by customer email or subject"}
                onQueryChange={handleFiltersQueryChange}
                queryValue={queryValue}
                onQueryClear={() => {
                    setQueryValue('');
                    setCurrentPage(1);
                }}
                cancelAction={{
                    onAction: onHandleCancel,
                    disabled: false,
                    loading: false,
                }}
                tabs={[]}
                selected={selected}
                onSelect={setSelected}
                loading={isTableLoading}
                filters={[]}
                onClearAll={() => { }}
                mode={mode}
                setMode={setMode}
            />
            <IndexTable
                loading={isTableLoading}
                condensed={useBreakpoints().smDown}
                resourceName={resourceName}
                itemCount={emailLogs.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                emptyState={emptyStateMarkup}
                headings={[
                    { title: "ID" },
                    { title: "Customer email" },
                    { title: "Subject" },
                    { title: "Status" },
                    { title: "Response" },
                    { title: "Error" },
                    { title: "Action" }
                ]}
                pagination={{
                    hasNext: isTableLoading ? false : pageInfo.hasNextPage,
                    hasPrevious: isTableLoading ? false : pageInfo.hasPreviousPage,
                    onNext: handleNext,
                    onPrevious: handlePrevious,
                    label: " "
                }}
                selectable={false}
            // loading={isTableLoading}
            >
                {rowMarkup}
            </IndexTable>
        </>
    );

}