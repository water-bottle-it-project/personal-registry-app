import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import type { LinkProps } from 'next/link';
import Link from 'next/link';

/**
 * ButtonProps includes children?: React.ReactNode already
 */
interface LinkButtonProps extends ButtonProps {
  href: LinkProps['href'];
}

/**
 * Use this component when you need to link to a particular Next.js page route.
 * Don't use it for linking to external websites.
 * Don't use it for event handlers e.g. onClick()
 * @param href
 * @param buttonProps
 * @constructor
 */
export function LinkButton({ href, ...buttonProps }: LinkButtonProps) {
  return (
    <Link href={href} passHref>
      <Button component='a' {...buttonProps} />
    </Link>
  );
}
