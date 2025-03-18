// components/PlanTripButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface PlanTripButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function PlanTripButton({ className, children, onClick }: PlanTripButtonProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    if (isAuthenticated) {
      router.push('/planyourtrip');
    } else {
      router.push('/login?redirectTo=/planyourtrip');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children || 'Plan Your Trip'}
    </button>
  );
}