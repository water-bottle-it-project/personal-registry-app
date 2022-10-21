import { Container, createStyles, Group, Header } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppDrawer } from '~components/app/AppDrawer';
import { AppHeaderLogo } from '~components/app/AppHeaderLogo';
import { AppUserMenu } from '~components/app/AppUserMenu';
import { ColorSchemeToggle } from '~components/app/ColorSchemeToggle';

interface AppLink {
  name: string;
  route: string;
}

export interface AppHeaderProps {
  links: AppLink[];
}

const HAMBURGER_BREAKPOINT = 540;

/**
 * The header for the entire app
 * @param links
 * @constructor
 */
export function AppHeader({ links }: AppHeaderProps) {
  const { classes, cx } = useAppHeaderStyles();

  const router = useRouter();
  const routeIdx = links.findIndex(link => router.pathname.startsWith(link.route));

  const { width } = useViewportSize();
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
          {width > HAMBURGER_BREAKPOINT && linkElems}
        </Group>
        <Group spacing={6}>
          {width > HAMBURGER_BREAKPOINT ? (
            <>
              <AppUserMenu />
              <ColorSchemeToggle />
            </>
          ) : (
            <AppDrawer links={links} />
          )}
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

    [`@media (max-width: ${HAMBURGER_BREAKPOINT}px)`]: {
      padding: '14px 14px',
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

export { useAppHeaderStyles };
