import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section
      id="hero"
      className="
      max-w-[990px] mx-auto flex flex-col text-center items-center justify-between px-4 py-14 lg:py-20
       lg:px-0"
    >
      <div className="w-full space-y-6 lg:space-y-8 mb-20">
        <h1 className="text-3xl lg:text-7xl font-bold lg:leading-tight">
          Unlock The Power Of{' '}
          <span className="bg-gradient-to-br from-colr-ghostverse-teal to-colr-greenghost-teal bg-clip-text text-transparent">
            GREEN
          </span>{' '}
          token With <span className="text-colr-l-primary">GhostVerse</span>
        </h1>
        <p className="text-lg text-colr-l-secondary leading-relaxed my-5">
          Join a scary universe ghostverned by 2664 Mr Ghost NFT
        </p>
        <div className="flex justify-center gap-5 w-full lg:w-fit mx-auto">
          <Link href="/about" className="button_primary_rounded">
            Learn More
          </Link>
          <Link href="/unlock" className="button_secondary_rounded">
            Connect Wallet
          </Link>
        </div>
      </div>
      <div className="max-w-4xl w-full">
        <Image
          src="/assets/img/hero-ghostverse.png"
          alt="GhostVerse Logo"
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
