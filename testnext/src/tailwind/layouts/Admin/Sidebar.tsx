import React from 'react';
import Link from 'next/link';

import { MenuIcon, XIcon } from '@heroicons/react/solid';
import {
  UserCircleIcon,
  CogIcon,
  UserIcon,
  ClipboardListIcon,
  ChatAlt2Icon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import { SidLink } from './Link';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          {/* Brand */}
          <Link href="/">
            <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              Prisma Admin
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserCircleIcon className="h-5 w-5" />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      Prisma Admin
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <SidLink link="/admin">
                <CogIcon className="h-5 w-5" />
                <span>Settings</span>
              </SidLink>
              <SidLink link="/admin/models/User">
                <UserIcon className="h-5 w-5" />
                <span>Users</span>
              </SidLink>
              <SidLink link="/admin/models/Post">
                <ClipboardListIcon className="h-5 w-5" />
                <span>Posts</span>
              </SidLink>
              <SidLink link="/admin/models/Comment">
                <ChatAlt2Icon className="h-5 w-5" />
                <span>Comments</span>
              </SidLink>
              <SidLink link="/admin/models/Group">
                <UserGroupIcon className="h-5 w-5" />
                <span>Groups</span>
              </SidLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
