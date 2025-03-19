
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
          description="Complete your booking immediately with a secure payment"
          icon={<CreditCard className="h-6 w-6" />}
          benefits={[
            "Secure your booking instantly",
            "No need to worry about payment later",
            "Various payment methods available"
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
            "Pay after you enjoy the experience",
            "Flexible payment options"
          ]}
          onClick={() => onSelectOption('pay-later')}
          selected={selectedOption === 'pay-later'}
          price={price}
        />
      </div>
    </div>
  );
};

interface PaymentOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  onClick: () => void;
  selected: boolean;
  price: number;
}

const PaymentOption = ({ title, description, icon, benefits, onClick, selected, price }: PaymentOptionProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
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
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
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