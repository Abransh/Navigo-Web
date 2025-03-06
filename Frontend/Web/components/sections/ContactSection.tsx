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
//continue here making contact form 
  }