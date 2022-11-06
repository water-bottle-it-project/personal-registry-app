import { Anchor } from '@mantine/core';
import Link from 'next/link';

/**
 * App logo which appears in the header.
 * @constructor
 */
export function AppText() {
  return (
    <>
      <Link href='/' passHref>
        <Anchor component='a' pr={7} underline={false} weight={700}>
          SnapSave
        </Anchor>
      </Link>
    </>
  );
}
