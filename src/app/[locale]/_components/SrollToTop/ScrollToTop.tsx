'use client';

import * as React from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollUp = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const sections = document.querySelectorAll('section');
    const options = {
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the hero section is in view, hide the scroll to top button
          // When the page loads and screen is too big so we have more than one section in view
          // we need to make sure the Hero section isn't visible in the view.
          if (entries.find((entry) => entry.target.id == 'hero')) {
            setShow(false);
          } else {
            setShow(true);
          }
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    const targetSection = document.getElementById('header');
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    // Avoid cases when button is still visible after scrolling to top on large screens.
    // NB! If user has stopped scrolling manually then button won't appear back automatically.
    setShow(false);
  };

  return (
    show && (
      <div
        className="
            group flex items-center justify-center fixed border-none rounded-full z-30
            bottom-6 right-5 w-10 h-10 cursor-pointer bg-slate-400 bg-opacity-40 
            hover:bg-slate-500 
            md:bottom-10 md:right-10
            "
        onClick={handleClick}
      >
        <ChevronUp className="group-hover:-translate-y-1 transition duration-300 text-slate-300" />
      </div>
    )
  );
};
