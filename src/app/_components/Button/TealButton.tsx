import React from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface TealGradientButtonProps {
  text: string;
  href?: string;
  onClick?: () => void; // Allow for custom click handlers
  classNameCustom?: string;
}

const TealGradientButton: React.FC<TealGradientButtonProps> = ({
  text,
  href,
  onClick,
  classNameCustom,
}) => {
  const router = useRouter();

  const baseStyle = `
    w-full flex items-center justify-center 
    font-normal text-sm px-6 py-2 rounded-full md:hover:scale-105
    transition-all duration-300
    text-white bg-gradient-to-r from-colr-greenghost-teal to-colr-ghostverse-teal to-80%
    hover:to-100% hover:ring-2 hover:ring-colr-greenghost-teal
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colr-greenghost-teal`;

  // Combine navigation logic with custom click handlers
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={twMerge(baseStyle, classNameCustom)}
    >
      {text}
    </button>
  );
};

export default TealGradientButton;
