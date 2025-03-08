"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import FeatureBoxesMobile from "@/components/sections/FeatureBoxMobile"
import { useMobile } from "@/hooks/use-mobile"

// Define the feature box data structure
interface FeatureBox {
  title: string
  description: string
  leftImage: string
  rightImage: string
}

const FeatureBoxes: React.FC = () => {
  const isMobile = useMobile()
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0")
          entry.target.classList.remove("opacity-0", "translate-y-20")
        } else {
          // Only add the fade out effect if the element has moved above the viewport
          if (entry.boundingClientRect.y < 0) {
            entry.target.classList.add("opacity-0")
            entry.target.classList.remove("opacity-100")
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  // If mobile, render the mobile version
  if (isMobile) {
    return <FeatureBoxesMobile />
  }

  // Desktop version
  const featureBoxes: FeatureBox[] = [
    {
      title: "Enhanced Safety & Specialized safety for Women",
      description:
        "Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It's overwhelming, time-consuming, and many aren't even in English. We simplify it by bringing you local apps in English.",
      leftImage: "/images/QrBarBoxes.jpg", // Replace with your actual image paths
      rightImage: "/images/featuresbox1.jpg",
    },
    {
      title: "Protection from Tourist Inflation",
      description:
        "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
      leftImage: "/images/QrBarBoxes.jpg",
      rightImage: "/images/featuresbox2.jpg",
    },
    {
      title: "Seamless Communication",
      description:
        "With our Companions you would be easily able to communicate with the other people. Our Companions speak English.",
      leftImage: "/images/QrBarBoxes.jpg",
      rightImage: "/images/Featuresbox3.jpg",
    },
    {
      title: "TRAVEL APPS!!",
      description:
        "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
      leftImage: "/images/QrBarBoxes.jpg",
      rightImage: "/images/feature-image-4-right.jpg",
    },
  ]

  return (
    <div className="relative">
      {featureBoxes.map((feature, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el as HTMLDivElement
          }}
          className="py-8 opacity-0 translate-y-20 transition-all duration-700 sticky"
          style={{ top: "14vh" }}
        >
          <div className="max-w-7xl mx-auto flex">
            {/* Text container */}
            <div className="w-[700px] h-[330px] rounded-2xl bg-[#ECEBE9] p-6 flex flex-col justify-center">
              <h3 className="text-[36px] font mb-6 font-Poppins-400 ">{feature.title}</h3>
              <p className="text-base text-[25px] leading-[32px] font-Poppins protext-[#192328]">
                {feature.description}
              </p>
            </div>

            {/* Middle image container */}
            <div className="w-[100px] h-[330px] rounded-2xl mx-1 overflow-hidden">
              <div className="w-full h-full relative">
                <Image
                  src={feature.leftImage || "/placeholder.svg"}
                  alt={`Feature ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right image container */}
            <div className="w-[580px] h-[330px] rounded-2xl overflow-hidden">
              <div className="w-full h-full relative">
                <Image
                  src={feature.rightImage || "/placeholder.svg"}
                  alt={`Feature ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default FeatureBoxes

