import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section
      id="hero"
      className="
      max-w-[1280px] mx-auto text-white flex flex-col text-center items-center justify-between px-6 py-20
      lg:flex-row lg:px-0 lg:py-32 lg:text-left"
    >
      <div className="lg:w-3/5 space-y-6">
        <h1 className="text-5xl lg:text-6xl font-bold leading-snug">
          Transform Your Wealth
        </h1>
        <p className="text-lg lg:text-2xl leading-relaxed mt-4">
          Elite finance converges with groundbreaking Artificial Intelligence to
          redefine wealth management. As pioneers at the forefront of digital
          innovation, we offer unparalleled opportunities for discerning
          investors to magnify their returns. Experience the apex of investment
          strategy specifically tailored for the elite.
        </p>

        <div className="flex justify-center gap-5 lg:justify-start w-full lg:w-fit">
          <Link
            href="/about"
            className="
              w-full max-w-60 lg:w-44 py-3 px-4 text-lg font-medium rounded-md text-center shadow-sm whitespace-nowrap transition-all duration-300 text-black bg-colr-mvx-teal 
              md:hover:scale-105 hover:bg-black hover:text-colr-mvx-teal hover:ring-2 hover:ring-colr-mvx-teal
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colr-mvx-teal"
          >
            Learn More
          </Link>
          <Link
            href="/unlock"
            className="
              w-full max-w-60 lg:w-44 py-3 px-4 text-lg font-medium rounded-md text-center shadow-sm whitespace-nowrap transition-all duration-300 text-white border border-colr-mvx-teal 
              md:hover:scale-105 hover:bg-colr-mvx-teal hover:text-black hover:ring-2 hover:ring-white
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colr-mvx-teal"
          >
            Connect Wallet
          </Link>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end w-full lg:w-2/5 max-w-lg lg:max-w-none">
        <Image
          src="/assets/img/phoenix-icon.png"
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
