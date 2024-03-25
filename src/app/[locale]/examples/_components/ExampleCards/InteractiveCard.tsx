'use client';
import React, { useState } from 'react';

interface InteractiveCardProps {
  title: string;
  description: string;
}

const buttonStyle =
  'px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold';

const EnhancedInteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
}) => {
  const [value, setValue] = useState(0);

  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-2xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col items-center space-y-4 transition duration-500 ease-in-out transform hover:-translate-y-1">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-lg">{description}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
      <div className="flex space-x-2">
        <button className={`${buttonStyle} bg-blue-600`}>I Will Borrow</button>
        <button className={`${buttonStyle} bg-green-600`}>Collateralise</button>
      </div>
      <span>{value} kg Gold (Au)</span>
    </div>
  );
};

export default EnhancedInteractiveCard;
