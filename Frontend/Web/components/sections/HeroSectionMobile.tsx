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
      <div className="relative z-20 flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-white">
          Navigo
        </Link>
        <button className="rounded-full bg-white/20 p-2 backdrop-blur-sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Mobile menu overlay - Fixed z-index issue */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/90 backdrop-blur-sm">
          <div className="relative p-4">
            <div className="flex justify-end">
              <button className="rounded-full bg-white/20 p-2 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-8 p-8 -mt-16">
            <Link
              href="/explore"
              className="text-2xl font-medium text-white hover:text-[#F3A522]"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Destinations
            </Link>
            <Link
              href="/plan"
              className="text-2xl font-medium text-white hover:text-[#F3A522]"
              onClick={() => setIsMenuOpen(false)}
            >
              Plan Your Trip
            </Link>
            <Link
              href="/magazine"
              className="text-2xl font-medium text-white hover:text-[#F3A522]"
              onClick={() => setIsMenuOpen(false)}
            >
              Magazine
            </Link>
            <Link
              href="/about"
              className="text-2xl font-medium text-white hover:text-[#F3A522]"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}

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

