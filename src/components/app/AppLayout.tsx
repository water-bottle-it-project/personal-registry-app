import type { AppShellProps } from '@mantine/core';
import { AppShell, Space } from '@mantine/core';

import type { AppHeaderProps } from '~components/app/AppHeader';
import { AppHeader } from '~components/app/AppHeader';

const links: AppHeaderProps['links'] = [
  { name: 'Timeline', route: '/timeline' },
  { name: 'Images', route: '/images' },
  { name: 'Collections', route: '/collections' },
  { name: 'Create', route: '/create' },
];

/**
 * The layout for the entire app, which includes the sticky header and the main page content
 * @param children
 * @constructor
 */
export function AppLayout({ children }: AppShellProps) {
  return (
    <AppShell
      fixed
      header={<AppHeader links={links} />}
      padding={0}
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
      })}
    >
      <Space h='md' />
      {children}
    </AppShell>
  );
}
