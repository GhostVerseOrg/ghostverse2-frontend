import React from 'react';

interface HorizontalCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="flex max-w-xl rounded-lg overflow-hidden shadow-lg my-2 bg-white">
      <img className="w-1/4 object-cover" src={imageUrl} alt="Media" />
      <div className="w-3/2 p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HorizontalCard;
