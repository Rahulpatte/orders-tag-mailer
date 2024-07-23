import TagInfoModel from "../MONGODB/TagInfoModel";
import sendEmail from "./sendEmail";


function formatCurrency(currencyCode, amount) {
    try {
        // Validate currency code
        if (!currencyCode || typeof currencyCode !== 'string') {
            throw new Error('Invalid currency code');
        }

        // Create number formatter instance
        const formatter = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode
        });

        // Format the amount with currency symbol
        return formatter.format(amount);
    } catch (error) {
        console.error('Error formatting currency:', error.message);
        return amount; // Return unformatted amount in case of error
    }
}




const getProductImage = async (id, admin, session) => {

    try {

        const res = await admin.rest.resources.Image.all({
            session: session,
            product_id: id,
        });

        // console.log("rsss",res.data[0].src)

        // const data = await res.json();

        return res.data[0].src
    } catch (error) {
        console.log("error", error);
        return ""
    }
}



const sendEmailWithContent = async (data, session, admin) => {

    const tags = data.tags;

    console.log("kkk", tags)

    const tagsArray = tags?.split(",").map(s => s.trim());


    for (let tag of tagsArray) {

        const doc = await TagInfoModel.findOne({ tag: tag })


        if (doc) {

            
            const productsTablePromise = data.line_items.map(async (item) => {

                const productImage = await getProductImage(item.product_id, admin, session)

                return (
                    `<tr class="order-list__item">
                        <td class="order-list__item__cell">
                            <table class="row" style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src=${productImage}
                                                align="left" width="60" height="60" class="order-list__product-image" />
                                        </td>
                                        <td class="order-list__product-description-cell">
                                            <span class="order-list__item-title">${`${item.title} × ${item.quantity}`}</span>
                                        </td>
                                        <td class="order-list__price-cell">
                                            <p class="order-list__item-original-price">${formatCurrency(data.total_price_set.presentment_money.currency_code, (Number(item.price)*Number(item.quantity)))}</p>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>`
                )
            })

            const productsTable = await Promise.all(productsTablePromise);

            let emailHtml = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Responsive Inline CSS Example with Button</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }

            .container {
              width: 100%;
              max-width: 650px;
              margin: 20px auto;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }

            .main-wrapper {
              border: .0625rem solid #ebebeb;
              border-radius: 4px;
            }

            .top-bar {
              position: relative;
              height: 2rem;
              padding: 0.5rem;
              border-bottom: .0625rem solid #ebeaeb;
              display: flex;
              align-items: center;
              color: #303030;
              font-size: 14px;
            }

            .header-wrapper {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin: 30px 30px 10px;
            }

            .text-button {
              margin: 10px 30px 20px;
            }

            h1.shop-name__text a {
              font-size: 30px;
              color: #333;
              text-decoration: none;
            }

            .content__cell h2 {
              font-weight: normal;
              font-size: 24px;
              margin: 0 0 10px;
            }

            .content__cell p {
              color: #777;
              font-size: 16px;
              margin: 0;
              line-height: 25px;
            }

            .actions__cell {
              width: 100%;
              margin-top: 20px;
              display: flex;
              align-items: center;
              gap: 20px;
            }

            .actions__cell a {
              font-size: 16px;
              text-decoration: none;
              margin: 0 auto;
              display: flex;
              justify-content: center;
            }

            a.button__text {
              background: #1990C6;
              padding: 20px 25px;
              border-radius: 4px;
              color: #ffffff;
            }

            .link.secondary-action-cell {
              display: flex;
              align-items: center;
              gap: 5px;
            }

            .link.secondary-action-cell a {
              color: #1990C6;
            }

            .section__cell {
              margin: 60px 30px 10px;
            }

            .section__cell_heading h3 {
              font-weight: normal;
              font-size: 20px;
              margin: 0 0 25px;
            }

            table {
              width: 100%;
            }

            span.order-list__item-discount-allocation {
              font-size: 14px;
              display: flex;
            }

            table img {
              border-radius: 8px;
              border: 1px solid #e5e5e5;
              margin-right: 15px;
            }

            .order-list__product-description-cell {
              width: 100%;
            }

            .order-list__item-title {
              font-size: 16px;
              font-weight: 600;
              line-height: 1.4;
              color: #555;
            }

            .order-list__item-price {
              color: #555;
              font-size: 16px;
              font-weight: 600;
            }

            .subtotal-line p {
              color: #777;
              line-height: 1.2em;
              font-size: 16px;
              margin: 4px 0 0;
            }

            .subtotal-line strong {
              font-size: 16px;
              color: #555;
            }

            .subtotal-table--total {
              border-top: 2px solid #e5e5e5;
            }

            .total-discount--amount {
              font-size: 16px;
              color: #555;
            }

            .discount-tag-icon {
              vertical-align: middle;
              margin-right: 6px;
            }

            td.order-list__item__cell {
              padding-top: 10px;
              border-bottom: 1px solid #e5e5e5;
              padding-bottom: 10px;
            }

            table.row.subtotal-table {
              margin: 20px 0 0 auto;
              width: 60%;
            }

            .total-discount {
              color: #777;
              font-size: 16px;
              text-align: right;
              width: 60%;
              margin: 5px 0 0 auto;
              border-bottom: 2px solid #e5e5e5;
              padding-bottom: 20px;
            }

            td.subtotal-line__value {
              text-align: end;
            }

            td.subtotal-line__value.total-des {
              padding: 20px 0 0;
            }

            td.subtotal-line__value.total-des strong {
              font-size: 22px;
              color: #555;
            }

            i.fa-solid.fa-tags {
              margin: 0 6px;
            }

            .information-wrapper {
              margin: 60px 30px 60px;
            }

            .information-inner {
              display: grid;
              grid-template-columns: 1fr 1fr;
              row-gap: 40px;
            }

            .information-wrapper h3 {
              font-weight: normal;
              font-size: 20px;
              margin: 0 0 25px;
            }

            .customer-info__item h4 {
              font-weight: 500;
              font-size: 16px;
              color: #555;
              margin: 0 0 5px;
            }

            .customer-info__item p {
              color: #777;
              line-height: 150%;
              font-size: 16px;
              margin: 0;
            }

            .disclaimer__subtext-wrapper {
              padding: 35px 0;
              border-top: 1px solid #e5e5e5;
            }

            p.disclaimer__subtext {
              color: #999;
              line-height: 25px;
              font-size: 14px;
              margin: 0 30px;
            }

            @media(max-width:640px) {
              .container {
                padding: 15px;
                width: fit-content;
                margin: 0;
              }

              .header-wrapper {
                align-items: start;
                margin: 20px 15px 12px;
                flex-direction: column;
              }

              .text-button {
                margin: 10px 15px 20px;
              }

              .section__cell {
                margin: 60px 15px 10px;
              }

              .actions__cell {
                flex-direction: column;
              }

              .button.main-action-cell {
                width: 100%;
              }

              .information-wrapper {
                margin: 60px 15px 60px;
              }

              .information-inner {
                grid-template-columns: 1fr;
              }

              p.disclaimer__subtext {
                margin: 0 15px;
              }

              table.row.subtotal-table {
                width: 100%;
              }

              .total-discount {
                width: 100%;
              }

              .order-list__item-title {
                font-size: 14px;
                margin-right: 5px;
              }
            }
          
        </style>
            </head>

           <body>

            
            <div class="container">
            <div class="main-wrapper">
                <div class="top-bar"><div class="top-bar-inner">Subject: Order ${data.name} ${tag}</div></div>
                <div class="header-wrapper">
                    <h1 class="shop-name__text"><a href="https://${session.shop}">${session.shop.split(".myshopify.com")[0]}</a></h1>
                    <span class="order-number__text">Order${data.name}</span>
                </div>
                <div class="text-button">
                    <div class="content__cell" id='emailContent'>
                        ${doc.tagEmailContent}
                    </div>
                    <div class="actions__cell">
                        <div class="button main-action-cell">
                            <a href="${data.order_status_url}" class="button__text">View your order</a>
                        </div>
                        <div class="link secondary-action-cell">
                            <span class="link__cell">or</span> <a href="https://${session.shop}">Visit our store</a>
                        </div>
                    </div>
                </div>
                <div class="section__cell">
                    <div class="section__cell_heading"><h3>Order summary</h3></div>
                    <div>
        
                    <table>
                    <tbody>
                    ${productsTable.map((item) => {
                return item
            })

                }
                    </tbody>
                    </table>
                        <table class="row subtotal-table" >
                            <tbody>
                            ${data?.discount_codes?.map((item) => {
                    return `<tr class="subtotal-line">
                        <td class="subtotal-line__title">
                            <p>Discount <i class="fa-solid fa-tags" ></i><span>${item.code}</span></p>
                        </td>
                        <td class="subtotal-line__value"><strong>${`-${formatCurrency(data.total_discounts_set.presentment_money.currency_code, item.amount)}`}</strong></td>
                        
                    </tr>`

                })
                }
                                <tr class="subtotal-line">
                                    <td class="subtotal-line__title"><p>Subtotal</p></td>
                                    <td class="subtotal-line__value" ><strong>${formatCurrency(data.current_subtotal_price_set.presentment_money.currency_code, data.current_subtotal_price_set.presentment_money.amount)}</strong></td>
                                </tr>
                                <tr class="subtotal-line">
                                    <td class="subtotal-line__title"><p>Shipping</p></td>
                                    <td class="subtotal-line__value" ><strong>${formatCurrency(data.total_shipping_price_set.presentment_money.currency_code, data.total_shipping_price_set.presentment_money.amount)}</strong></td>
                                </tr>
                                <tr class="subtotal-line">
                                    <td class="subtotal-line__title"><p>Taxes</p></td>
                                    <td class="subtotal-line__value" ><strong>${formatCurrency(data.current_total_tax_set.presentment_money.currency_code, data.current_total_tax_set.presentment_money.amount)}</strong> </td>
                                </tr>
                            </tbody>
                        </table>
        
                        <table class="row subtotal-table subtotal-table--total">
                            <tbody>
                                <tr class="subtotal-line">
                                    <td class="subtotal-line__title"><p>Total</p></td>
                                    <td class="subtotal-line__value total-des" ><strong>${formatCurrency(data.total_price_set.presentment_money.currency_code, data.total_price_set.presentment_money.amount)}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="total-discount">You saved <span class="total-discount--amount">${formatCurrency(data.total_discounts_set.presentment_money.currency_code, data.total_discounts_set.presentment_money.amount)}</span></p>
                    </div>
                </div>
                <div class="information-wrapper">
                    <h3>Customer information</h3>
                    <div class="information-inner">
                        <div class="customer-info__item">
                            <h4>Shipping address</h4>
                            <p>${data.shipping_address.name}
                                <br />${data.shipping_address.company || ""}<br />${data.shipping_address.address1 || ""}<br />${`${data.shipping_address.city} ${data.shipping_address.province} ${data.shipping_address.zip}`}<br />${data.shipping_address.country}</p>
                        </div>
                        <div class="customer-info__item">
                        <h4>Billing address</h4>
                        <p>${data.billing_address.name}
                            <br />${data.billing_address.company || ""}<br />${data.billing_address.address1 || ""}<br />${`${data.billing_address.city} ${data.billing_address.province} ${data.billing_address.zip}`}<br />${data.billing_address.country}</p>
                        </div>
                    </div>
                </div>
                <div class="disclaimer__subtext-wrapper">
                    <p class="disclaimer__subtext">
                        If you have any questions, reply to this email or contact us at <a style={{ fontSize: "14px", textDecoration: "none", color: "#1990C6" }}>support@themeignite.com</a></p>
                </div>
            </div>
        </div>
        </body>
        </html>
            `

            sendEmail(session.shop, data.contact_email, `Order ${data.name} ${tag}`, emailHtml)

        


        }

    }




}

export default sendEmailWithContent











