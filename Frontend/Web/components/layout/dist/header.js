"use strict";
exports.__esModule = true;
// frontend/web/components/layout/Header.tsx
var link_1 = require("next/link");
var react_1 = require("react");
var Header = function () {
    return (react_1["default"].createElement("div", { className: "flex justify-center mt-8 px-4" },
        react_1["default"].createElement("header", { className: "flex justify-between items-center" },
            react_1["default"].createElement("div", { className: "w-[373px] h-[32px] bg-white rounded-full shadow-md flex items-center px-6" },
                react_1["default"].createElement(link_1["default"], { href: "/", className: "text-xl font-bold text-[#F3A522]" }, "Navigo")),
            react_1["default"].createElement("div", { className: "w-[622px] h-[32px] bg-white rounded-full shadow-md mx-2 flex justify-center items-center" },
                react_1["default"].createElement("nav", { className: "flex space-x-6" },
                    react_1["default"].createElement(link_1["default"], { href: "/explore", className: "hover:text-[#F3A522] text-sm" }, "Explore Destinations"),
                    react_1["default"].createElement(link_1["default"], { href: "/plan", className: "hover:text-[#F3A522] text-sm" }, "Plan Your Trip"),
                    react_1["default"].createElement(link_1["default"], { href: "/magazine", className: "hover:text-[#F3A522] text-sm" }, "Magazine"),
                    react_1["default"].createElement(link_1["default"], { href: "/about", className: "hover:text-[#F3A522] text-sm" }, "About us"))),
            react_1["default"].createElement("div", { className: "w-[249px] h-[32px] bg-white rounded-full shadow-md flex items-center px-6 justify-between" },
                react_1["default"].createElement(link_1["default"], { href: "/trip-planner", className: "hover:text-[#F3A522] text-sm" }, "Plan Your Trip"),
                react_1["default"].createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }))))));
};
exports["default"] = Header;
