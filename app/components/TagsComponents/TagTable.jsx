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
        setSelectedTagContent(`
        <div class="container">
        <div class="main-wrapper">
            <div class="top-bar"><div class="top-bar-inner">Subject: Order #9999 confirmed</div></div>
            <div class="header-wrapper">
                <h1 class="shop-name__text"><a href="#">LoremIpsum</a></h1>
                <span class="order-number__text">Order#123123</span>
            </div>
            <div class="text-button">
                <div class="content__cell" id='emailContent'>
                    ${content}
                </div>
                <div class="actions__cell">
                    <div class="button main-action-cell">
                        <a href="#" class="button__text">View your order</a>
                    </div>
                    <div class="link secondary-action-cell">
                        <span class="link__cell">or</span> <a href="#">Visit our store</a>
                    </div>
                </div>
            </div>
            <div class="section__cell">
                <div class="section__cell_heading"><h3>Order summary</h3></div>
                <div>
                    <table>
                        <tbody>
                            <tr class="order-list__item">
                                <td class="order-list__item__cell">
                                    <table class="row" style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src="https://cdn.shopify.com/s/files/1/0688/7689/4504/products/PremiumThemePreview1-min_compact_cropped.png?v=1675949571"
                                                        align="left" width="60" height="60" class="order-list__product-image" />
                                                </td>
                                                <td class="order-list__product-description-cell">
                                                    <span class="order-list__item-title">Charitable Trust WordPress Theme × 1</span>
                                                    <span class="order-list__item-discount-allocation">PROD5 (-$5.00)</span>
                                                </td>
                                                <td class="order-list__price-cell">
                                                    <p class="order-list__item-original-price">$39.00</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="row subtotal-table" >
                        <tbody>
                            <tr class="subtotal-line">
                                <td class="subtotal-line__title">
                                    <p>Discount <i class="fa-solid fa-tags" ></i><span>FREESHIPPING</span></p>
                                </td>
                                <td class="subtotal-line__value"><strong>-$0.00</strong></td>
                            </tr>
                            <tr class="subtotal-line">
                                <td class="subtotal-line__title">
                                    <p>Discount<i class="fa-solid fa-tags" ></i><span>ORDER</span></p>
                                </td>
                                <td class="subtotal-line__value"><strong>-$5.00</strong></td>
                            </tr>
                            <tr class="subtotal-line">
                                <td class="subtotal-line__title"><p>Subtotal</p></td>
                                <td class="subtotal-line__value" ><strong>$29.00</strong></td>
                            </tr>
                            <tr class="subtotal-line">
                                <td class="subtotal-line__title"><p>Shipping</p></td>
                                <td class="subtotal-line__value" ><strong>$10.00</strong></td>
                            </tr>
                            <tr class="subtotal-line">
                                <td class="subtotal-line__title"><p>Taxes</p></td>
                                <td class="subtotal-line__value" ><strong>$0.00</strong> </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="row subtotal-table subtotal-table--total">
                        <tbody>
                            <tr class="subtotal-line">
                                <td class="subtotal-line__title"><p>Total</p></td>
                                <td class="subtotal-line__value total-des" ><strong>$29.00 USD</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="total-discount">You saved <span class="total-discount--amount">$20.00</span></p>
                </div>
            </div>
            <div class="information-wrapper">
                <h3>Customer information</h3>
                <div class="information-inner">
                    <div class="customer-info__item">
                        <h4>Shipping address</h4>
                        <p>Steve Shipper
                            <br />Shipping Company<br />123 Shipping Street<br />Shippington KY 40003<br />United States</p>
                    </div>
                    <div class="customer-info__item">
                        <h4>Shipping address</h4>
                        <p>Bob Biller<br />My Company<br />123 Billing Street<br />Billtown KY K2P0B0<br />United States</p>
                    </div>
                    <div class="customer-info__item">
                        <h4>Shipping address</h4>
                        <p >Generic Shipping</p>
                    </div>
                </div>
            </div>
            <div class="disclaimer__subtext-wrapper">
                <p class="disclaimer__subtext">
                    If you have any questions, reply to this email or contact us at <a style={{ fontSize: "14px", textDecoration: "none", color: "#1990C6" }}>support@themeignite.com</a></p>
            </div>
        </div>
    </div>
        `);
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


