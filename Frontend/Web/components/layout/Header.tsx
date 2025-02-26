// frontend/web/components/layout/Header.tsx
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex justify-center px-4">
      <header className="flex justify-between items-center">
        {/* Left section */}
        <div className="w-[373px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6">
          <Link href="/" className="text-xl font text-[#000000]">
            Navigo
          </Link>
        </div>
        
        {/* Middle section */}
        <div className="w-[622px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md mx-2 flex justify-center items-center">
          <nav className="flex space-x-6">
            <Link href="/explore" className="hover:text-[#F3A522] text-sm">Explore Destinations</Link>
            <Link href="/plan" className="hover:text-[#F3A522] text-sm">Plan Your Trip</Link>
            <Link href="/magazine" className="hover:text-[#F3A522] text-sm">Magazine</Link>
            <Link href="/about" className="hover:text-[#F3A522] text-sm">About us</Link>
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