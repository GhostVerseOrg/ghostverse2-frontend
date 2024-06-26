import { Fragment, ReactNode, useEffect, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

type Props = {
  title: any;
  children: ReactNode;
  classNameCustom?: string;
};

export const DropdownMenu = ({ title, children, classNameCustom }: Props) => {
  // HeadlessUI doesn't provide a hover event for the Menu component.
  // https://github.com/tailwindlabs/headlessui/issues/239#issuecomment-2013907528 use this instead.
  const popoverRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const popover = popoverRef.current;
    const button = buttonRef.current;

    if (!popover || !button) {
      console.warn(
        'usePopoverHover: Please assign popoverRef and buttonRef for this to function correctly.',
      );
      return () => {};
    }

    const clickButton = () => {
      button.click();
    };

    popover.addEventListener('mouseenter', clickButton);
    popover.addEventListener('mouseleave', clickButton);

    return () => {
      popover.removeEventListener('mouseenter', clickButton);
      popover.removeEventListener('mouseleave', clickButton);
    };
  }, []);

  return (
    <Menu as="div" className="flex-wrap" ref={popoverRef}>
      {({ open }) => (
        <Fragment>
          <div>
            <Menu.Button
              ref={buttonRef}
              className={twMerge(
                `flex justify-between items-center duration-200 outline-none focus:outline-none hover:text-colr-ghostverse-teal`,
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
              className="
              absolute bg-black rounded-md
              border border-gray-800 
              outline-none focus:outline-none"
            >
              {children}
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};
