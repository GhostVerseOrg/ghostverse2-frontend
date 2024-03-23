'use client';
import { IconContext } from 'react-icons';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
} from 'next-share';

export const BlogShareLinks = () => {
  return (
    <div className="flex items-center justify-center gap-x-4">
      <IconContext.Provider
        value={{
          className:
            'fill-gray-400 w-[18px] h-[18px] lg:w-[21px] lg:h-[21px] hover:fill-colr-mvx-teal duration-300 hover:scale-105 hover:-translate-y-1',
        }}
      >
        {/* Instagram */}
        <InstapaperShareButton
          className=""
          url={'https://github.com/next-share'}
          title={'Share to Instagram'}
        >
          <FaInstagram />
        </InstapaperShareButton>

        {/* Facebook */}
        <FacebookShareButton
          url={'https://github.com/next-share'}
          quote={'Share to Facebook'}
          hashtag={'#nextshare'}
        >
          <FaFacebookF />
        </FacebookShareButton>

        {/* Twitter */}
        <TwitterShareButton
          url={'https://github.com/next-share'}
          title={'Share to Twitter'}
        >
          <FaXTwitter />
        </TwitterShareButton>
      </IconContext.Provider>
    </div>
  );
};
