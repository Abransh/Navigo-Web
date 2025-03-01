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
      



return(
  <div>

  </div>
)

export default Header;