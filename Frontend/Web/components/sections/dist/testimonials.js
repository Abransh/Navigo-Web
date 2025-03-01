"use client";
"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var testimonials = [
    {
        name: "Michael Jake",
        rating: 4.8,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors."
    },
    {
        name: "Sarah Evans",
        rating: 4.9,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors."
    },
    {
        name: "Benjamin Ansel",
        rating: 4.7,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors."
    },
    {
        name: "Emily Davis",
        rating: 4.8,
        text: "Use this space to share a testimonial quote about the business, its products or its services. Insert a quote from a real customer or client here to build trust and win over site visitors."
    },
];
function Testimonials() {
    return (React.createElement("section", { className: "mx-auto max-w-[1440px] px-4 py-16" },
        React.createElement("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" }, testimonials.map(function (testimonial, index) { return (React.createElement("div", { key: index, className: "flex flex-col rounded-3xl bg-gray-50 p-6" },
            React.createElement("div", { className: "mb-4" },
                React.createElement("p", { className: "text-sm text-gray-500" }, "Name."),
                React.createElement("h3", { className: "text-xl font-medium" }, testimonial.name)),
            React.createElement("div", { className: "mb-4 flex items-center gap-1 rounded-full bg-[#1E1E1E] px-4 py-1 text-white w-fit" },
                React.createElement(lucide_react_1.Star, { className: "h-4 w-4 fill-current" }),
                React.createElement("span", { className: "text-sm" },
                    testimonial.rating,
                    " / 5")),
            React.createElement("p", { className: "text-gray-600" }, testimonial.text))); }))));
}
exports["default"] = Testimonials;
