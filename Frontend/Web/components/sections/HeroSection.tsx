// frontend/web/components/sections/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center">
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
      <div className="z-10 text-center text-white">
        <h1 className="text-6xl font-bold mb-2">NAVIGO</h1>
        <p className="text-2xl mb-12">Your Gateway to The Experience</p>
      </div>
      
      {/* Buttons at bottom right */}
      <div className="absolute bottom-16 right-16 z-10 flex space-x-4">
        <Link 
          href="/booking" 
          className="w-[210px] h-[32px] bg-[#F3A522] hover:bg-navy-blue text-white rounded flex items-center justify-center transition-colors"
        >
          Book now
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        <Link 
          href="/explore" 
          className="w-[210px] h-[32px] bg-[#F3A522] hover:bg-navy-blue text-white rounded flex items-center justify-center transition-colors"
        >
          Explore
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;