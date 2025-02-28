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
            className="group relative overflow-hidden rounded-3xl bg-gray-50 transition-colors hover:bg-[#F3A522]"
          >
            <div className="aspect-[3/4] w-full">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="h-full w-full object-cover"
                width={400}
                height={600}
              />
            </div>
            <div className="p-6">
              <h3 className="mb-4 text-xl font-bold">{destination.name}</h3>
              <Link
                href={destination.href}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-navy-blue"
              >
                EXPLORE
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-blue"
        >
          ALL DESTINATIONS
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

