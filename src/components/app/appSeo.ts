import type { DefaultSeoProps } from 'next-seo';

const appSeo: DefaultSeoProps = {
  defaultTitle: 'Personal Registry',
  description: 'A personal registry to catalogue memories and artifacts.',
  title: undefined,
  titleTemplate: '%s | Personal Registry',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
  },
};

export { appSeo };
