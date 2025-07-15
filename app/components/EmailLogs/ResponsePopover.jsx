import { Popover, Button, Icon, Text } from '@shopify/polaris';
import { ChatIcon } from '@shopify/polaris-icons'; 
import { useState } from 'react';

export function ResponsePopover({ content }) {
  const [active, setActive] = useState(false);

  const toggleActive = () => setActive((active) => !active);

  return (
    <Popover
      active={active}
      activator={
        <Button icon={<Icon source={ChatIcon} />} onClick={toggleActive} disabled={!content} />
      }
      onClose={toggleActive}
    >
      <Popover.Section>
        <Text variant="bodySm" as="p">{content ?? "N/A"}</Text>
      </Popover.Section>
    </Popover>
  );
}
