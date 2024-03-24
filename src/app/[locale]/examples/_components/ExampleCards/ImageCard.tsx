// components/ImageCard.tsx
import React from 'react';

interface ImageCardProps {
  imageUrl: string;
  title: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out relative">
      <img
        className="w-full object-cover h-64 hover:opacity-80"
        src={imageUrl}
        alt={title}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-colr-d-bg bg-opacity-75 p-4">
        <div className="font-bold text-colr-d-fg text-xl text-center">
          {title}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
