// import Image from "next/image"
// import Link from "next/link"


// const allDestinations = [

//     {
//         name: "VARANASI",
//         image: "/images/Varanasi1.jpg",
//         href: "/destinations/varanasi",
//       },
//       {
//         name: "GOA",
//         image: "/images/Goa.jpg",
//         href: "/destinations/goa",
//       },
//       {
//         name: "NEW DELHI",
//         image: "/images/NewDelhi.jpg",
//         href: "/destinations/new-delhi",
//       },
//       {
//         name: "JAIPUR",
//         image: "/images/Jaipur.jpg",
//         href: "/destinations/jaipur",
//       },
//       {
//         name: "KASHMIR",
//         image: "/images/Kashmir.jpg",
//         href: "/destinations/mumbai",
//       },
//       {
//         name: "AGRA",
//         image: "/placeholder.svg",
//         href: "/destinations/agra",
//       },
//       {
//         name: "UDAIPUR",
//         image: "/images/Udaipur.jpeg",
//         href: "/destinations/udaipur",
//       },
//     ]

//     export default function DestinationsPage () {

//         return (
//                 <div className="min-h-screen bg-gray-50">
//                     <div className="mx-auto max-w-8xl px-4 py-24">
//                          <h1 className="mb-16 text-center text-5xl font-bold">Explore Indian Destinations</h1>
//                           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
//                           {allDestinations.map((destination) => (
//                               <Link
//                               key={destination.name}
//                               href={destination.href}
//                               className="group block h-[600px] overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]"
//                             >
//                               <div className="flex h-full flex-col">
//                                    <h3 className="mb-6 text-center text-2xl font-bold">{destination.name}</h3>
                                   
//                                     <div className="relative mb-4 flex-1 overflow-hidden  ">
                                      
//                                         <div className="relative h-full w-full">
//                                            <Image
//                                                  src={destination.image || "/placeholder.svg"}
//                                                  alt={destination.name}
//                                                  fill
//                                                  className="object-cover "
//                                                  style={{ aspectRatio: "3/4" }}
                                                 
//                                             />  
                                              
//                                         </div> 
                                       
//                                     </div>
//                                     <div
//                                        className="mt-auto inline-flex items-center justify-between px-2 text-sm font-medium transition-colors group-hover:text-navy-blue"
//                                         >
//                                          <span>Explore</span>
//                                              <svg 
//                                               className="w-5 h-5 transform group-hover:-rotate-45 transition-transform duration-300" 
//                                                fill="none" 
//                                               stroke="currentColor" 
//                                                viewBox="0 0 24 24" 
//                                                xmlns="http://www.w3.org/2000/svg"
//                                                 >
//                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                                 </svg>
//                                       </div>
//                                </div>      
//                            </Link>
                                
//                                 ))}   
//                           </div>
//                     </div> 
//                  </div>
//                )
//            }


// app/destinations/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import destinationService, { Destination } from "@/services/destination-service";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getDestinations();
        setDestinations(data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        setError("Failed to load destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl">Loading destinations...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#F3A522] text-white rounded hover:bg-[#003366]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Fallback to static data if no destinations are returned
  const displayDestinations = destinations.length > 0 
    ? destinations 
    : [
        {
          id: "1",
          name: "VARANASI",
          image: "/images/Varanasi1.jpg",
          slug: "varanasi",
        },

        {
          id: "2",
          name: "GOA",
          image: "/images/Goa.jpg",
          slug: "goa",
        },

        {
          id: "3",
          name: "NEW DELHI",
          image: "/images/Varanasi1.jpg",
          slug: "varanasi",
        },

        {
          id: "4",
          name: "AGRA",
          image: "/images/Varanasi1.jpg",
          slug: "agra",
        },

        {
          id: "5",
          name: "KASHMIR",
          image: "/images/Kashmir.jpg",
          slug: "kashmir",
        },

        {
          id: "6",
          name: "UDAIPUR",
          image: "/images/Udaipur.jpeg",
          slug: "udaipur",
        },
        // Add your other fallback destinations here
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-8xl px-4 py-24">
        <h1 className="mb-16 text-center text-5xl font-bold">Explore Indian Destinations</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {displayDestinations.map((destination) => (
            <Link
              key={destination.id || destination.name}
              href={`/destinations/${destination.slug}`}
              className="group block h-[600px] overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]"
            >
              <div className="flex h-full flex-col">
                <h3 className="mb-6 text-center text-2xl font-bold">{destination.name}</h3>
                
                <div className="relative mb-4 flex-1 overflow-hidden">
                  <div className="relative h-full w-full">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      style={{ aspectRatio: "3/4" }}
                    />
                  </div>
                </div>
                <div
                  className="mt-auto inline-flex items-center justify-between px-2 text-sm font-medium transition-colors group-hover:text-navy-blue"
                >
                  <span>Explore</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:-rotate-45 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}