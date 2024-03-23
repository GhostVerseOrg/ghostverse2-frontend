import { twMerge } from 'tailwind-merge';
import { HoverEffect } from './hover-effect';

export const ProjectCards = () => {
  return (
    <section id="projectcards" className="max-w-5xl mx-auto px-8 lg:px-0">
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
    title: 'Decentralized Finance',
    description:
      "At the heart of MvX Me, we're reimagining the essence of finance. Our platform leverages decentralized technology to create a secure, transparent, and equitable financial ecosystem for everyone.",
    link: 'https://mvxme.com/defi',
  },
  {
    title: 'Investor Empowerment',
    description:
      'Empowering investors with cutting-edge tools and insights, MvX Me democratizes access to elite financial strategies, previously reserved for the top echelon of investors.',
    link: 'https://mvxme.com/investor-empowerment',
  },
  {
    title: 'AI-Driven Strategies',
    description:
      'Harness the power of Artificial Intelligence to navigate the complex world of digital finance. Our AI-driven investment strategies offer unparalleled precision and performance.',
    link: 'https://mvxme.com/ai-strategies',
  },
  {
    title: 'Blockchain Innovation',
    description:
      "At MvX Me, innovation is our cornerstone. We're pioneering blockchain solutions that enhance security, efficiency, and trust in digital transactions and investments.",
    link: 'https://mvxme.com/blockchain',
  },
  {
    title: 'Community Governance',
    description:
      'Our decentralized autonomous organization places governance in the hands of our community. Engage in decision-making processes and shape the future of finance with MvX Me.',
    link: 'https://mvxme.com/governance',
  },
  {
    title: 'Future of Wealth',
    description:
      'Join us on a journey to the future of wealth. MvX Me is committed to advancing the digital finance landscape, offering innovative opportunities for growth and prosperity.',
    link: 'https://mvxme.com/future-of-wealth',
  },
];
