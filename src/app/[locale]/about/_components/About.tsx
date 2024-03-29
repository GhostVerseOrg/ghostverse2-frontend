import React from 'react';
import Image from 'next/image';

export const About = () => {
  return (
    <section
      id="about"
      className="
      max-w-[1280px] py-16 text-colr-d-fg flex flex-col items-center justify-center px-6 space-y-8
      lg:flex-row lg:justify-between md:px-12 lg:px-0 lg:space-y-0 lg:space-x-10"
    >
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left">
          About the GhostVerse
        </h2>
        <p className="text-xl lg:text-2xl">
          Creative Web3 agency building on MultiversX.
        </p>
        <p className="text-xl lg:text-2xl">
          Gokai Labs is a contributor and community member of the GhostVerse DAO
          on MultiversX.
        </p>
        <p className="text-xl lg:text-2xl">
          We&apos;re a creative team of developers, designers, and artists
          building the future of the ghost web.
        </p>
      </div>
      <div className="lg:w-1/2 max-w-lg mx-auto lg:mx-0">
        <Image
          src="/assets/img/ghostverse-hero.jpeg"
          alt="About GhostVerse"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </section>
  );
};
