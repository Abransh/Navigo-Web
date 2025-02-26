"use strict";
exports.__esModule = true;
// frontend/web/components/sections/AdvantagesSection.tsx
var react_1 = require("react");
var link_1 = require("next/link");
var AdvantagesSection = function () {
    return (react_1["default"].createElement("section", { className: "py-16 bg-gray-100" },
        react_1["default"].createElement("div", { className: "container mx-auto px-4" },
            react_1["default"].createElement("div", { className: "max-w-4xl mx-auto text-center" },
                react_1["default"].createElement("h2", { className: "text-3xl font-bold mb-8" }, "Our Advantages"),
                react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" },
                    react_1["default"].createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                        react_1["default"].createElement("h3", { className: "text-xl font-semibold mb-4" }, "Personalized Experience"),
                        react_1["default"].createElement("p", { className: "text-gray-600" }, "Tailored travel plans that match your preferences and budget.")),
                    react_1["default"].createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                        react_1["default"].createElement("h3", { className: "text-xl font-semibold mb-4" }, "24/7 Support"),
                        react_1["default"].createElement("p", { className: "text-gray-600" }, "Our team is always available to assist you during your journey.")),
                    react_1["default"].createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                        react_1["default"].createElement("h3", { className: "text-xl font-semibold mb-4" }, "Best Price Guarantee"),
                        react_1["default"].createElement("p", { className: "text-gray-600" }, "We offer competitive prices for all destinations and experiences."))),
                react_1["default"].createElement(link_1["default"], { href: "/advantages", className: "inline-block px-8 py-3 border border-gray-800 text-gray-800 rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:border-black group" },
                    react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                        react_1["default"].createElement("span", null, "View more"),
                        react_1["default"].createElement("svg", { className: "w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                            react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }))))))));
};
exports["default"] = AdvantagesSection;
