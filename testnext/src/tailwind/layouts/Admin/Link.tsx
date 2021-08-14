import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

interface SidLinkProps {
  link: string;
}
export const SidLink: React.FC<SidLinkProps> = ({ children, link }) => {
  const router = useRouter();
  return (
    <li className="items-center">
      <Link href={link}>
        <a
          className={`flex items-center space-x-2 ${
            router.pathname === link ? 'text-pink-500 hover:text-pink-600' : 'text-gray-700 hover:text-gray-500'
          } text-xs uppercase py-3 font-bold block`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};
