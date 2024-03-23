'use client';
import { IconContext } from 'react-icons';
import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { SocialLink } from '@/app/_components/Layout/Footer/SocialLinks/SocialLink';

export const SocialLinks = () => {
  return (
    <div className="flex text-teal-300 gap-x-4 justify-center mt-1 sm:mt-0 items-center">
      <IconContext.Provider
        value={{
          className: 'fill-slate-300 w-6 h-6 sm:w-[22px] sm:h-[22px]',
        }}
      >
        <SocialLink href="https://twitter.com/mvxunity" label="">
          <FaXTwitter className="hover:fill-colr-mvx-teal" />
        </SocialLink>
        <SocialLink href="https://dsc.gg/mvx" label="">
          <FaDiscord className="hover:fill-colr-mvx-teal" />
        </SocialLink>
        <SocialLink href="https://github.com/mvxme" label="">
          <FaGithub className="hover:fill-colr-mvx-teal" />
        </SocialLink>
      </IconContext.Provider>
    </div>
  );
};
