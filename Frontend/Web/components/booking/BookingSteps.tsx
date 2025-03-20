// components/booking/BookingSteps.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface BookingStepsProps {
  currentStep: number;
  totalSteps: number;
}

export const BookingSteps: React.FC<BookingStepsProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const stepLabels = ['Date & Time', 'Meeting Details', 'Payment Options'];
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i}
            className="flex items-center flex-1"
          >
            <div 
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                i + 1 < currentStep 
                  ? 'bg-primary text-white' 
                  : i + 1 === currentStep
                    ? 'bg-primary/20 text-primary border-2 border-primary' 
                    : 'bg-gray-100 text-gray-400'
              } font-medium text-sm`}
            >
              {i + 1 < currentStep ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            {i < totalSteps - 1 && (
              <div 
                className={`flex-1 h-1 ${
                  i + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'
                } mx-2`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-1">
        {stepLabels.map((label, index) => (
          <span 
            key={index}
            className={currentStep >= index + 1 ? 'text-primary font-medium' : ''}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
