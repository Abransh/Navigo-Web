"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useRef } from "react"

// Define the feature box data structure
interface FeatureBox {
  title: string
  description: string
  leftImage: string
  rightImage: string
}

const FeatureBoxesMobile: React.FC = () => {

  const featureBoxes: FeatureBox[] = [
    {
      title: "Enhanced Safety & Specialized safety for Women",
      description:
        "Exploring new places should be exciting, not stressful. For female travelers facing unique safety challenges—like unwanted attention or navigating unfamiliar areas—we put safety first.",
      leftImage: "/images/QrBarBoxesHorizontal.png", // Replace with your actual image paths
      rightImage: "/images/featuresbox1.jpg",
    },
    {
      title: "Protection from Tourist Inflation",
      description:
        "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
      leftImage: "/images/QrBarBoxesHorizontal.png",
      rightImage: "/images/featuresbox2.jpg",
    },
    {
      title: "Seamless Communication",
      description:
        "With our Companions you would be easily able to communicate with the other people. Our Companions speak English.",
      leftImage: "/images/QrBarBoxesHorizontal.png",
      rightImage: "/images/featuresbox3.jpg",
    },
    {
      title: "TRAVEL APPS!!",
      description:
        "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
      leftImage: "/images/QrBarBoxesHorizontal.png",
      rightImage: "/images/feature-image-4-right.jpg",
    },
  ]

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

  return (
    <div className="relative space-y-16 py-8">
      {featureBoxes.map((feature, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el as HTMLDivElement
          }}
          className="py-4 opacity-0 translate-y-20 transition-all duration-700 sticky"
          style={{ top: "6vh" }}
        >
          
          <div className="mx-auto flex flex-col gap-4 px-4 h-[600px]">
            {/* Text container - fixed height */}
            <div className="w-full h-[250px] rounded-2xl bg-[#ECEBE9] p-6 flex flex-col justify-center overflow-auto">
              <h3 className="text-2xl mb-4 font-Poppins-400">{feature.title}</h3>
              <p className="text-base leading-relaxed font-Poppins text-[#192328]">{feature.description}</p>
            </div>

            {/* Right image container */}
            <div className="w-full h-[250px] rounded-2xl overflow-hidden">
              <div className="w-full h-full relative">
                <Image
                  src={feature.rightImage || "/placeholder.svg"}
                  alt={`Feature ${index + 1} right`}
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

export default FeatureBoxesMobile

