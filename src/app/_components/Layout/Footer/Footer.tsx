import Link from 'next/link';
import { SocialLinks } from '@/app/_components/Layout/Footer/SocialLinks';
import Image from 'next/image';
import { Divider } from './Divider';

export const Footer = () => {
  return (
    <footer className="w-full max-w-[1800px] mx-auto px-4 lg:px-20">
      <Divider />
      <div className="my-5 pb-4 md:flex md:justify-start pl-5 md:pl-2">
        {/* Footer Logo */}
        <div className="mb-6 md:mb-0 md:min-w-[250px] lg:min-w-[300px]">
          <Link href="/" className="hidden md:flex items-center">
            <Image
              src="/assets/img/logo-ghostverse.png"
              alt="GhostVerse"
              width={200}
              height={40}
              priority
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 lg:gap-16">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
              Follow us
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <Link
                  href="https://medium.com/@GokaiLabs"
                  className="hover:text-colr-ghostverse-teal"
                >
                  Medium
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="https://twitter.com/GokaiLabs"
                  className="hover:text-colr-ghostverse-teal"
                >
                  Twitter
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="https://discord.com/invite/tXSeJfVVnH"
                  className="hover:text-colr-ghostverse-teal"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/gokaiorg"
                  className="hover:text-colr-ghostverse-teal"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
              Resources
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <Link href="/" className="hover:text-colr-ghostverse-teal">
                  Governance
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/" className="hover:text-colr-ghostverse-teal">
                  Lightpaper
                </Link>
              </li>
              <li>
                <Link
                  href="https://multiversx.com/"
                  className="hover:text-colr-ghostverse-teal"
                >
                  Green Token
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
              About Us
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <Link
                  href="/contacts"
                  className="hover:text-colr-ghostverse-teal"
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/about" className="hover:text-colr-ghostverse-teal">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-colr-ghostverse-teal">
                  Team
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}

      <div className="mt-6 sm:text-left md:mb-0 md:min-w-[200px] lg:min-w-[300px] sm:pl-5 md:pl-2">
        <Link
          href="/"
          className="flex justify-center items-center sm:justify-start md:hidden"
        >
          <div className="inline-block min-w-[200px]">
            <Image
              src="/assets/img/logo-ghostverse.png"
              alt="GhostVerse Logo"
              width={200}
              height={40}
              priority
            />
          </div>
        </Link>
      </div>

      <Divider />

      <div className="container mx-auto lg:px-0 flex flex-col sm:flex-row sm:justify-between items-center my-6 lg:-mt-5">
        <span className="text-sm text-center text-gray-300 mb-2 sm:mb-0 text-nowrap">
          {'© '} {new Date().getFullYear()}{' '}
          <Link href="/" className="hover:text-colr-ghostverse-teal">
            GhostVerse
          </Link>
          . All Rights Reserved.
        </span>
        <SocialLinks />
      </div>
    </footer>
  );
};
