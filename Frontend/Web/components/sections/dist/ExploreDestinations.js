"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var destinations = [
    {
        name: "VARANASI",
        image: "/images/frontend/web/public/images/Varanasi1.jpg",
        href: "/destinations/varanasi"
    },
    {
        name: "GOA",
        image: "/images/frontend/web/public/images/Goa.jpg",
        href: "/destinations/goa"
    },
    {
        name: "NEW DELHI",
        image: "/images/frontend/web/public/images/NewDelhi.jpg",
        href: "/destinations/new-delhi"
    },
    {
        name: "JAIPUR",
        image: "/images/frontend/web/public/images/Jaipur.jpg",
        href: "/destinations/jaipur"
    },
];
function DestinationsSection() {
    return (React.createElement("section", { className: "mx-auto max-w-[1440px] px-4 py-16" },
        React.createElement("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" }, destinations.map(function (destination) { return (React.createElement("div", { key: destination.name, className: "group relative overflow-hidden rounded-3xl bg-gray-50 transition-colors hover:bg-[#F3A522]" },
            React.createElement("div", { className: "aspect-[3/4] w-full" },
                React.createElement(image_1["default"], { src: destination.image || "/placeholder.svg", alt: destination.name, className: "h-full w-full object-cover", width: 400, height: 600 })),
            React.createElement("div", { className: "p-6" },
                React.createElement("h3", { className: "mb-4 text-xl font-bold" }, destination.name),
                React.createElement(link_1["default"], { href: destination.href, className: "inline-flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-navy-blue" },
                    "EXPLORE",
                    React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))))); })),
        React.createElement("div", { className: "mt-8 flex justify-end" },
            React.createElement(link_1["default"], { href: "/destinations", className: "inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-blue" },
                "ALL DESTINATIONS",
                React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" })))));
}
exports["default"] = DestinationsSection;
