import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { AboutUs } from '~components/about/AboutUs';

const About: NextPage = () => {
  return (
    <>
      <NextSeo description='About This Website' title='About' />
      <AboutUs />
    </>
  );
};

export default About;
