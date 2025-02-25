// frontend/web/components/layout/MainLayout.tsx
import React, { ReactNode } from 'react';
import Header from '@/components/layout/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;