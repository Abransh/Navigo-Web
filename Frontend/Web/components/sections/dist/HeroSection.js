"use strict";
exports.__esModule = true;
// frontend/web/components/sections/HeroSection.tsx
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var HeroSection = function () {
    return (react_1["default"].createElement("section", { className: "relative h-screen flex flex-col justify-center" },
        react_1["default"].createElement("div", { className: "absolute inset-0 z-0" },
            react_1["default"].createElement(image_1["default"], { src: "/images/hero-background.jpg", alt: "Navigo background", fill: true, className: "object-cover", priority: true })),
        react_1["default"].createElement("div", { className: "z-10 text-white ml-16" },
            react_1["default"].createElement("h1", { className: "text-6xl font-bold mb-2" }, "NAVIGO"),
            react_1["default"].createElement("p", { className: "text-2xl mb-12" }, "Your Gateway to The Experience"),
            react_1["default"].createElement("div", { className: "flex flex-col space-y-4" },
                react_1["default"].createElement(link_1["default"], { href: "/booking", className: "w-[210px] h-[32px] bg-[#F3A522] hover:bg-[#003366] text-white rounded-2xl flex items-center justify-between px-4 transition-colors" },
                    react_1["default"].createElement("span", null, "Book now"),
                    react_1["default"].createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }))),
                react_1["default"].createElement(link_1["default"], { href: "/explore", className: "w-[210px] h-[32px] bg-[#F3A522] hover:bg-[#003366] text-white rounded-2xl flex items-center justify-between px-4 transition-colors" },
                    react_1["default"].createElement("span", null, "Explore"),
                    react_1["default"].createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" })))))));
};
exports["default"] = HeroSection;
