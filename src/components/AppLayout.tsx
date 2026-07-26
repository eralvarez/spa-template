import type { ReactNode } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, type Path } from 'router';
import { Outlet, useLocation } from 'react-router';

export type AppLayoutNavigationItem = {
  name: string;
  href: Path;
};

export type AppLayoutUserNavItem = {
  name: string;
  href?: Path;
  onClick?: () => void;
};

export type AppLayoutUser = {
  name: string;
  email: string;
  imageUrl?: string;
};

type AppLayoutProps = {
  navigation: AppLayoutNavigationItem[];
  userNavigation: AppLayoutUserNavItem[];
  user: AppLayoutUser;
  title: string;
  logoUrl?: string;
  logoAlt?: string;
  children: ReactNode;
};

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function AppLayout({
  navigation,
  userNavigation,
  user,
  title,
  logoUrl,
  logoAlt,
}: AppLayoutProps) {
  const location = useLocation();
  const navWithCurrent = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                {logoUrl ? (
                  <img alt={logoAlt ?? ''} src={logoUrl} className="size-8" />
                ) : (
                  <div className="size-8 rounded bg-indigo-500" aria-hidden />
                )}
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navWithCurrent.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {user.imageUrl ? (
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="size-8 rounded-full bg-gray-500 outline -outline-offset-1 outline-white/10"
                      />
                    )}
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) =>
                      item.onClick ? (
                        <MenuItem key={item.name}>
                          <button
                            type="button"
                            onClick={item.onClick}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </button>
                        </MenuItem>
                      ) : (
                        <MenuItem key={item.name}>
                          <Link
                            to={item.href as Path}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ),
                    )}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navWithCurrent.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                {user.imageUrl ? (
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="size-10 rounded-full outline -outline-offset-1 outline-white/10"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="size-10 rounded-full bg-gray-500 outline -outline-offset-1 outline-white/10"
                  />
                )}
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user.email}
                </div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) =>
                item.onClick ? (
                  <DisclosureButton
                    key={item.name}
                    as="button"
                    type="button"
                    onClick={item.onClick}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ) : (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href as Path}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ),
              )}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <header className="relative bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
