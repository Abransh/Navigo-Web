// frontend/web/app/layout.tsx
import '../styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Navigo - Your Gateway to The Experience',
  description: 'Plan and book your perfect trip with Navigo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}