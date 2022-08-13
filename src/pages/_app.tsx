import type { ColorScheme, MantineThemeOverride } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { setCookies } from 'cookies-next';
import type { AppProps } from 'next/app';
import { useState } from 'react';

type CustomAppProps = AppProps & {
  initialColorScheme: ColorScheme;
};

function MyApp({ Component, pageProps, initialColorScheme }: CustomAppProps) {
  // Dark mode support
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorScheme);

  // Dark mode event handler
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  // Global theme overrides
  const themeOverride: MantineThemeOverride = {
    colorScheme,
    components: {
      Paper: {
        defaultProps: { p: 'md', pt: 2, shadow: 'xl', withBorder: true },
      },
    },
  };

  // Render top-level App component
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={themeOverride} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
