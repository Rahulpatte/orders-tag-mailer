import React, { useCallback, useEffect, useState } from 'react';
import {
    IndexTable,
    Box,
    SkeletonBodyText, Text, Tooltip, Button, Icon, ButtonGroup, Modal
} from '@shopify/polaris';
import { ChatIcon, EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import EmailContent from './EmailContent';
import './TagTable.css'


export default function TagTable({ tagData,
    isLoading,
    setCurrentPage,
    totalPages,
    hasNextPage,
    hasPrevPage, calculateItemNumber, handleToggleModal }) {
    const [selectedTagContent, setSelectedTagContent] = useState(null);

    const handleShowContent = (content) => {
        setSelectedTagContent(content);
    };

    const handleCloseModal = () => {
        setSelectedTagContent(null);
    };


    const rowMarkup =
        tagData.length <= 0 ? [] : tagData?.map(({ _id, tag, tagEmailContent }, i) => {
            return (
                <IndexTable.Row key={_id}>
                    <IndexTable.Cell><Text variant="bodyMd" fontWeight="bold">{calculateItemNumber(i)}</Text></IndexTable.Cell>
                    <IndexTable.Cell>{tag}</IndexTable.Cell>
                    <IndexTable.Cell>
                        <Button icon={<Icon source={ChatIcon} />}
                            onClick={() => handleShowContent(tagEmailContent)}

                        />
                    </IndexTable.Cell>
                    {/* <IndexTable.Cell >
                        <div style={{ whiteSpace: 'pre-wrap', maxWidth: '300px' }} dangerouslySetInnerHTML={{ __html: tagEmailContent }} />
                    </IndexTable.Cell> */}

                    <IndexTable.Cell>
                        <ButtonGroup>
                            <Button
                                icon={<Icon source={EditIcon} />}
                                onClick={() => {
                                    handleToggleModal(true, 'edit', _id)
                                }}
                            />
                            <Button
                                icon={<Icon source={DeleteIcon} />}
                                onClick={() => {
                                    handleToggleModal(true, 'delete', _id)
                                }}
                                tone='critical'
                            />
                        </ButtonGroup>
                    </IndexTable.Cell>
                </IndexTable.Row>
            )
        });

    return (
        <div className='' style={{
            // marginBottom: '26px'
        }}>
            {isLoading ?
                <Box paddingBlockStart="200">
                    <SkeletonBodyText lines={10} />
                </Box>
                :
                <>
                    <IndexTable
                        itemCount={tagData?.length ?? 0}
                        headings={[
                            { title: 'No.' },
                            { title: 'Tag' },
                            { title: 'Tag Email Content' },
                            { title: 'Action' }

                        ]}
                        selectable={false}
                        pagination={{
                            hasNext: hasNextPage,
                            hasPrevious: hasPrevPage,
                            onNext: () => {
                                setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
                            },
                            onPrevious: () => {
                                setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
                            },
                        }}
                    >
                        {rowMarkup}
                    </IndexTable>
                    {selectedTagContent &&
                        <Modal
                            open={true}
                            onClose={handleCloseModal}
                            title="Tag Email Content"
                            primaryAction={{
                                content: 'Close',
                                onAction: handleCloseModal,
                            }}
                        >
                            <Modal.Section>
                                <EmailContent content={selectedTagContent} />
                            </Modal.Section>
                        </Modal>
                    }
                </>
            }
        </div >
    );

}


