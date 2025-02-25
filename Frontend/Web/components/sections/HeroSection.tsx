// frontend/web/components/sections/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center">
      {/* Background image container */}
      <div className="absolute inset-0 z-0">
        {/* Replace with your actual image path */}
        <Image 
          src="/images/hero-background.jpg" 
          alt="Navigo background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content overlay */}
      <div className="z-10 text-white ml-16">
        <h1 className="text-6xl font-bold mb-2">NAVIGO</h1>
        <p className="text-2xl mb-12">Your Gateway to The Experience</p>
        
        {/* Buttons stacked vertically */}
        <div className="flex flex-col space-y-4">
          <Link 
            href="/booking" 
            className="w-[210px] h-[32px] bg-[#F3A522] hover:bg-[#003366] text-white rounded-2xl flex items-center justify-between px-4 transition-colors"
          >
            <span>Book now</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link 
            href="/explore" 
            className="w-[210px] h-[32px] bg-[#F3A522] hover:bg-[#003366] text-white rounded-2xl flex items-center justify-between px-4 transition-colors"
          >
            <span>Explore</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;