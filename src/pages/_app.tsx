import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { withTRPC } from '@trpc/next';
import { getCookie, setCookies } from 'cookies-next';
import type { GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AppLayout } from '~components/app/AppLayout';
import { appSeo } from '~components/app/appSeo';
import { appTheme } from '~components/app/appThemeOverride';
import type { AppRouter } from '~pages/api/trpc/[trpc]';

const COLOR_SCHEME_KEY = 'colorScheme';

type CustomAppProps = AppProps & {
  initialColorScheme: ColorScheme;
};

/**
 * Custom app component - the top levels of the component tree
 * @param Component - child components to be rendered
 * @param pageProps
 * @param initialColorScheme
 * @constructor
 */
function CustomApp({ Component, pageProps, initialColorScheme }: CustomAppProps) {
  // Dark mode support
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorScheme);
  appTheme.colorScheme = colorScheme;

  // Dark mode event handler
  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(newColorScheme);
    setCookies(COLOR_SCHEME_KEY, newColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
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

// Use client cookie to server-side render the stored color scheme without a flash
CustomApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  initialColorScheme: getCookie(COLOR_SCHEME_KEY, ctx) || 'light',
});

export default withTRPC<AppRouter>({
  config() {
    return { url: '/api/trpc' };
  },
  ssr: false,
})(CustomApp);
