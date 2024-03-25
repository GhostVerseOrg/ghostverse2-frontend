import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section
      id="hero"
      className="
      max-w-[1280px] mx-auto text-colr-d-fg flex flex-col text-center items-center justify-between px-6 py-20
       lg:px-0 lg:mx-80"
    >
      <div className="w-full space-y-8 mb-10">
        <h1 className="text-5xl lg:text-7xl font-bold lg:leading-snug">
          Unlock The Power Of GREEN token With GhostVerse DAO
        </h1>
        <p className="text-lg text-colr-l-fg leading-relaxed my-5">
          Join a scary universe ghostverned by 2664 Mr Ghost NFT
        </p>
        <div className="flex justify-center gap-5 lg:justify-start w-full lg:w-fit mx-auto">
          <Link
            href="/about"
            className="
              w-full max-w-60 lg:w-44 py-3 px-4 text-lg font-medium rounded-lg text-center shadow-sm whitespace-nowrap transition-all duration-300 text-black bg-colr-mvx-teal 
              md:hover:scale-105 hover:bg-colr-d-bg hover:text-colr-mvx-teal hover:ring-2 hover:ring-colr-mvx-teal
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colr-mvx-teal"
          >
            Learn More
          </Link>
          <Link
            href="/unlock"
            className="
              w-full max-w-60 lg:w-44 py-3 px-4 text-lg font-medium rounded-lg text-center shadow-sm whitespace-nowrap transition-all duration-300 text-colr-d-fg border border-colr-mvx-teal 
              md:hover:scale-105 hover:bg-colr-mvx-teal hover:text-black hover:ring-2 hover:ring-white
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colr-mvx-teal"
          >
            Connect Wallet
          </Link>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none">
        <Image
          src="/assets/img/hero-ghostverse.jpeg"
          alt="MvX Me Phoenix"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </div>
    </section>
  );
};
