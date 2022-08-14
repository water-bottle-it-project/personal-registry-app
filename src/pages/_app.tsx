import type { ColorScheme, MantineThemeOverride } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import type { GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';

import { appSeo } from '~components/app/appSeo';

const COLOR_SCHEME_KEY = 'colorScheme';

const themeOverride: MantineThemeOverride = {
  components: {
    Paper: {
      defaultProps: { p: 'md', pt: 2, shadow: 'xl', withBorder: true },
    },
  },
};

type CustomAppProps = AppProps & {
  initialColorScheme: ColorScheme;
};

function MyApp({ Component, pageProps, initialColorScheme }: CustomAppProps) {
  // Dark mode support
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorScheme);
  themeOverride.colorScheme = colorScheme;

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
      <MantineProvider theme={themeOverride} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <DefaultSeo {...appSeo} />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  initialColorScheme: getCookie(COLOR_SCHEME_KEY, ctx) || 'light',
});
