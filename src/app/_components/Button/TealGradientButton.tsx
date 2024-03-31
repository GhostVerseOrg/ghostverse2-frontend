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

  const baseStyle = `button_primary_rounded_full`;

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
