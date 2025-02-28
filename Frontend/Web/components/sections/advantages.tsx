// frontend/web/components/sections/AdvantagesSection.tsx
import React from 'react';
import Link from 'next/link';

const AdvantagesSection: React.FC = () => {
  return (
    <section className="py-1 bg-white-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          </div>
          
          {/* View More Button */}
          <Link 
            href="/advantages" 
            className="inline-block px-8 py-3 border border-gray-800 text-gray-800 rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:border-black group"
          >
            <div className="flex items-center gap-2">
              <span>View more</span>
              <svg 
                className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;



