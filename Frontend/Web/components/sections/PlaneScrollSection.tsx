"use client"

import { useEffect, useRef } from "react"

export default function PlaneAnimation() {
  const planeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePlanePosition = () => {
      if (!planeRef.current) return

      // Increased scroll speed by multiplying scrollPercent
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 250
      const translateX = (scrollPercent * window.innerWidth) / 100

      planeRef.current.style.transform = `translateX(${translateX}px)`
    }

    window.addEventListener("scroll", updatePlanePosition)
    return () => window.removeEventListener("scroll", updatePlanePosition)
  }, [])

  return (
    <div className="relative h-[42px] w-full overflow-hidden">
      {/* Dashed line with custom styling */}
      <div
        className="absolute left-0 top-1/2 h-[2px] w-full"
        style={{
          background: "repeating-linear-gradient(to right, #333 0, #333 15px, transparent 15px, transparent 25px)",
        }}
      />
      <div ref={planeRef} className="absolute left-0 top-1/2 -translate-y-[60%] transition-transform duration-75">
        {/* Plane SVG positioned above the line */}
        <img src="/images/frontend/web/public/images/plane.jpg" alt="Plane" className="w-6 h-6" />
      </div>
    </div>
  )
}

