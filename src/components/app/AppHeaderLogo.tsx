import { Center, Image, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

/**
 * App logo which appears in the header.
 * @constructor
 */
const LOGO_SIZE = 28;

export function AppHeaderLogo() {
  const theme = useMantineTheme();
  return (
    <Center pr={7}>
      <Link href='/' passHref>
        <a>
          <Image
            alt='SnapSave logo'
            height={LOGO_SIZE}
            src={theme.colorScheme === 'dark' ? '/icon_dark.png' : '/icon.png'}
            width={LOGO_SIZE}
          />
        </a>
      </Link>
    </Center>
  );
}
