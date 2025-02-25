// frontend/web/components/sections/FeatureBoxes.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// Define the feature box data structure
interface FeatureBox {
  title: string;
  description: string;
  leftImage: string;
  rightImage: string;
}

const FeatureBoxes: React.FC = () => {
  const featureBoxes: FeatureBox[] = [
    {
      title: 'Enhanced Safety & Specialized safety for Women',
      description: 'Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It\'s overwhelming, time-consuming, and many aren\'t even in English. We simplify it by bringing you local apps in English.',
      leftImage: '/images/frontend/web/public/images/QrBarBoxes.jpg', // Replace with your actual image paths
      rightImage: '/images/feature-image-1-right.jpg'
    },
    {
      title: 'Enhanced Safety & Specialized safety for Women',
      description: 'Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It\'s overwhelming, time-consuming, and many aren\'t even in English. We simplify it by bringing you local apps in English.',
      leftImage: '/images/frontend/web/public/images/QrBarBoxes.jpg',
      rightImage: '/images/feature-image-2-right.jpg'
    },
    {
      title: 'Enhanced Safety & Specialized safety for Women',
      description: 'Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It\'s overwhelming, time-consuming, and many aren\'t even in English. We simplify it by bringing you local apps in English.',
      leftImage: '/images/frontend/web/public/images/QrBarBoxes.jpg',
      rightImage: '/images/feature-image-3-right.jpg'
    },
    {
      title: 'Enhanced Safety & Specialized safety for Women',
      description: 'Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It\'s overwhelming, time-consuming, and many aren\'t even in English. We simplify it by bringing you local apps in English.',
      leftImage: '/images/frontend/web/public/images/QrBarBoxes.jpg',
      rightImage: '/images/feature-image-4-right.jpg'
    }
  ];

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-20');
        } else {
          // Only add the fade out effect if the element has moved above the viewport
          if (entry.boundingClientRect.y < 0) {
            entry.target.classList.add('opacity-0');
            entry.target.classList.remove('opacity-100');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="relative">
      {featureBoxes.map((feature, index) => (
        <section 
          key={index}
          ref={el => { sectionRefs.current[index] = el as HTMLDivElement }}
          className="py-8 opacity-0 translate-y-20 transition-all duration-700 sticky"
          style={{ top: '14vh' }}
        >
          <div className="max-w-6xl mx-auto flex">
            {/* Text container */}
            <div className="w-[760px] h-[300px] rounded-2xl bg-[#ECEBE9] p-6 flex flex-col justify-center">
              <h3 className="text-[36px] font-bold mb-4">
                {feature.title}
              </h3>
              <p className="text-base text-[24px]">
                {feature.description}
              </p>
            </div>
            
            {/* Middle image container */}
            <div className="w-[101px] h-[300px] rounded-2xl mx-1 overflow-hidden">
              <div className="w-full h-full relative">
                <Image 
                  src={feature.leftImage}
                  alt={`Feature ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right image container */}
            <div className="w-[522px] h-[300px] rounded-2xl overflow-hidden">
              <div className="w-full h-full relative">
                <Image 
                  src={feature.rightImage}
                  alt={`Feature ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default FeatureBoxes;