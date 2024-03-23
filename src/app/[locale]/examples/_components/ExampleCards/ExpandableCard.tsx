// ExpandableCard.tsx
'use client';
import React, { useState } from 'react';

const ExpandableCard: React.FC<{
  title: string;
  summary: string;
  details: string;
}> = ({ title, summary, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-md bg-white">
      <div className="p-4">
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{summary}</p>
        <button
          className="mt-2 text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Show Less' : 'Show More'}
        </button>
      </div>
      {isOpen && (
        <div className="p-4 border-t">
          <p>{details}</p>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;

// // In your page component
// import React from 'react';
// import ExpandableCard from './ExpandableCard'; // Adjust the import path as needed

// const ExamplePage: React.FC = () => {
//   return (
//     <div className="space-y-4">
//       <ExpandableCard
//         title="Expandable Card Title"
//         summary="This is a summary of the content."
//         details="Here are the expanded details that you will see when you click the 'Show More' button."
//       />
//     </div>
//   );
// };

// export default ExamplePage;
