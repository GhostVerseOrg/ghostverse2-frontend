import { twMerge } from 'tailwind-merge';

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        // Use z-index to avoid animated background going over the card.
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-colr-d-bg border border-gray-800 group-hover:border-slate-700 relative z-10',
        className,
      )}
    >
      <div className="relative">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        'text-zinc-100 font-bold tracking-wide mt-4',
        className,
      )}
    >
      {children}
    </p>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
        className,
      )}
    >
      {children}
    </p>
  );
};
