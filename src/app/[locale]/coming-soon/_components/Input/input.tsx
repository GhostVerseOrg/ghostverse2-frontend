'use client';
import * as React from 'react';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';

export const EmailInput = ({ ...props }) => {
  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--red-700),
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[10px] rounded-lg"
    >
      <input
        type={'email'}
        className="h-12 w-full border-none text-black rounded-md px-3 py-2 text-base outline-none"
        {...props}
      />
    </motion.div>
  );
};
