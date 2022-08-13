import type { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
  defaultTitle: 'Personal Register',
  description: 'A personal register to catalogue images of artifacts and memories',
  title: undefined,
  titleTemplate: '%s | Family Register',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
  },
};

export { SEO };
