import { Anchor, Container, createStyles, Group, Text } from '@mantine/core';
import Link from 'next/link';

import { AppText } from '~components/app/AppText';

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

  const items = links.map(link => (
    <Link href={link.route} key={link.name} passHref>
      <Anchor color='dimmed' component='a' size='sm'>
        {link.name}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner} size='xl'>
        <AppText />
        <Text color='dimmed' size='xs' weight={300}>
          Powered by Team 55: water bottle™
        </Text>
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
