import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { WavyBackground } from './_components/wavy-background/wavy-background';
import SignUpForm from './_components/SignUpForm/SignUpForm';

// @ts-ignore
export default async function Page({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  // By passing an explicit locale to the awaitable functions from next-intl,
  // we can make the metadata handler eligable for static rendering.
  const t = await getTranslations({ locale: locale });

  return (
    <div className="bg-colr-d-bg w-full h-full">
      <WavyBackground>
        <div className="space-y-5 flex flex-col justify-center text-white">
          <div className="w-3/5 flex justify-center mx-auto">
            <Image
              src="/assets/img/hero-ghostverse.jpeg"
              alt="GhostVerse Logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          {/* App Name */}
          <p
            className="
          text-5xl text-center font-philosopher-regular font-extrabold whitespace-nowrap
          md:text-7xl
          "
          >
            GhostVerse
          </p>
          <h1 className="text-3xl text-center font-bold">Coming Soon</h1>
          <SignUpForm />
        </div>
      </WavyBackground>
    </div>
  );
}

// @ts-ignore
export async function generateMetadata({ params: { locale } }) {
  // Optionally integrate with static rendering in the
  // Metadata API by passing an explicit locale.
  const t = await getTranslations({ locale });

  // return {
  //   title: t('mainPageTitle'),
  //   description: t('mainPageDescription'),
  // };

  return {
    title: 'Coming Soon | GhostVerse',
    description: 'Coming Soon | GhostVerse',
  };
}
