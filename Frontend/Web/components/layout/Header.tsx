// frontend/web/components/layout/Header.tsx
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 mt-8 rounded-full mx-4 bg-white shadow-md">
      <div className="w-1/4 rounded-l-full">
        <Link href="/" className="text-2xl font-bold text-[#F3A522]">
          Navigo
        </Link>
      </div>
      
      <nav className="w-2/4 flex justify-center space-x-6">
        <Link href="/explore" className="hover:text-[#F3A522]">Explore Destinations</Link>
        <Link href="/plan" className="hover:text-[#F3A522]">Plan Your Trip</Link>
        <Link href="/magazine" className="hover:text-[#F3A522]">Magazine</Link>
        <Link href="/about" className="hover:text-[#F3A522]">About us</Link>
      </nav>
      
      <div className="w-1/4 text-right rounded-r-full">
        <Link href="/trip-planner" className="hover:text-[#F3A522]">
          Plan Your Trip
        </Link>
      </div>
    </header>
  );
};

export default Header;