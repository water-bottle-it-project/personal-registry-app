import { Container, createStyles, Group, Header } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppHeaderLogo } from '~components/app/AppHeaderLogo';
import { AppUserMenu } from '~components/app/AppUserMenu';
import { ColorSchemeToggle } from '~components/app/ColorSchemeToggle';
import { MenuDrawer } from '~components/util/Drawer';

interface AppLink {
  name: string;
  route: string;
}

export interface AppHeaderProps {
  links: AppLink[];
}

/**
 * The header for the entire app
 * @param links
 * @constructor
 */
export function AppHeader({ links }: AppHeaderProps) {
  const { classes, cx } = useAppHeaderStyles();

  const router = useRouter();
  const routeIdx = links.findIndex(link => router.pathname.startsWith(link.route));

  const linkElems = links.map((link, i) => (
    <Link href={link.route} key={link.name}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: i === routeIdx,
        })}
      >
        {link.name}
      </a>
    </Link>
  ));

  return (
    <Header classNames={{ root: classes.headerBase }} height={48} mb={0}>
      <Container className={classes.headerContainer} size='xl'>
        <Group spacing={6}>
          <AppHeaderLogo />
          {linkElems}
        </Group>
        <Group spacing={6}>
          <AppUserMenu />
          <ColorSchemeToggle />
          <MenuDrawer />
        </Group>
      </Container>
    </Header>
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
