// components/payment/PaymentOptionSelector.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Lock icon as an inline SVG component
const LockIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

interface PaymentOptionSelectorProps {
  price: number;
  onSelectOption: (option: 'pay-now' | 'pay-later') => void;
  selectedOption: 'pay-now' | 'pay-later' | null;
}

const PaymentOptionSelector = ({ price, onSelectOption, selectedOption }: PaymentOptionSelectorProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Choose your payment option</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pay Now Option */}
        <PaymentOption 
          title="Pay Now"
          description="Complete your booking immediately with a secure online payment"
          icon={<CreditCard className="h-6 w-6" />}
          benefits={[
            "Instant booking confirmation",
            "Multiple payment methods available",
            "Secure online transaction",
            "Apple Pay & Google Pay supported"
          ]}
          warnings={[
            "Full payment required upfront",
            "Non-refundable transaction fees may apply"
          ]}
          onClick={() => onSelectOption('pay-now')}
          selected={selectedOption === 'pay-now'}
          price={price}
        />

        {/* Pay Later Option */}
        <PaymentOption 
          title="Pay After Tour"
          description="Book now and complete payment after your experience"
          icon={<Calendar className="h-6 w-6" />}
          benefits={[
            "No upfront payment required",
            "Pay directly to your companion",
            "Flexible payment options",
            "Pay in cash or digital wallet"
          ]}
          warnings={[
            "Booking not guaranteed until payment",
            "May require a small deposit"
          ]}
          onClick={() => onSelectOption('pay-later')}
          selected={selectedOption === 'pay-later'}
          price={price}
        />
      </div>
      
      {/* Security Information */}
      <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
        <LockIcon className="h-4 w-4 mr-2" />
        Your payment information is secure and encrypted
      </div>
    </div>
  );
};

interface PaymentOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  warnings: string[];
  onClick: () => void;
  selected: boolean;
  price: number;
}

const PaymentOption = ({ 
  title, 
  description, 
  icon, 
  benefits, 
  warnings,
  onClick, 
  selected, 
  price 
}: PaymentOptionProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 group ${
        selected 
          ? 'border-2 border-[#F3A522] ring-2 ring-[#F3A522]/20' 
          : 'hover:border-gray-300'
      }`} 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${selected ? 'bg-[#F3A522]/10 text-[#F3A522]' : 'bg-gray-100 text-gray-500'}`}>
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle className="h-6 w-6 text-[#F3A522] fill-[#F3A522]/20" />
            </motion.div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Benefits</h4>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 text-red-600">Things to Note</h4>
            <ul className="space-y-2">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 mr-2 mt-0.5 text-red-500 flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span className="text-sm">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-2xl font-bold">₹{price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">Total price</p>
        </div>
        <Button 
          variant={selected ? "default" : "outline"} 
          className={selected ? "bg-[#F3A522] hover:bg-[#F3A522]/90" : ""}
        >
          Select <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentOptionSelector;