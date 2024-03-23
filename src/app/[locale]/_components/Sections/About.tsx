import React from 'react';
import Image from 'next/image';

export const About = () => {
  return (
    <section
      id="about"
      className="
      max-w-[1280px] py-16 text-white flex flex-col items-center justify-center px-6 space-y-8
      lg:flex-row lg:justify-between md:px-12 lg:px-0 lg:space-y-0 lg:space-x-10"
    >
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left">
          About the MvX Me
        </h2>
        <p className="text-xl lg:text-2xl">
          The MvX Me is revolutionizing the digital finance space by leveraging
          the power of decentralized autonomous organization structures. Our
          goal is to empower individuals with the tools and knowledge needed to
          take control of their financial future.
        </p>
        <p className="text-xl lg:text-2xl">
          Through a combination of advanced technology, transparent processes,
          and community governance, were creating a new paradigm in wealth
          management thats open, inclusive, and forward-thinking.
        </p>
        {/* Add more content here if necessary */}
      </div>
      <div className="lg:w-1/2 max-w-lg mx-auto lg:mx-0">
        <Image
          src="/assets/img/DAOStory1.svg" // Replace with your about image path
          alt="About MvX Me"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </section>
  );
};
