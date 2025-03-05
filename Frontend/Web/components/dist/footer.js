"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
function Footer() {
    return (React.createElement("footer", { className: "bg-[#FFB343] text-black" },
        React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-12" },
            React.createElement("div", { className: "grid gap-8 md:grid-cols-4" },
                React.createElement("div", { className: "md:col-span-2" },
                    React.createElement("h2", { className: "text-2xl font-bold" }, "Navigo"),
                    React.createElement("p", { className: "mt-4 text-black" }, "Your trusted companion for exploring India safely and authentically.")),
                React.createElement("div", null,
                    React.createElement("h3", { className: "mb-4 text-lg font-semibold" }, "Quick Links"),
                    React.createElement("ul", { className: "space-y-2" },
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/about", className: "text-black hover:text-white" }, "About Us")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/destinations", className: "text-black hover:text-white" }, "Destinations")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/advantages", className: "text-black hover:text-white" }, "Advantages")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/contact", className: "text-black hover:text-white" }, "Contact"))))),
            React.createElement("div", null,
                React.createElement("h3", { className: "mb-4 text-lg font-semibold" }, "Connect With Us"),
                React.createElement("div", { className: "flex space-x-4" },
                    React.createElement(link_1["default"], { href: "#", className: "text-gray-600 hover:text-red-500" },
                        React.createElement(lucide_react_1.Instagram, { className: "h-6 w-6" })),
                    React.createElement(link_1["default"], { href: "#", className: "text-gray-600 hover:text-blue-500" },
                        React.createElement(lucide_react_1.Facebook, { className: "h-6 w-6" })),
                    React.createElement(link_1["default"], { href: "#", className: "text-gray-600 hover:text-white" },
                        React.createElement(lucide_react_1.Twitter, { className: "h-6 w-6" })),
                    React.createElement(link_1["default"], { href: "#", className: "text-gray-600 hover:text-red-700" },
                        React.createElement(lucide_react_1.Mail, { className: "h-6 w-6" })))),
            React.createElement("div", { className: "mt-8 border-t border-gray-800 pt-8 text-center text-sm text-black" },
                React.createElement("p", null,
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " Navigo. All rights reserved.")))));
}
exports["default"] = Footer;
