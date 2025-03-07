"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var howItWorks = [
    {
        title: "Dscover your adventure",
        content: "This is the space to describe the service and explain how customers or clients can benefit from it. It's an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service."
    },
    {
        title: "Plan your itinerary",
        content: "Create a personalized itinerary that matches your interests and travel style. Our local experts will help you plan the perfect route."
    },
    {
        title: "Book your accommodation",
        content: "Find and book verified accommodations that suit your preferences and budget. We ensure you get the best deals."
    },
    {
        title: "Dive into local experiences",
        content: "Discover authentic local experiences and activities that make your trip unique and memorable."
    },
];
var popularDestinations = [
    {
        name: "VARANASI",
        image: "/placeholder.svg",
        href: "/destinations/varanasi"
    },
    {
        name: "GOA",
        image: "/placeholder.svg",
        href: "/destinations/goa"
    },
    {
        name: "NEW DELHI",
        image: "/placeholder.svg",
        href: "/destinations/new-delhi"
    },
    {
        name: "JAIPUR",
        image: "/placeholder.svg",
        href: "/destinations/jaipur"
    },
];
function PlanYourTripPage() {
    var _a = react_1.useState(0), openSection = _a[0], setOpenSection = _a[1];
    return (React.createElement("div", { className: "min-h-screen bg-gray-50" },
        React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-24" },
            React.createElement("section", { className: "mb-24" },
                React.createElement("div", { className: "grid gap-8 md:grid-cols-2" },
                    React.createElement("div", { className: "relative h-[600px] overflow-hidden rounded-3xl" },
                        React.createElement(image_1["default"], { src: "/placeholder.svg", alt: "How Navigo Works", fill: true, className: "object-cover" })),
                    React.createElement("div", { className: "flex flex-col" },
                        React.createElement("div", { className: "mb-6 rounded-2xl bg-white p-4 shadow-sm" },
                            React.createElement("h2", { className: "text-center text-3xl font-bold  text-navy-blue" }, "HOW IT WORKS")),
                        React.createElement("div", { className: "flex-1 rounded-3xl bg-white p-6 shadow-sm" },
                            React.createElement("div", { className: "space-y-4" }, howItWorks.map(function (item, index) { return (React.createElement("div", { key: index },
                                React.createElement("button", { onClick: function () { return setOpenSection(openSection === index ? null : index); }, className: "flex w-full items-center justify-between py-3 text-left" },
                                    React.createElement("span", { className: "text-xl font-medium" }, item.title),
                                    React.createElement(lucide_react_1.ChevronDown, { className: "h-5 w-5 transition-transform duration-300 " + (openSection === index ? "rotate-180" : "") })),
                                React.createElement(framer_motion_1.AnimatePresence, null, openSection === index && (React.createElement(framer_motion_1.motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3 }, className: "overflow-hidden" },
                                    React.createElement("p", { className: "py-3 text-gray-700" }, item.content)))),
                                index < howItWorks.length - 1 && React.createElement("div", { className: "border-t border-dashed border-gray-300" }))); })))))),
            React.createElement("section", { className: "mb-12" },
                React.createElement("h2", { className: "mb-12 text-3xl font-bold" }, "Popular Destinations"),
                React.createElement("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" }, popularDestinations.map(function (destination) { return (React.createElement(link_1["default"], { key: destination.name, href: destination.href, className: "group block h-[500px] overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]" },
                    React.createElement("div", { className: "flex h-full flex-col" },
                        React.createElement("h3", { className: "mb-6 text-center text-2xl font-bold" }, destination.name),
                        React.createElement("div", { className: "relative mb-4 flex-1 overflow-hidden rounded-2xl" },
                            React.createElement("div", { className: "relative h-full w-full" },
                                React.createElement(image_1["default"], { src: destination.image || "/placeholder.svg", alt: destination.name, fill: true, className: "object-cover p-3" }))),
                        React.createElement("div", { className: "mt-auto flex items-center justify-between px-2 text-sm font-medium transition-colors group-hover:text-navy-blue" },
                            "EXPLORE",
                            React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))))); }))),
            React.createElement("section", { className: "rounded-3xl bg-[#F3A522] p-8" },
                React.createElement("div", { className: "grid gap-8 md:grid-cols-2" },
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "mb-6 flex items-center gap-3" },
                                React.createElement("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-white" },
                                    React.createElement("span", { className: "text-xl font-bold" }, "i")),
                                React.createElement("h2", { className: "text-3xl font-bold" }, "You're Probably Wondering")),
                            React.createElement("p", { className: "text-lg" }, "Have questions about planning your trip to India? We're here to help! Our team of local experts can assist you with everything from itinerary planning to booking accommodations and experiences."))),
                    React.createElement("div", { className: "relative h-[400px] overflow-hidden rounded-2xl" },
                        React.createElement(image_1["default"], { src: "/placeholder.svg", alt: "Wondering about India travel", fill: true, className: "object-cover" })))))));
}
exports["default"] = PlanYourTripPage;
