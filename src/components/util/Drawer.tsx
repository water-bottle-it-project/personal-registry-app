import { Burger, Button, Drawer, Group, Text } from '@mantine/core';
import { useState } from 'react';

export function MenuDrawer() {
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close Menu' : 'Open Menu';

  return (
    <>
      <Drawer
        onClose={() => setOpened(false)}
        opened={opened}
        padding='xl'
        size='xl'
        title='Registry'
      >
        {/* Drawer content */}

        <Text> ahjhh ahhhh ahhh h h hh h </Text>
      </Drawer>

      <Group position='center'>
        <Burger onClick={() => setOpened(o => !o)} opened={opened} title={title} />
      </Group>
    </>
  );
}
