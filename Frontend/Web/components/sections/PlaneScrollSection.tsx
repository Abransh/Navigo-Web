"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function PlaneAnimation() {
  const planeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePlanePosition = () => {
      if (!planeRef.current) return

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        150
      const translateX = (scrollPercent * window.innerWidth) / 100

      planeRef.current.style.transform = `translateX(${translateX}px)`
    }

    window.addEventListener("scroll", updatePlanePosition)
    return () =>
      window.removeEventListener("scroll", updatePlanePosition)
  }, [])

  return (
    <div className="relative h-[42px] w-full overflow-hidden">
      {/* Dashed line */}
      <div
        className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2"
        style={{
          background:
            "repeating-linear-gradient(to right, #333 0, #333 15px, transparent 15px, transparent 25px)",
        }}
      />
      {/* Plane container */}
      <div
        ref={planeRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-75"
      >
        <Image
          src="/images/frontend/web/public/images/plane.jpg"
          alt="Plane"
          width={24}
          height={24}
          className="-translate-y-[11px]" // Adjust this value to fine-tune vertical position
        />
      </div>
    </div>
  )
}
