import type { AppShellProps } from '@mantine/core';
import { AppShell } from '@mantine/core';

import type { AppFooterProps } from '~components/app/AppFooter';
import { AppFooter } from '~components/app/AppFooter';
import type { AppHeaderProps } from '~components/app/AppHeader';
import { AppHeader } from '~components/app/AppHeader';

const links: AppHeaderProps['links'] = [
  { name: 'Memories', route: '/timeline' },
  { name: 'Photos', route: '/images' },
  { name: 'Collections', route: '/collections' },
  { name: 'Create', route: '/create' },
  { name: 'Profile', route: '/profile' },
];

const linksFooter: AppFooterProps['links'] = [{ name: 'About', route: '/about' }];

/**
 * The layout for the entire app, which includes the sticky header and the main page content
 * @param children
 * @constructor
 */
export function AppLayout({ children }: AppShellProps) {
  return (
    <AppShell
      fixed
      footer={<AppFooter links={linksFooter} />}
      header={<AppHeader links={links} />}
      padding={0}
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
      })}
    >
      {children}
    </AppShell>
  );
}
