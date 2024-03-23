import { Inter, Lato, Open_Sans } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '700', '900'],
  variable: '--font-lato',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});
