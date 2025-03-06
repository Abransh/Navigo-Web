"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    name: "VARANASI",
    image: "/images/frontend/web/public/images/Varanasi1.jpg",
    href: "/destinations/varanasi",
  },
  {
    name: "GOA",
    image: "/images/frontend/web/public/images/Goa.jpg",
    href: "/destinations/goa",
  },
  {
    name: "NEW DELHI",
    image: "/images/frontend/web/public/images/NewDelhi.jpg",
    href: "/destinations/new-delhi",
  },
  {
    name: "JAIPUR",
    image: "/images/frontend/web/public/images/Jaipur.jpg",
    href: "/destinations/jaipur",
  },
]

export default function DestinationsSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {destinations.map((destination) => (
          <Link
            key={destination.name}
            href={destination.href}
            className="group block h-[600px] overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]"
          >
             <div className="flex h-full flex-col">
                   <h3 className="mb-6 text-center text-2xl font-bold">{destination.name}</h3>
               <div className="relative mb-4 flex-1 overflow-hidden  ">
                  <div className="relative h-full w-full">
                      <Image
                       src={destination.image || "/placeholder.svg"}
                       alt={destination.name}
                      fill
                      className="object-cover "
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
      <div className="mt-2 flex justify-end">
        <Link
          href="/destinations"
          className="inline-flex w-full items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#F3A522] hover:text-navy-blue"
        >
          ALL DESTINATIONS
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

