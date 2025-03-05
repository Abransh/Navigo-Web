"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var allDestinations = [
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
    {
        name: "MUMBAI",
        image: "/placeholder.svg",
        href: "/destinations/mumbai"
    },
    {
        name: "AGRA",
        image: "/placeholder.svg",
        href: "/destinations/agra"
    },
    {
        name: "UDAIPUR",
        image: "/placeholder.svg",
        href: "/destinations/udaipur"
    },
];
function DestinationsPage() {
    return (React.createElement("div", { className: "min-h-screen bg-gray-50" },
        React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-24" },
            React.createElement("h1", { className: "mb-16 text-center text-5xl font-bold" }, "Explore Indian Destinations"),
            React.createElement("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" }, allDestinations.map(function (destination) { return (React.createElement("div", { key: destination.name, className: "group flex h-[500px] flex-col overflow-hidden rounded-3xl bg-white p-6 transition-colors hover:bg-[#F3A522]" },
                React.createElement("h3", { className: "mb-6 text-center text-2xl font-bold" }, destination.name),
                React.createElement("div", { className: "relative mb-4 flex-1 overflow-hidden rounded-2xl" },
                    React.createElement("div", { className: "relative h-full w-full" },
                        React.createElement(image_1["default"], { src: destination.image || "/placeholder.svg", alt: destination.name, fill: true, className: "object-cover p-3", style: { aspectRatio: "3/4" } }))),
                React.createElement(link_1["default"], { href: destination.href, className: "mt-auto inline-flex items-center justify-between px-2 text-sm font-medium transition-colors group-hover:text-navy-blue" },
                    "EXPLORE",
                    React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" })))); })))));
}
exports["default"] = DestinationsPage;
