interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <img className="w-full" src={imageUrl} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-colr-d-fg">
          {title}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
