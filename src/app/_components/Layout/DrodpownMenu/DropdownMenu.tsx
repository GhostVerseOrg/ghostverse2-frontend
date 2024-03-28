import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

type Props = {
  title: any;
  children: ReactNode;
  classNameCustom?: string;
};

export const DropdownMenu = ({ title, children, classNameCustom }: Props) => {
  return (
    <Menu as="div" className="flex-wrap relative">
      {({ open }) => (
        <Fragment>
          <div>
            <Menu.Button
              className={twMerge(
                `flex justify-between items-center text-lg font-medium 
                hover:text-colr-mvx-teal duration-200`,
                classNameCustom,
              )}
            >
              {title}

              <ChevronDownIcon
                className={`ml-2 h-5 w-5 transition-transform [&>path]:stroke-[2] ${
                  open && '-rotate-180'
                }`}
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`absolute z-10 text-lg mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white
               shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {children}
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};
