import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { withTRPC } from '@trpc/next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ReactQueryDevtools } from 'react-query/devtools';

import { initAuth } from '~clientUtils/initAuth';
import { AppLayout } from '~components/app/AppLayout';
import { appSeo } from '~components/app/appSeo';
import { appTheme } from '~components/app/appThemeOverride';
import type { AppRouter } from '~pages/api/trpc/[trpc]';

const COLOR_SCHEME_KEY = 'colorScheme';

// Initialize Firebase auth
initAuth();

/**
 * Custom app component - the top levels of the component tree
 * @param Component - child components to be rendered
 * @param pageProps
 * @param initialColorScheme
 * @constructor
 */
function CustomApp({ Component, pageProps }: AppProps) {
  // Dark mode support
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: COLOR_SCHEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  appTheme.colorScheme = colorScheme;

  // Dark mode event handler
  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(newColorScheme);
  };

  // Render top-level App component
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={appTheme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <DefaultSeo {...appSeo} />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

/**
 * Wraps the CustomApp component with TRPC client-side query global context
 */
export default withTRPC<AppRouter>({
  config() {
    return {
      url: '/api/trpc',
    };
  },
  ssr: false,
})(CustomApp);
