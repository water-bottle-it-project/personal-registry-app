import type { NextPage } from 'next';

import { AppLayout } from '~components/app/AppLayout';
import { ColorSchemeToggle } from '~components/app/ColorSchemeToggle';

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div>Hello</div>
      <ColorSchemeToggle />
    </AppLayout>
  );
};

export default Home;
