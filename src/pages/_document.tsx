// noinspection HtmlRequiredTitleElement

import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

/**
 * Custom Document: https://nextjs.org/docs/advanced-features/custom-document
 * Should not be edited.
 */
export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link href='https://fonts.googleapis.com' rel='preconnect' />
          <link crossOrigin='true' href='https://fonts.gstatic.com' rel='preconnect' />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
