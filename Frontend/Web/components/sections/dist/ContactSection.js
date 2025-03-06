"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var destinations = [
    { value: "varanasi", label: "Varanasi" },
    { value: "goa", label: "Goa" },
    { value: "new-delhi", label: "New Delhi" },
    { value: "jaipur", label: "Jaipur" },
    { value: "mumbai", label: "Mumbai" },
    { value: "agra", label: "Agra" },
    { value: "udaipur", label: "Udaipur" },
];
function ContactSection() {
    var _a = react_1.useState(undefined), date = _a[0], setDate = _a[1];
    var _b = react_1.useState({
        from: undefined,
        to: undefined
    }), dateRange = _b[0], setDateRange = _b[1];
    var _c = react_1.useState(false), isRangeMode = _c[0], setisRangeMode = _c[1];
    var _d = react_1.useState(""), selectedDestination = _d[0], setSelectedDestination = _d[1];
    var _e = react_1.useState(false), isDestinationOpen = _e[0], setIsDestinationOpen = _e[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        console.log("Form Submitted");
    };
    return (React.createElement("section", { className: "mx-auto max-w-7xl px-4 py-16" },
        React.createElement("div", { className: "overflow-hidden" },
            React.createElement("div", { className: "grid md:grid-cols-[1fr_300px]" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "mb-8 rounded-t-3xl bg-navy-blue p-6 text-3xl font-bold text-white" }, "Contact Us to Book Your Trip")),
                ") //continue here making contact form }"))));
}
exports["default"] = ContactSection;
