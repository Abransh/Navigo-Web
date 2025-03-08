// // frontend/web/components/layout/Header.tsx
// "use client"; 


// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// const Header: React.FC = () => {
  
//   const [visible, setVisible] = useState(true);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
  


//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;
      
//       // Always show header at the top of the page (hero section)
//       if (currentScrollPos < 200) {
//         setVisible(true);
//       } else {
//         // Otherwise, only show when scrolling up
//         const isScrollingUp = prevScrollPos > currentScrollPos;
//         setVisible(isScrollingUp);
//       }
      
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [prevScrollPos]);

//   return (
//     <div className={`fixed top-4 left-0 right-0 z-50 transition-transform duration-300 px-2 ${
//       visible ? 'translate-y-0' : '-translate-y-full'
//     }`}>
//       <header className="flex justify-between items-center py-3 max-w-7xl mx-auto">
//         {/* Left section */}
//         <div className="w-[373px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6">
//           <Link href="/" className="text-xl font text-[#000000]">
//             Navigo
//           </Link>
//         </div>
//         {/* Middle section */}
//         <div className="w-[622px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md mx-2 flex justify-center items-center">
//           <nav className="flex space-x-6">
//             <Link href="/destinations" className="hover:text-[#F3A522] text-sm">Explore Destinations</Link>
//             <Link href="/planyourtrip" className="hover:text-[#F3A522] text-sm">Plan Your Trip</Link>
//             <Link href="/magazine" className="hover:text-[#F3A522] text-sm">Magazine</Link>
//             <Link href="/OurMission" className="hover:text-[#F3A522] text-sm">Our Mission</Link>
//           </nav>
//         </div>
//         {/* Right section */}
//         <div className="w-[249px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6 justify-between group hover:bg-[#6babea] transition-all duration-300">
//           <Link
//             href="/trip-planner"
//             className="text-sm group-hover:text-white transition-colors duration-300"
//           >
//             Plan Your Trip
//           </Link>
//           <svg
//             className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//           </svg>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;


"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useMobile } from '../hooks/use-mobile';

const Header: React.FC = () => {
  const isMobile = useMobile();
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos < 200) {
        setVisible(true);
      } else {
        const isScrollingUp = prevScrollPos > currentScrollPos;
        setVisible(isScrollingUp);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed top-4 left-0 right-0 z-50 transition-transform duration-300 px-2 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <header className="flex justify-between items-center py-3 max-w-7xl mx-auto">
        {/* Left Section: Logo */}
        <div className="w-[373px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6">
          <Link href="/" className="text-xl font text-[#000000]">
            Navigo
          </Link>
        </div>
        {isMobile ? (
          // Mobile view: show hamburger menu
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link 
                  href="/destinations"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Explore Destinations
                </Link>
                <Link 
                  href="/planyourtrip"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Plan Your Trip
                </Link>
                <Link 
                  href="/magazine"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Magazine
                </Link>
                <Link 
                  href="/OurMission"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Our Mission
                </Link>
                <Link 
                  href="/trip-planner"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Plan Your Trip
                </Link>
              </div>
            )}
          </div>
        ) : (
          // Desktop view: show full navigation
          <>
            <div className="w-[622px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md mx-2 flex justify-center items-center">
              <nav className="flex space-x-6">
                <Link href="/destinations" className="hover:text-[#F3A522] text-sm">
                  Explore Destinations
                </Link>
                <Link href="/planyourtrip" className="hover:text-[#F3A522] text-sm">
                  Plan Your Trip
                </Link>
                <Link href="/magazine" className="hover:text-[#F3A522] text-sm">
                  Magazine
                </Link>
                <Link href="/OurMission" className="hover:text-[#F3A522] text-sm">
                  Our Mission
                </Link>
              </nav>
            </div>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
