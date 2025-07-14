import React from "react";
import { Page, Text, Divider, CalloutCard, Button } from "@shopify/polaris";
import Logo from '/email-tag-logo-removebg-preview.png'
import styles from "./_index/styles.module.css"
import { useNavigate } from "@remix-run/react";
import { QuestionCircleIcon } from '@shopify/polaris-icons';
import StepOne from '/step-1.png'
import StepTwo from '/step-2.jpg'
import StepThree from '/step-3.jpg'

React.useLayoutEffect = React.useEffect

export default function Index() {

  const navigate = useNavigate()

  return (
    <Page>
      <img className={styles[`app-logo`]} src={Logo} alt="email-tag-logo" />
      <Text variant="headingLg" alignment="center">Welcome to Email Tags</Text>

      <div className={styles[`guide`]}>
        <div style={{ marginTop: "1.5em" }}>

          <CalloutCard
            title="Customize the email tags"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Customize email tags',
              url: '/app/tags',
            }}
          >
            <p>Customize the email template using the tags. Tag an order, and the corresponding email with the matching tag will be sent.</p>
          </CalloutCard>
        </div>

        <div style={{ margin: "1em" }}>
          <Text variant="headingLg">Steps to Setup</Text>
          <Divider />
        </div>


        <div style={{
          display: "grid", textAlign: "center",
          gridTemplateColumns: "1fr 1fr 1fr", justifyContent: "space-between", justifyItems: "center", placeItems: "center"
        }}>
          <Text variant="headingMd"> Step 1 </Text>
          <Text variant="headingMd"> Step 2 </Text>
          <Text variant="headingMd"> Step 3 </Text>
        </div>

        <div style={{ placeContent: "center center", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyItems: "center" }}>
          <div className={styles[`guide-card`]}>
            <img className={styles[`guide-image`]} src={StepOne} alt="" />
            <Text variant="headingSm" alignment="center">Add your SMTP info for the sending email</Text>
            <button className={styles[`step-buttons`]} type="button" onClick={() => navigate("/app/ManageSmtp")}>Add SMTP Details</button>
          </div>
          <div className={styles[`guide-card`]}>
            <img className={styles[`guide-image`]} src={StepTwo} alt="" />
            <Text variant="headingSm" alignment="center">Add the tags  to your current email or create ones then add a tag</Text>
            <button className={styles[`step-buttons`]} type="button" onClick={() => navigate("/app/tags")}>Add Tags</button>
          </div>
          <div className={styles[`guide-card`]}>
            <img className={styles[`guide-image`]} src={StepThree} alt="" />
            <Text alignment="center" variant="headingSm">Add the tag to an order</Text>
            <button className={styles[`step-buttons`]} type="button" onClick={() => shopify.toast.show("This action performed by the admin", { duration: 2000, isError: false })}>Apply  tag to order</button>
          </div>
        </div>


        <div style={{ margin: "1em" }}>
          <Text variant="headingLg">Video Guides</Text>
          <Divider />
        </div>


        <div className={styles[`video-guide`]}>
          <div className={styles[`video-guide-card`]}>
            <iframe src="https://www.youtube.com/embed/m7wd016ARSU?si=ez4HyKQhPd5dyud4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className={styles[`video-guide-card`]}>
            <iframe src="https://www.youtube.com/embed/m7wd016ARSU?si=ez4HyKQhPd5dyud4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>

        <div style={{ marginTop: "2em" }}>

          <Text alignment="end">
            <Button onClick={() => shopify.toast.show(`Need to confiure contact information`, { duration: 2000, isError: false })} size="large" variant="primary" icon={QuestionCircleIcon} accessibilityLabel="Add theme" />
          </Text>
        </div>

      </div>
    </Page>

  );
}
