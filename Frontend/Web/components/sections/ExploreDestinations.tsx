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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <div
            key={destination.name}
            className="group flex flex-col overflow-hidden rounded-3xl bg-gray-50 p-4 transition-colors hover:bg-[#F3A522]"
          >
            <h3 className="mb-4 text-center text-xl font-light">{destination.name}</h3>
            <div className="relative mb-4 overflow-hidden rounded-2xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover p-2"
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

