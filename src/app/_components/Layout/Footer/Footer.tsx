import Link from 'next/link';
import { SocialLinks } from '@/app/_components/Layout/Footer/SocialLinks';
import Image from 'next/image';
import { Divider } from './Divider';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black to-slate-900 p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="my-5 pb-4 md:flex md:justify-start ">
          {/* Footer Logo */}
          <div className="mb-6 md:mb-0 md:min-w-[200px] lg:min-w-[300px]">
            <Link href="/" className="hidden md:flex items-center">
              {/* Wrapper div for applying custom styles */}
              <span className="font-russo-one-regular text-2xl font-extrabold whitespace-nowrap text-gray-200 px-1">
                MV
              </span>
              <div className="inline-block min-w-[50px]">
                <Image
                  src="/assets/img/mvx.svg"
                  alt="MvX Me Logo"
                  width={40}
                  height={40}
                  priority
                />
              </div>
              <span className="font-russo-one-regular text-2xl font-extrabold whitespace-nowrap text-gray-200 -ml-2">
                ME
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 lg:gap-10">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="/privacy-policy"
                    className="hover:text-colr-mvx-teal"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-colr-mvx-teal"
                  >
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://multiversx.com/"
                    className="hover:underline hover:text-colr-mvx-teal"
                  >
                    MultiversX
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://twitter.com/mvXunity"
                    className="hover:text-colr-mvx-teal"
                  >
                    Twitter
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://dsc.gg/mvx"
                    className="hover:text-colr-mvx-teal"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/mvxme"
                    className="hover:text-colr-mvx-teal"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase dark:text-white">
                About Us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/contacts" className="hover:text-colr-mvx-teal">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-colr-mvx-teal">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <Divider />
        <div className="mt-6 sm:text-left md:mb-0 md:min-w-[200px] lg:min-w-[300px]">
          <Link
            href="/"
            className="flex justify-center items-center sm:justify-start md:hidden"
          >
            <span className="self-center font-russo-one-regular text-2xl font-extrabold whitespace-nowrap text-gray-200 px-1">
              MV
            </span>
            <div className="inline-block min-w-[50px]">
              <Image
                src="/assets/img/mvx.svg"
                alt="MvX Me Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <span className="self-center font-russo-one-regular text-2xl font-extrabold whitespace-nowrap text-gray-200 -m-2">
              ME
            </span>
          </Link>
        </div>
        <div className="flex flex-col items-center my-6 sm:flex-row sm:justify-between pb-5">
          <span className="text-sm text-center text-gray-300 mb-2 sm:mb-0">
            © {new Date().getFullYear()}{' '}
            <Link href="/" className="hover:text-colr-mvx-teal">
              MvX Me
            </Link>
            . All Rights Reserved.
          </span>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};
