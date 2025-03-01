// frontend/web/components/layout/Header.tsx
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      
      // Calculate scroll speed (pixels per millisecond)
      const speed = Math.abs(currentScrollPos - prevScrollPos) / (timeDiff || 1);
      setScrollSpeed(speed);
      
      // Update time of last scroll
      setLastScrollTime(currentTime);
      
      // Show header when scrolling up or when scroll speed is below threshold
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isFastScroll = speed > 0.5; // Adjust this threshold as needed
      
      setVisible(isScrollingUp || !isFastScroll);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, lastScrollTime]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 px-4 ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <header className="flex justify-between items-center py-3 max-w-7xl mx-auto">
        {/* Left section */}
        <div className="w-[373px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6">
          <Link href="/" className="text-xl font text-[#000000]">
            Navigo
          </Link>
        </div>
        
export default Header;