import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  imageUrl: string;
  socialMediaLinks?: string[];
  bio?: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  imageUrl,
  socialMediaLinks,
  bio,
}) => {
  return (
    <div className="border border-ghost-color2/20 border-px bg-ghost-color2/5 py-3 px-6 relative flex flex-col items-center duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-opacity-10 hover:bg-white">
      <div className="flex justify-center items-center size-[90px] lg:size-[180px]">
        <Image
          src={imageUrl}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '90%', height: 'auto' }}
        />
      </div>
      <div className="flex-1 font-cubic10">
        <div className="text-center font-bold text-xl">{name}</div>
        {bio && <div className="text-center">{bio}</div>}
      </div>

      {socialMediaLinks && (
        <div className="flex flex-col gap-2 absolute top-5 right-5">
          {socialMediaLinks.map((link, index) => (
            <SocialIcon
              className="duration-300 hover:scale-105 hover:-translate-y-1"
              key={index}
              url={link}
              style={{ width: 35, height: 35 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
