// frontend/web/app/page.tsx
import React from 'react';
import MainLayout from '../components/layout/Mainlayout';
import HeroSection from '../components/sections/HeroSection';
import PlaneScrollSection from '../components/sections/PlaneScrollSection';
import HelpSection from '../components/sections/section4';
import FeatureBoxes from '../components/sections/FeatureBoxes';
import AdvantagesSection from '@/components/sections/advantages';
import DestinationsSection from '@/components/sections/ExploreDestinations';
import ExpDest from '@/components/sections/ExpDest';
import Testimonials from '@/components/sections/testimonials';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <PlaneScrollSection />
      <HelpSection />
      <FeatureBoxes />
      <AdvantagesSection />
      <ExpDest />
      <DestinationsSection />
      <Testimonials />
    </MainLayout>
  );
}

