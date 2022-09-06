import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({ children, href }) => {
  const child = React.Children.only(children);
  const router = useRouter();

  if (router.asPath.includes('/playground')) {
    // console.log('This is to indicate that the current route containes /platform/playground')
    return (
      <Link href={href}>
        {React.cloneElement(child, {
          'aria-current': href.includes('/playground') ? 'page' : null,
        })}
      </Link>
    );
  }

  if (router.asPath.includes('/projects')) {
    // console.log('This is to indicate that the current route containes /platform/playground')
    return (
      <Link href={href}>
        {React.cloneElement(child, {
          'aria-current': href.includes('/projects') ? 'page' : null,
        })}
      </Link>
    );
  }

  return (
    <Link href={href}>
      {React.cloneElement(child, {
        'aria-current': router.asPath.includes(href) ? 'page' : null,
      })}
    </Link>
  );
};

export default NavLink;
