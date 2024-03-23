// components/ProfileCard.tsx
import React from 'react';

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  socialLinks: { icon: JSX.Element; url: string }[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  name,
  socialLinks,
}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-gradient-to-br from-gray-700 to-gray-900 p-6 text-white flex flex-col items-center">
      <img
        className="hover:bg-colr-mvx-teal rounded-full h-24 w-24 border-4 border-colr-mvx-teal transform hover:scale-110 transition duration-250 ease-in-out relative"
        src={avatarUrl}
        alt={name}
      />
      <div className="font-bold text-xl mt-4 transform hover:scale-125 transition duration-250 ease-in-out relative">
        {name}
      </div>
      <div className="flex mt-3">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="mx-2 text-white hover:text-colr-mvx-teal transition-colors duration-300"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
