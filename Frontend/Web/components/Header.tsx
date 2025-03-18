// components/Header.tsx
"use client"; 

import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useMobile(768);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Handle scroll behavior
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
        
        // Close mobile menu when scrolling
        if (menuOpen && isMobile) {
          setMenuOpen(false);
        }
      }
      
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, menuOpen, isMobile]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  // Handle plan trip button click
  const handlePlanTripClick = () => {
    if (isAuthenticated) {
      router.push('/planyourtrip');
    } else {
      router.push('/login?redirectTo=/planyourtrip');
    }
    setMenuOpen(false);
  };

  return (
    <div className={`fixed top-4 left-0 right-0 z-50 transition-transform duration-300 px-2 ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <header className="flex justify-between items-center py-3 max-w-7xl mx-auto">
        {/* Left section - Logo (always visible) */}
        <div className="h-8 bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6">
          <Link href="/" className="text-xl font text-[#000000]">
            Navigo
          </Link>
        </div>

        {/* Middle section - Navigation (hidden on mobile) */}
        {!isMobile && (
          <div className="w-[622px] h-8 bg-white/80 backdrop-blur-sm rounded-full shadow-md mx-2 flex justify-center items-center">
            <nav className="flex space-x-6">
              <Link href="/destinations" className="hover:text-[#F3A522] text-sm">Explore Destinations</Link>
              <Link href="/planyourtrip" className="hover:text-[#F3A522] text-sm">Plan Your Trip</Link>
              <Link href="/magazine" className="hover:text-[#F3A522] text-sm">Magazine</Link>
              <Link href="/OurMission" className="hover:text-[#F3A522] text-sm">Our Mission</Link>
            </nav>
          </div>
        )}

        {/* Right section - Authentication / CTA (hidden on mobile) */}
        {!isMobile && (
          <div className="w-[249px] h-8 bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6 justify-between group hover:bg-[#6babea] transition-all duration-300">
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm truncate">{user?.firstName || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm group-hover:text-white transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handlePlanTripClick}
                className="w-full text-center text-sm group-hover:text-white transition-colors duration-300"
              >
                Plan Your Trip
              </button>
            )}
          </div>
        )}

        {/* Hamburger Menu (visible only on mobile) */}
        {isMobile && (
          <div className="relative" ref={menuRef}>
            <button 
              onClick={toggleMenu}
              className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {!menuOpen ? (
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2 px-3 z-50">
                <nav className="flex flex-col space-y-3">
                  <Link 
                    href="/destinations" 
                    className="hover:text-[#F3A522] text-sm py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Explore Destinations
                  </Link>
                  <Link 
                    href="/planyourtrip" 
                    className="hover:text-[#F3A522] text-sm py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Plan Your Trip
                  </Link>
                  <Link 
                    href="/magazine" 
                    className="hover:text-[#F3A522] text-sm py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Magazine
                  </Link>
                  <Link 
                    href="/OurMission" 
                    className="hover:text-[#F3A522] text-sm py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Our Mission
                  </Link>
                  
                  {/* Authentication section */}
                  <div className="border-t border-gray-200 my-1"></div>
                  
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-sm font-medium">
                        Hello, {user?.firstName || 'User'}
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="text-left text-sm py-2 px-3 rounded-md hover:bg-gray-100 text-red-500"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={handlePlanTripClick}
                      className="flex justify-between items-center text-sm py-2 px-3 rounded-md bg-[#6babea] text-white w-full"
                    >
                      <span>Plan Your Trip</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  )}
                </nav>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;