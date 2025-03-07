"use client";

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const howItWorks = [
    {
      title: "Dscover your adventure",
      content:
        "This is the space to describe the service and explain how customers or clients can benefit from it. It's an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service.",
    },
    {
      title: "Plan your itinerary",
      content:
        "Create a personalized itinerary that matches your interests and travel style. Our local experts will help you plan the perfect route.",
    },
    {
      title: "Book your accommodation",
      content:
        "Find and book verified accommodations that suit your preferences and budget. We ensure you get the best deals.",
    },
    {
      title: "Dive into local experiences",
      content: "Discover authentic local experiences and activities that make your trip unique and memorable.",
    },
  ]

  const popularDestinations = [
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
  ]

  export default function PlanYourTripPage() {
    const [openSection, setOpenSection] = useState<number | null>(0)
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-24">
          {/* How It Works Section - Redesigned */}
          <section className="mb-24">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left side - Image */}
              <div className="relative h-[600px] overflow-hidden rounded-3xl">
                <Image src="/placeholder.svg" alt="How Navigo Works" fill className="object-cover" />
              </div>
  
              {/* Right side - Content */}
              <div className="flex flex-col">
                {/* Heading */}
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
                  <h2 className="text-center text-3xl font-bold  text-navy-blue">HOW IT WORKS</h2>
                </div>

                {/* Accordion */}
              <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  {howItWorks.map((item, index) => (
                    <div key={index}>
                      <button
                        onClick={() => setOpenSection(openSection === index ? null : index)}
                        className="flex w-full items-center justify-between py-3 text-left"
                      >
                        <span className="text-xl font-medium">{item.title}</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            openSection === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openSection === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="py-3 text-gray-700">{item.content}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Dashed line separator (except for last item) */}
                      {index < howItWorks.length - 1 && <div className="border-t border-dashed border-gray-300" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="mb-12">
          <h2 className="mb-12 text-3xl font-bold">Popular Destinations</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {popularDestinations.map((destination) => (
              <Link
                key={destination.name}
                href={destination.href}
                className="group block h-[500px] overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]"
              >
                <div className="flex h-full flex-col">
                  <h3 className="mb-6 text-center text-2xl font-bold">{destination.name}</h3>
                  <div className="relative mb-4 flex-1 overflow-hidden rounded-2xl">
                    <div className="relative h-full w-full">
                      <Image
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        fill
                        className="object-cover p-3"
                      />

                        </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between px-2 text-sm font-medium transition-colors group-hover:text-navy-blue">
                    EXPLORE
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* You're Probably Wondering Section */}
        <section className="rounded-3xl bg-[#F3A522] p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-center">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <span className="text-xl font-bold">i</span>
                  </div>
                  <h2 className="text-3xl font-bold">You&apos;re Probably Wondering</h2>
                </div>
                <p className="text-lg">
                  Have questions about planning your trip to India? We&apos;re here to help! Our team of local experts can
                  assist you with everything from itinerary planning to booking accommodations and experiences.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image src="/placeholder.svg" alt="Wondering about India travel" fill className="object-cover" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}





