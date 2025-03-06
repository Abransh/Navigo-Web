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
    //continue here making contact form 
}
exports["default"] = ContactSection;
