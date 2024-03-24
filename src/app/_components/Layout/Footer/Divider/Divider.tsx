import clsx from 'clsx';

type Props = {
  isDark?: boolean;
  dividerColor?: string;
};

export const Divider = ({ isDark = false, dividerColor }: Props) => {
  return (
    <div
      className={clsx('h-px bg-gray-800 my-10', { 'bg-gray-600': isDark })}
      style={{ backgroundColor: dividerColor }}
    />
  );
};
