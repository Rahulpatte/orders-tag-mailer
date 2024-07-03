import { Modal, TextField, FormLayout, Text } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import WUSUWYG from './wuswug-files/WUSUWYG';

export default function ModalComponent({ isTrue, toggleModal, handlePrimaryAction, primaryContent, secondaryContent, title,
    value, setValue, isLoadingButton = false, modalType }) {

    const handleChange = (_v, type) => {
        setValue((prev) => ({
            ...prev,
            [type]: _v
        }))
    }


    useEffect(() => {
        const tempDiv = document.getElementById("emailContent");
        if (tempDiv) {
            tempDiv.innerHTML = value.tagEmailContent
        }
    }, [value.tagEmailContent])


    return (
        <Modal
            open={isTrue}
            onClose={toggleModal}
            size='large'
            title={modalType === 'delete' ? 'Confirmation' : title}
            primaryAction={{
                content: modalType === 'delete' ? 'Delete' : primaryContent,
                onAction: handlePrimaryAction,
                loading: isLoadingButton,
                destructive: modalType === 'delete' ? true : false
            }}
            secondaryActions={[
                {
                    content: secondaryContent,
                    onAction: toggleModal,
                },
            ]}
        >
            <Modal.Section>
                {modalType !== 'delete' ?
                    // <FormLayout>
                    //     <FormLayout.Group condensed>
                    //         <TextField
                    //             placeholder="Please enter tag name"
                    //             value={value.tag}
                    //             onChange={(_v) => handleChange(_v, 'tag')}
                    //             type='text'
                    //             label="Tag Name"
                    //             autoComplete="off"
                    //         />
                    //         {/* <input style={{ visibility: 'hidden' }} /> */}
                    //     </FormLayout.Group>
                    //     <FormLayout.Group condensed>
                    //         {/* <TextField
                    //             placeholder="Please enter a email message for this tag"
                    //             value={value.tagEmailContent}
                    //             onChange={(_v) => handleChange(_v, 'tagEmailContent')}
                    //             type='text'
                    //             multiline={4}
                    //             label="Tag Email Message"
                    //             autoComplete="off"
                    //         /> */}
                    //         <div>
                    //             <Text>Tag Email Message</Text>
                    //             <div style={{marginBottom: '4px'}}></div>
                    //             <WUSUWYG
                    //                 value={value.tagEmailContent}
                    //                 setValue={(_v) => handleChange(_v, 'tagEmailContent')}
                    //                 placeholder={'Please enter a email message for this tag here...'}
                    //             />
                    //         </div>

                    //         {/* <input style={{ visibility: 'hidden' }} /> */}

                    //     </FormLayout.Group>
                    // </FormLayout>

                    <FormLayout>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                <FormLayout.Group condensed>
                                    <TextField
                                        placeholder="Please enter tag name"
                                        value={value.tag}
                                        onChange={(_v) => handleChange(_v, 'tag')}
                                        type='text'
                                        label="Tag Name"
                                        autoComplete="off"
                                    />
                                </FormLayout.Group>
                                <FormLayout.Group condensed>
                                    <div style={{ marginTop: "10px" }}>
                                        <Text>Tag Email Message</Text>
                                        <div style={{ marginBottom: '4px' }}></div>
                                        <WUSUWYG
                                            value={value.tagEmailContent}
                                            setValue={(_v) => handleChange(_v, 'tagEmailContent')}
                                            placeholder={'Please enter an email message for this tag here...'}
                                        />
                                    </div>
                                </FormLayout.Group>
                            </div>
                            <div style={{ flex: 1, marginLeft: '20px' }}>
                                {/* Right side for email preview */}
                                <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
                                    <h3>Email Preview</h3>
                                    {/* Render your email preview content here */}
                                    {/* <div id="emailContent">

                                    </div> */}

                                    <div class="container">
                                        <div class="main-wrapper">
                                            <div class="top-bar"><div class="top-bar-inner">Subject: Order #9999 confirmed</div></div>
                                            <div class="header-wrapper">
                                                <h1 class="shop-name__text"><a href="#">LoremIpsum</a></h1>
                                                <span class="order-number__text">Order#123123</span>
                                            </div>
                                            <div class="text-button">
                                                <div class="content__cell" id='emailContent'>
                                                    {/* <h2>Thank you for your purchase! </h2>
                                                    <p>Hi John, we're getting your order ready to be shipped. We will notify you when it has been sent.</p> */}
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
                                </div>
                            </div>
                        </div>
                    </FormLayout>

                    :
                    <Text>
                        Are you sure you want to delete.
                    </Text>
                }
            </Modal.Section>
        </Modal>
    );
}