// frontend/web/components/sections/HeroSection.tsx
"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var Header_1 = require("@/components/Header");
var HeroSectionMobile_1 = require("@/components/sections/HeroSectionMobile");
var use_mobile_1 = require("@/hooks/use-mobile");
var HeroSection = function () {
    var isMobile = use_mobile_1.useMobile();
    if (isMobile) {
        return react_1["default"].createElement(HeroSectionMobile_1["default"], null);
    }
    return (react_1["default"].createElement("section", { className: "relative h-screen" },
        react_1["default"].createElement("div", { className: "absolute inset-0 z-0" },
            react_1["default"].createElement(image_1["default"], { src: "/images/HeroSectionImage.jpg", alt: "Navigo background", fill: true, className: "object-cover", priority: true })),
        react_1["default"].createElement("div", { className: "relative z-10 pt-8" },
            react_1["default"].createElement(Header_1["default"], null)),
        react_1["default"].createElement("div", { className: "z-10 relative text-amber-500 ml-16 mt-24" },
            react_1["default"].createElement("h1", { className: "text-8xl font-Montserrat font mb-2" }, "NAVIGO"),
            react_1["default"].createElement("p", { className: "text-6xl text-amber-400 mb-12" }, " Your Gateway to The Experience"),
            " ",
            react_1["default"].createElement("br", null),
            " ",
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("div", { className: "flex flex-col space-y-4" },
                react_1["default"].createElement(link_1["default"], { href: "/book-online", className: "w-[210px] h-[32px] bg-[#F3A522] hover:bg-[#003366] text-white rounded-2xl flex items-center justify-between px-4 transition-colors group" },
                    react_1["default"].createElement("span", null, "Book now"),
                    react_1["default"].createElement("svg", { className: "w-5 h-5 transform group-hover:-rotate-45 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }))),
                react_1["default"].createElement(link_1["default"], { href: "/explore", className: "w-[210px] h-[32px] bg-[#F3A522] hover:bg-[#003366] text-white rounded-2xl flex items-center justify-between px-4 transition-colors group" },
                    react_1["default"].createElement("span", null, "Explore"),
                    react_1["default"].createElement("svg", { className: "w-5 h-5 transform group-hover:-rotate-45 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" })))))));
};
exports["default"] = HeroSection;
