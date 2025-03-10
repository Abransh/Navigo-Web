"use client"

import type React from "react"
import Image from "next/image"

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
        "Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It's overwhelming, time-consuming, and many aren't even in English. We simplify it by bringing you local apps in English.",
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
      rightImage: "/images/Featuresbox3.jpg",
    },
    {
      title: "TRAVEL APPS!!",
      description:
        "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
      leftImage: "/images/QrBarBoxesHorizontal.png",
      rightImage: "/images/feature-image-4-right.jpg",
    },
  ]

  return (
    <div className="relative space-y-16 py-8">
      {featureBoxes.map((feature, index) => (
        <section key={index} className="py-4 transition-all duration-700">
          <div className="mx-auto flex flex-col gap-4">
            {/* Text container - full width on mobile */}
            <div className="w-full rounded-2xl bg-[#ECEBE9] p-6 flex flex-col justify-center">
              <h3 className="text-2xl mb-4 font-Poppins-400">{feature.title}</h3>
              <p className="text-base leading-relaxed font-Poppins text-[#192328]">{feature.description}</p>
            </div>

            {/* Left image container - horizontal on mobile */}
            <div className="w-full h-[120px] rounded-2xl overflow-hidden">
              <div className="w-full h-full relative">
                <Image
                  src={feature.leftImage || "/placeholder.svg"}
                  alt={`Feature ${index + 1} left`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right image container */}
            <div className="w-full h-[200px] rounded-2xl overflow-hidden">
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

