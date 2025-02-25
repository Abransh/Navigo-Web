// frontend/web/components/layout/MainLayout.tsx
import React, { ReactNode } from 'react';
//import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

export default MainLayout;