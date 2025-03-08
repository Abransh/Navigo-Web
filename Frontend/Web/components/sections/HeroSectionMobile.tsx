"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"

export default function HeroSectionMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section className="relative min-h-[80vh] w-full">
      {/* Background image container */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/HeroSectionImage.jpg')", // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Mobile header with hamburger */}
     

      

      {/* Content overlay - Fixed button size and position */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="mt-16">
          <h1 className="text-5xl font-bold text-white">NAVIGO</h1>
          <p className="mt-2 text-xl text-white">Your Gateway to The Experience</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 self-end">
          <button className="flex h-10 w-[210px] items-center justify-between rounded-2xl bg-[#F3A522] px-6 text-white transition-colors hover:bg-navy-blue">
            <span>Book Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="flex h-10 w-[210px] items-center justify-between rounded-2xl bg-[#F3A522] px-6 text-white transition-colors hover:bg-navy-blue">
            <span>Explore</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

