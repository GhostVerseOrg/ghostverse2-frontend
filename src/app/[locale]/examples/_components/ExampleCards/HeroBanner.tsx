// components/HeroBanner.tsx
import React from 'react';

const headingStyle =
  'font-bold text-xl mt-4 transform hover:scale-110 transition duration-250 ease-in-out';
const cardStyle =
  'max-w-sm rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-gradient-to-br from-gray-700 to-gray-900 p-6 flex-col items-center';

const HeroBanner = () => {
  return (
    <div className="rounded-lg shadow-2xl p-6 bg-black text-white text-center">
      <h1 className="text-4xl font-bold mb-4 transform hover:scale-125 transition duration-250 ease-in-out">
        DAO Summary
      </h1>
      <p className="mb-8">Overview of Financials and Proposals</p>
      <div className="grid md:grid-cols-3 gap-4 justify-center">
        {/* Treasury Card */}
        <div className={cardStyle}>
          <h2 className={headingStyle}>Treasury ⬆️ 7%</h2>
          <p className="text-lg">Total Reserves: $320million</p>
        </div>
        {/* Proposal Card */}
        <div className={cardStyle}>
          <h2 className={headingStyle}>DAO Proposals</h2>
          <p className="text-lg">742 Approved</p>
        </div>
        {/* Yield Card */}
        <div className={cardStyle}>
          <h2 className={headingStyle}>24hr Yield ⬆️ 16%</h2>
          <p className="text-lg">$32,620.00</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
