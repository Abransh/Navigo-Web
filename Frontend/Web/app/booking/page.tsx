// app/booking/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingIndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to homepage if someone tries to access /booking without an ID
    router.push("/");
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg">Redirecting...</p>
      </div>
    </div>
  );
}