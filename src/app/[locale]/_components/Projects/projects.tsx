import { twMerge } from 'tailwind-merge';
import { HoverEffect } from './hover-effect';

export const ProjectCards = () => {
  return (
    <section id="projectcards" className="max-w-5xl mx-auto px-4 lg:px-0">
      <div
        className={twMerge(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10',
        )}
      >
        {projects.map((item, idx) => (
          <HoverEffect item={item} idx={idx} key={item.title} />
        ))}
      </div>
    </section>
  );
};
export const projects = [
  {
    title: 'Marketplace',
    description:
      "At the heart of GhostVerse, we're reimagining the essence of finance. Our platform leverages decentralized technology to create a secure, transparent, and equitable financial ecosystem for everyone.",
    link: '/',
  },
  {
    title: 'Passive Income',
    description:
      'Empowering investors with cutting-edge tools and insights, GhostVerse democratizes access to financial strategies, previously reserved for the top echelon of investors.',
    link: '/',
  },
  {
    title: 'Payment 420 token',
    description:
      'Harness the power of Artificial Intelligence to navigate the complex world of digital finance. Our AI-driven investment strategies offer unparalleled precision and performance.',
    link: '/',
  },
];
