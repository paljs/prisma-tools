import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps } from 'next/link';
import MuiLink from '@material-ui/core/Link';

const NextComposed = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & { className?: string; children?: React.ReactNode }
>(function NextComposed(props, ref) {
  const { as, href, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

const Link: React.FC<LinkProps2> = (props) => {
  const { href, activeClassName = 'active', className: classNameProps, innerRef, naked, ...other } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />;
  }

  return <MuiLink component={NextComposed} className={className} ref={innerRef} href={pathname || ''} {...other} />;
};

interface LinkProps2 extends LinkProps {
  href: string | LinkProps['href'];
  activeClassName?: string;
  className?: string;
  innerRef?: React.ForwardedRef<HTMLAnchorElement>;
  naked?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default React.forwardRef<HTMLAnchorElement, LinkProps2>((props, ref) => <Link {...props} innerRef={ref} />);
