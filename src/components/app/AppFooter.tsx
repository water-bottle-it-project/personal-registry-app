import { Anchor, Container, createStyles, Group, Footer } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppHeaderLogo } from '~components/app/AppHeaderLogo';

interface AppLink {
  name: string;
  route: string;
}

export interface AppFooterProps {
  //links: { link: string; label: string }[];
  links: AppLink[];
}

/**
 * The footer for the entire app
 * @param links
 * @constructor
 */
export function AppFooter({ links }: AppFooterProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const routeIdx = links.findIndex(link => router.pathname.startsWith(link.route));

  const items = links.map(link => (
    <Link href={link.route} key={link.name}>
      <Anchor<'a'> color='dimmed' href={link.route} key={link.name} size='sm'>
        {link.name}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <AppHeaderLogo />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

const useStyles = createStyles(theme => ({
  footer: {
    // marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));
