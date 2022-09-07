import { Burger, Drawer, Group, Space, Text } from '@mantine/core';
import { createStyles } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AppUserMenu } from '~components/app/AppUserMenu';
import { ColorSchemeToggle } from '~components/app/ColorSchemeToggle';

interface AppLink {
  name: string;
  route: string;
}

interface AppHeaderProps {
  [x: string]: any;
  links: AppLink[];
}

export function MenuDrawer({ links }: AppHeaderProps) {
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
        size='xl'
        styles={{ closeButton: { '& svg': { width: '30px', height: '30px' } } }}
      >
        {/* Drawer content */}
        <Text size='xl' weight={800}>
          Registry
        </Text>

        <Space h='sm' />
        <div>{linkElems} </div>

        <Space h='md' />
        <Group align='center' spacing={10}>
          <AppUserMenu />
          <ColorSchemeToggle />
        </Group>
      </Drawer>

      <Group position='center'>
        <Burger onClick={() => setOpened(o => !o)} opened={opened} title={title} />
      </Group>
    </>
  );
}

const useAppHeaderStyles = createStyles(theme => ({
  headerBase: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.8)' : 'rgba(255, 255, 255, 0.93)',
    backdropFilter: 'blur(3px)',
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 8px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    fontWeight: 600,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));
