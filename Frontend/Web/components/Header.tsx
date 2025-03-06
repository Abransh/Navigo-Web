// frontend/web/components/layout/Header.tsx
"use client"; 

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Always show header at the top of the page (hero section)
      if (currentScrollPos < 200) {
        setVisible(true);
      } else {
        // Otherwise, only show when scrolling up
        const isScrollingUp = prevScrollPos > currentScrollPos;
        setVisible(isScrollingUp);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className={`fixed top-4 left-0 right-0 z-50 transition-transform duration-300 px-2 ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <header className="flex justify-between items-center py-3 max-w-7xl mx-auto">
        {/* Left section */}
        <div className="w-[373px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6">
          <Link href="/" className="text-xl font text-[#000000]">
            Navigo
          </Link>
        </div>
        {/* Middle section */}
        <div className="w-[622px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md mx-2 flex justify-center items-center">
          <nav className="flex space-x-6">
            <Link href="/destinations" className="hover:text-[#F3A522] text-sm">Explore Destinations</Link>
            <Link href="/planyourtrip" className="hover:text-[#F3A522] text-sm">Plan Your Trip</Link>
            <Link href="/magazine" className="hover:text-[#F3A522] text-sm">Magazine</Link>
            <Link href="/about" className="hover:text-[#F3A522] text-sm">Our Mission</Link>
          </nav>
        </div>
        {/* Right section */}
        <div className="w-[249px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6 justify-between group hover:bg-[#6babea] transition-all duration-300">
          <Link
            href="/trip-planner"
            className="text-sm group-hover:text-white transition-colors duration-300"
          >
            Plan Your Trip
          </Link>
          <svg
            className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </header>
    </div>
  );
};

export default Header;