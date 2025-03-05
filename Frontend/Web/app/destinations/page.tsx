import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const allDestinations = [

    {
        name: "VARANASI",
        image: "/placeholder.svg",
        href: "/destinations/varanasi",
      },
      {
        name: "GOA",
        image: "/placeholder.svg",
        href: "/destinations/goa",
      },
      {
        name: "NEW DELHI",
        image: "/placeholder.svg",
        href: "/destinations/new-delhi",
      },
      {
        name: "JAIPUR",
        image: "/placeholder.svg",
        href: "/destinations/jaipur",
      },
      {
        name: "MUMBAI",
        image: "/placeholder.svg",
        href: "/destinations/mumbai",
      },
      {
        name: "AGRA",
        image: "/placeholder.svg",
        href: "/destinations/agra",
      },
      {
        name: "UDAIPUR",
        image: "/placeholder.svg",
        href: "/destinations/udaipur",
      },
    ]

    export default function DestinationsPage () {

        return (
                <div className="min-h-screen bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 py-24">
                         <h1 className="mb-16 text-center text-5xl font-bold">Explore Indian Destinations</h1>
                          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                          {allDestinations.map((destination) => (
                              <div
                                 key= {destination.name}
                                 className= "group flex h-[500px] flex-col overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]" 
                                 >
                                   <h3 className="mb-6 text-center text-2xl font-bold">{destination.name}</h3>
                                    <div className="relative mb-4 flex-1 overflow-hidden rounded-2xl">
                                        <div className="relative h-full w-full">
                                           <Image
                                                 src={destination.image || "/placeholder.svg"}
                                                 alt={destination.name}
                                                 fill
                                                 className="object-cover p-3"
                                                 style={{ aspectRatio: "3/4" }}
                                            />    
                                        </div> 
                                    </div>
                                    <Link
                                       href={destination.href}
                                        className="mt-auto inline-flex items-center justify-between px-2 text-sm font-medium transition-colors group-hover:text-navy-blue"
                                        >
                                         EXPLORE
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div> 
                                ))}   
                            </div>
                      </div> 
                </div>
                                
                                
                        )
                        }