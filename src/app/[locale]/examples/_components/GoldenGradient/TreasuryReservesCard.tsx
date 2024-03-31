import React from 'react';
import { getTranslations } from 'next-intl/server';

interface TreasuryReservesCardProps {
  treasuryFunds: string;
}

export const TreasuryReservesCard: React.FC<
  TreasuryReservesCardProps
> = async ({ treasuryFunds }) => {
  const t = await getTranslations();

  return (
    <div className="w-full max-w-xs bg-gradient-to-br from-gray-800 to-gray-900 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-4 text-white flex flex-col items-center">
      <h3 className="text-sm sm:text-md font-bold tracking-wide text-colr-ghostverse-teal truncate">
        {t('treasuryReserves')}
      </h3>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 truncate">
        {treasuryFunds}
      </p>
    </div>
  );
};

export default TreasuryReservesCard;
