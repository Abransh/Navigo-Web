"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"


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
            to: undefined as Date | undefined,
          })

      const [isRangeMode, setIsRangeMode] = useState(false)
      const[selectedDestination, setSelectedDestination] = useState("")
      const[isDestinationOpen, setIsDestinationOpen] = useState(false)


      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form Submitted")
      }

      return(
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className= "overflow-hidden">
                <div className = "grid md:grid-cols-[1fr_100px]">
                    {/* here is the submission of the form */}
                    <div>
            <h2 className=" rounded-t-3xl bg-gray-700 p-6 text-3xl font-bold text-white">
              Contact Us to Book Your Trip
            </h2>

            <form onSubmit={handleSubmit} className="rounded-b-3xl bg-gray-300 p-6">
              <div className="grid gap-8 md:grid-cols-2">
                {/* First Name */}
                <div>
                  <Label htmlFor="firstName" className="flex items-center">
                    First Name
                    <span className="ml-1 text-grey-500">*</span>
                  </Label>
                  <input
                    id="firstName"
                    required
                    className="mt-1 w-full border-b-2 bg-gray-200 border-gray-300 py-2 outline-none focus:border-navy-blue"
                  />
                </div>


                {/* Last Name */}
                <div>
                  <Label htmlFor="lastName" className="flex items-center">
                    Last Name
                    <span className="ml-1 text-red-500">*</span>
                  </Label>
                  <input
                    id="lastName"
                    required
                    className="mt-1 w-full border-b-2 border-gray-300 py-2 outline-none focus:border-navy-blue"
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="flex items-center">
                    Email
                    <span className="ml-1 text-red-500">*</span>
                  </Label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 w-full border-b-2 border-gray-300 py-2 outline-none focus:border-navy-blue"
                  />
                </div>

                {/* Date Picker */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="date">Preferred Dates</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsRangeMode(!isRangeMode)}
                      className="h-6 text-xs text-navy-blue hover:bg-gray-100"
                    >
                      {isRangeMode ? "Single Date" : "Date Range"}
                    </Button>
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        id="date"
                        type="button"
                        className="mt-1 flex w-full items-center border-b-2 border-gray-300 py-2 text-left outline-none focus:border-navy-blue"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {isRangeMode ? (
                          dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                              </>
                            ) : (
                              format(dateRange.from, "PPP")
                            )
                          ) : (
                            <span>Select date range</span>
                          )
                        ) : date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      { (
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selected: Date | undefined) => {
                            setDate(selected);
                          }}
                          initialFocus
                        />
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="mt-8 flex items-end gap-8">
                {/* Destinations */}
                <div className="w-1/3">
                  <Label htmlFor="destination">Destinations</Label>
                  <Popover open={isDestinationOpen} onOpenChange={setIsDestinationOpen}>
                    <PopoverTrigger asChild>
                      <button
                        id="destination"
                        type="button"
                        className="mt-1 flex w-full items-center justify-between border-b-2 border-gray-300 py-2 text-left outline-none focus:border-navy-blue"
                      >
                        {selectedDestination
                          ? destinations.find((d) => d.value === selectedDestination)?.label
                          : "Select destination"}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <div className="max-h-[300px] overflow-auto">
                        {destinations.map((destination) => (
                          <button
                            key={destination.value}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                              setSelectedDestination(destination.value)
                              setIsDestinationOpen(false)
                            }}
                          >
                            {destination.label}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>


                {/* Submit Button */}
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-navy-blue py-2 text-center text-white hover:bg-[#F3A522] hover:text-navy-blue"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-[100px] h-[400px] rounded-2xl mx-1 overflow-hidden">
          <div className="w-full h-full relative">
            <Image src="/images/QrBarBoxes.jpg"
             alt="Contact Us" 
             fill 
             className="object-cover" />
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
