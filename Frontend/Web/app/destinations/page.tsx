import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const allDestinations = [

    {
        name: "VARANASI",
        image: "/images/Varanasi1.jpg",
        href: "/destinations/varanasi",
      },
      {
        name: "GOA",
        image: "/images/Goa.jpg",
        href: "/destinations/goa",
      },
      {
        name: "NEW DELHI",
        image: "/images/NewDelhi.jpg",
        href: "/destinations/new-delhi",
      },
      {
        name: "JAIPUR",
        image: "/images/Jaipur.jpg",
        href: "/destinations/jaipur",
      },
      {
        name: "KASHMIR",
        image: "/images/Kashmir.jpg",
        href: "/destinations/mumbai",
      },
      {
        name: "AGRA",
        image: "/placeholder.svg",
        href: "/destinations/agra",
      },
      {
        name: "UDAIPUR",
        image: "/images/Udaipur.jpeg",
        href: "/destinations/udaipur",
      },
    ]

    export default function DestinationsPage () {

        return (
                <div className="min-h-screen bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 py-24">
                         <h1 className="mb-16 text-center text-5xl font-bold">Explore Indian Destinations</h1>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                          {allDestinations.map((destination) => (
                              <div
                                 key= {destination.name}
                                 className= "group flex h-[500px] flex-col overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]" 
                                 >
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
                                    <Link
                                       href={destination.href}
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
                                      </Link>
                                </div> 
                                ))}   
                            </div>
                      </div> 
                </div>
                                
                                
                        )
                        }