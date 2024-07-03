import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <style>
          {`
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
          `}
        </style>
        <Meta />
        <Links />

      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
