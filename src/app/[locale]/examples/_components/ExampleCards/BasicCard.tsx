import React from 'react';

interface BasicCardProps {
  title: string;
  content: string;
  footer: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ title, content, footer }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md p-6 m-4 bg-gray-800 border border-gray-700">
      <h2 className="text-xl font-bold text-gray-100 mb-2">{title}</h2>
      <p className="text-gray-300 text-base mb-4">{content}</p>
      <div className="text-gray-500 text-sm">{footer}</div>
    </div>
  );
};

export default BasicCard;
