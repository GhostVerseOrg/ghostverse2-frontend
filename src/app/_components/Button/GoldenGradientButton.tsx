import React from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface GoldenGradientButtonProps {
  text: string;
  href?: string;
  onClick?: () => void; // Allow for custom click handlers
  classNameCustom?: string;
}

const GoldenGradientButton: React.FC<GoldenGradientButtonProps> = ({
  text,
  href,
  onClick,
  classNameCustom,
}) => {
  const router = useRouter();

  const baseStyle = `
    w-full flex items-center justify-center p-3 rounded-full shadow-sm font-medium 
    transition-colors duration-300 transition-all
    md:hover:scale-105 hover:text-gray-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600
    bg-colr-mvx-teal text-black 
    `;

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

export default GoldenGradientButton;
