import type { DefaultSeoProps } from 'next-seo';

const appSeo: DefaultSeoProps = {
  defaultTitle: 'SnapSave',
  description: 'A personal registry to catalogue memories and artifacts.',
  title: undefined,
  titleTemplate: '%s | SnapSave',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
  },
};

export { appSeo };
