// frontend/web/components/sections/AdvantagesSection.tsx
import React from 'react';
import Link from 'next/link';

const AdvantagesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Advantages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Advantage 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Personalized Experience</h3>
              <p className="text-gray-600">Tailored travel plans that match your preferences and budget.</p>
            </div>
            
            {/* Advantage 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">Our team is always available to assist you during your journey.</p>
            </div>
            
            {/* Advantage 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Best Price Guarantee</h3>
              <p className="text-gray-600">We offer competitive prices for all destinations and experiences.</p>
            </div>
          </div>
          
          {/* View More Button */}
          <Link 
            href="/advantages" 
            className="inline-block px-8 py-3 border border-gray-800 text-gray-800 rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:border-black group"
          >
            <div className="flex items-center gap-2">
              <span>View more</span>
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
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;