import type { PropsWithChildren, MouseEvent } from 'react';

interface ButtonType extends PropsWithChildren {
  onClick: (e: MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  id,
  className = `
    inline-block rounded-lg px-3 py-2 text-center my-0 mr-0 text-colr-d-fg bg-blue-600
    hover:bg-blue-700 hover:no-underline
    disabled:text-black disabled:cursor-not-allowed disabled:bg-gray-200`,
  ...otherProps
}: ButtonType) => {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};
