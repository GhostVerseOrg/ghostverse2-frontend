'use client';
import React, { useState } from 'react';

const ExpandableCard: React.FC<{
  title: string;
  summary: string;
  details: string;
}> = ({ title, summary, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="p-4">
        <h2 className="font-bold text-lg text-white">{title}</h2>
        <p className="text-white">{summary}</p>
        <button
          className="mt-2 text-blue-500 hover:text-blue-300 transition duration-150 ease-in-out"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Show Less' : 'Show More'}
        </button>
      </div>
      {isOpen && (
        <div className="p-4 border-t">
          <p className="text-white">{details}</p>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;
