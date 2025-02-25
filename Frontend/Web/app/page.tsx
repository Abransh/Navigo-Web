// frontend/web/app/page.tsx
import React from 'react';
import MainLayout from '@/components/layout/Mainlayout';
import HeroSection from '@/components/sections/HeroSection';
import PlaneScrollSection from '@/components/sections/PlaneScrollSection';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <PlaneScrollSection />
    </MainLayout>
  );
}