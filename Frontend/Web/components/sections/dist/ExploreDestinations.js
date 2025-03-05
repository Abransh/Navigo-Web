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
        React.createElement("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4" }, destinations.map(function (destination) { return (React.createElement(link_1["default"], { key: destination.name, href: destination.href, className: "group block h-[600px] overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]" },
            React.createElement("div", { className: "flex h-full flex-col" },
                React.createElement("h3", { className: "mb-6 text-center text-2xl font-bold" }, destination.name),
                React.createElement("div", { className: "relative mb-4 flex-1 overflow-hidden  " },
                    React.createElement("div", { className: "relative h-full w-full" },
                        React.createElement(image_1["default"], { src: destination.image || "/placeholder.svg", alt: destination.name, fill: true, className: "object-cover ", style: { aspectRatio: "3/4" } }))),
                React.createElement("div", { className: "mt-auto inline-flex items-center justify-between px-2 text-sm font-medium transition-colors group-hover:text-navy-blue" },
                    React.createElement("span", null, "Explore"),
                    React.createElement("svg", { className: "w-5 h-5 transform group-hover:-rotate-45 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" })))))); })),
        React.createElement("div", { className: "mt-2 flex justify-end" },
            React.createElement(link_1["default"], { href: "/destinations", className: "inline-flex w-full items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#F3A522] hover:text-navy-blue" },
                "ALL DESTINATIONS",
                React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" })))));
}
exports["default"] = DestinationsSection;
