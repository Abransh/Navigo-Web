"use client"

import { useEffect, useRef } from "react"

export default function PlaneAnimation() {
  const planeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePlanePosition = () => {
      if (!planeRef.current) return

      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      const translateX = (scrollPercent * window.innerWidth) / 100

      planeRef.current.style.transform = `translateX(${translateX}px)`
    }

    window.addEventListener("scroll", updatePlanePosition)
    return () => window.removeEventListener("scroll", updatePlanePosition)
  }, [])

  return (
    <div className="relative h-[42px] w-full overflow-hidden">
      <div className="absolute left-0 top-1/2 h-[1px] w-full bg-gray-300" />
      <div ref={planeRef} className="absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-100">
        {/* Replace with your plane SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 12L3 20L5 12L3 4L22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

