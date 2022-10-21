import { Burger, Drawer, Group, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { AppHeaderProps } from '~components/app/AppHeader';
import { useAppHeaderStyles } from '~components/app/AppHeader';
import { AppUserMenu } from '~components/app/AppUserMenu';
import { ColorSchemeToggle } from '~components/app/ColorSchemeToggle';

export function AppDrawer({ links }: AppHeaderProps) {
  const [opened, setOpened] = useState(false);
  const { classes, cx } = useAppHeaderStyles();
  const title = opened ? 'Close Menu' : 'Open Menu';

  const router = useRouter();
  const routeIdx = links.findIndex(link => router.pathname.startsWith(link.route));

  const linkElems = links.map((link, i) => (
    <Link href={link.route} key={link.name}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: i === routeIdx,
        })}
        onClick={() => setOpened(false)}
      >
        {link.name}
      </a>
    </Link>
  ));

  return (
    <>
      <Drawer
        closeButtonLabel='Close drawer'
        onClose={() => setOpened(false)}
        opened={opened}
        padding='xl'
        position='right'
        size='md'
        styles={{ closeButton: { '& svg': { width: '30px', height: '30px' } } }}
      >
        {/* Drawer content */}
        <Title color='indigo' weight={800}>
          SnapSave
        </Title>

        <Space h='sm' />
        <div>{linkElems}</div>

        <Space h='md' />
        <Group align='center' spacing={10}>
          <AppUserMenu />
          <ColorSchemeToggle />
        </Group>
      </Drawer>

      <Group position='center'>
        <Burger onClick={() => setOpened(o => !o)} opened={opened} size='sm' title={title} />
      </Group>
    </>
  );
}
