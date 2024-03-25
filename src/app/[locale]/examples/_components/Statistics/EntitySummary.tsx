import React from 'react';
import { EntitySummary } from '../../_types/entitySummary';

interface EntitySummaryCardProps {
  transactions: EntitySummary[];
}

export const EntitySummaryCard: React.FC<EntitySummaryCardProps> = ({
  transactions,
}) => {
  return (
    <div className="container mx-auto flex flex-wrap justify-center gap-4">
      {transactions.map((transaction: EntitySummary) => (
        <div
          key={transaction.id}
          className="w-full max-w-xs bg-gradient-to-br from-gray-800 to-gray-900 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-4 text-white flex flex-col items-center"
        >
          <h3 className="text-sm sm:text-md font-medium tracking-wide text-colr-mvx-teal">
            {transaction.recipient}
          </h3>
          <p className="text-lg sm:text-xl font-semibold">
            {transaction.amount}
          </p>
          {/* <p className="text-xs sm:text-sm text-gray-400">{transaction.date}</p> */}
          <p className="text-xs sm:text-sm text-gray-400">{transaction.note}</p>
        </div>
      ))}
    </div>
  );
};
