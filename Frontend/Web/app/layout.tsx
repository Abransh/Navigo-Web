// frontend/web/app/layout.tsx
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Choose required weights
  variable: '--font-poppins', // Define a CSS variable
});

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
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <Header />
        {children} 
        
        <Footer />
      </body>
    </html>
  );
}