"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
function Footer() {
    return (React.createElement("footer", { className: "bg-[#1E1E1E] text-white" },
        React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-12" },
            React.createElement("div", { className: "grid gap-8 md:grid-cols-4" },
                React.createElement("div", { className: "md:col-span-2" },
                    React.createElement("h2", { className: "text-2xl font-bold" }, "Navigo"),
                    React.createElement("p", { className: "mt-4 text-gray-400" }, "Your trusted companion for exploring India safely and authentically.")),
                React.createElement("div", null,
                    React.createElement("h3", { className: "mb-4 text-lg font-semibold" }, "Quick Links"),
                    React.createElement("ul", { className: "space-y-2" },
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/about", className: "text-gray-400 hover:text-white" }, "About Us")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/destinations", className: "text-gray-400 hover:text-white" }, "Destinations")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/advantages", className: "text-gray-400 hover:text-white" }, "Advantages")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/contact", className: "text-gray-400 hover:text-white" }, "Contact"))))))));
}
exports["default"] = Footer;
