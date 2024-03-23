import { useState } from 'react';
import { MobileMenuItem } from './MenuItem';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
  parentMenuItem: MenuElement;
  onMenuItemClick: () => void;
};

export const NestedMenuItems = ({ parentMenuItem, onMenuItemClick }: Props) => {
  const [areChildrenVisible, setAreChildrenVisible] = useState(false);

  const toggleChildren = () => {
    setAreChildrenVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button
        className="flex items-center gap-2 font-medium w-full text-lg border-t h-16 border-gray-700"
        onClick={toggleChildren}
      >
        {parentMenuItem.Label}
        <ChevronRightIcon
          className={`-mr-1 ml-2 h-5 w-5 transition-transform stroke-[3px] ${
            areChildrenVisible && '-rotate-90'
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden w-full flex flex-col ml-5 ${
          areChildrenVisible ? 'h-32 -mb-5' : 'h-0'
        }`}
      >
        {parentMenuItem.Links?.map((item, index) => (
          <span key={item.Label + index}>
            <MobileMenuItem
              menuItem={item}
              onMenuItemClick={onMenuItemClick}
              classNameCustom="items-start"
            />
          </span>
        ))}
      </div>
    </div>
  );
};
