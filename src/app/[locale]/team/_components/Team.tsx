'use client'; // There is no context on the server side, thus we need to specify that this file is client-side only
import { TeamMember } from './TeamMember';
import { TeamTitle } from './Title';
import { team } from './config/config';
import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const Team = () => {
  if (!Array.isArray(team)) return null;

  return (
    <>
      <TeamTitle
        title="The team is made up entirely of contributors and investors. Join us and help us create the most terrifying GhostVerse ever."
        className="pb-5 sm:pt-1 lg:pb-10"
      />
      <motion.div
        exit={{ opacity: 0 }}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-10">
          {team.map((teamMember, index) => (
            <TeamMember key={index} {...teamMember} />
          ))}
        </div>
      </motion.div>
    </>
  );
};
