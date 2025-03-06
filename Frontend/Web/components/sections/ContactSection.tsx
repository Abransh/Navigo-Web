"use client"; 

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover,  PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const destinations = [
    { value: "varanasi", label: "Varanasi" },
    { value: "goa", label: "Goa" },
    { value: "new-delhi", label: "New Delhi" },
    { value: "jaipur", label: "Jaipur" },
    { value: "mumbai", label: "Mumbai" },
    { value: "agra", label: "Agra" },
    { value: "udaipur", label: "Udaipur" },
  ]

  export default function ContactSection () {
    const[date, setDate] = useState<Date | undefined>(undefined)
    const [dateRange, setDateRange] = useState<{
        from: Date | undefined
        to: Date | undefined
      }>({
        from: undefined,
        to: undefined,
      })

      const [isRangeMode, setisRangeMode] = useState(false)
      const[selectedDestination, setSelectedDestination] = useState("")
      const[isDestinationOpen, setIsDestinationOpen] = useState(false)


      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form Submitted")
      }

      return(
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className= "overflow-hidden">
                <div className = "grid md:grid-cols-[1fr_300px]">
                    {/* here is the submission of the form */}
                    <div>
            <h2 className="mb-8 rounded-t-3xl bg-navy-blue p-6 text-3xl font-bold text-white">
              Contact Us to Book Your Trip
            </h2>

            </div>



      )
//continue here making contact form 
  }