import React, { useCallback } from 'react';
import { Banner, Button } from '@shopify/polaris';

function WarningBanner({ isShow, setShow }) {
  const handleLearnMoreClick = useCallback(() => {
    window.open(
      'https://www.cloudflare.com/learning/email-security/what-is-smtp/',
      '_blank'
    );
  }, [])

  return (
    <Banner
      title="SMTP details are required for sending emails when adding tags to an order"
      status="warning"
      action={{
        content: 'Add SMTP Details',
        url: '/app/ManageSmtp',
      }}
      secondaryAction={{
        content: 'Learn more',
        onAction: handleLearnMoreClick,
      }}
      onDismiss={() => setShow(false)}
    >
      <p>
        To add tags to an order and send emails, you must provide SMTP details. Click 'Add SMTP Details' to fill out the required fields. If you're unfamiliar with SMTP, click 'Learn more' to find out more about it.
      </p>
    </Banner>
  );
}

export default WarningBanner;
