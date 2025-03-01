"use client"

import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Michael Jake",
        rating: 4.8,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors.",
    },
    {
        name: "Sarah Evans",
        rating: 4.9,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors.",
      },
      {
        name: "Benjamin Ansel",
        rating: 4.7,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors.",
      },
      {
        name: "Emily Davis",
        rating: 4.8,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors.",
      },

]

export default function Testimonials() {
    return (
            <section className="mx-auto max-w-[1440px] px-4 py-16">
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex flex-col rounded-3xl bg-gray-50 p-6">
                       <div className="mb-4">
                          <p className="text-sm text-gray-500">Name.</p>
                             <h3 className="text-xl font-medium">{testimonial.name}</h3>
                         </div>





    )


}