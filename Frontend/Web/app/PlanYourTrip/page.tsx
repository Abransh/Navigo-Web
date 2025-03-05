"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const howItWorks = [
    {
      title: "Discover your adventure",
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




]