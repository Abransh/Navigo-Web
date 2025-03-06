"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var popover_1 = require("@/components/ui/popover");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
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
    var _a;
    var _b = react_1.useState(undefined), date = _b[0], setDate = _b[1];
    var _c = react_1.useState({
        from: undefined,
        to: undefined
    }), dateRange = _c[0], setDateRange = _c[1];
    var _d = react_1.useState(false), isRangeMode = _d[0], setIsRangeMode = _d[1];
    var _e = react_1.useState(""), selectedDestination = _e[0], setSelectedDestination = _e[1];
    var _f = react_1.useState(false), isDestinationOpen = _f[0], setIsDestinationOpen = _f[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        console.log("Form Submitted");
    };
    return (React.createElement("section", { className: "mx-auto max-w-7xl px-4 py-16" },
        React.createElement("div", { className: "overflow-hidden" },
            React.createElement("div", { className: "grid md:grid-cols-[1fr_300px]" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "mb-8 rounded-t-3xl bg-navy-blue p-6 text-3xl font-bold text-white" }, "Contact Us to Book Your Trip"),
                    React.createElement("form", { onSubmit: handleSubmit, className: "bg-white p-6" },
                        React.createElement("div", { className: "grid gap-8 md:grid-cols-2" },
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "firstName", className: "flex items-center" },
                                    "First Name",
                                    React.createElement("span", { className: "ml-1 text-grey-500" }, "*")),
                                React.createElement("input", { id: "firstName", placeholder: "Enter your first name", required: true, className: "mt-1 w-full border-b-2 border-gray-300 py-2 outline-none focus:border-navy-blue" })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "lastName", className: "flex items-center" },
                                    "Last Name",
                                    React.createElement("span", { className: "ml-1 text-red-500" }, "*")),
                                React.createElement("input", { id: "lastName", placeholder: "Enter your last name", required: true, className: "mt-1 w-full border-b-2 border-gray-300 py-2 outline-none focus:border-navy-blue" }))),
                        React.createElement("div", { className: "mt-8 grid gap-8 md:grid-cols-2" },
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "email", className: "flex items-center" },
                                    "Email",
                                    React.createElement("span", { className: "ml-1 text-red-500" }, "*")),
                                React.createElement("input", { id: "email", type: "email", placeholder: "Enter your email", required: true, className: "mt-1 w-full border-b-2 border-gray-300 py-2 outline-none focus:border-navy-blue" })),
                            React.createElement("div", null,
                                React.createElement("div", { className: "flex items-center justify-between" },
                                    React.createElement(label_1.Label, { htmlFor: "date" }, "Preferred Dates"),
                                    React.createElement(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: function () { return setIsRangeMode(!isRangeMode); }, className: "h-6 text-xs text-navy-blue hover:bg-gray-100" }, isRangeMode ? "Single Date" : "Date Range")),
                                React.createElement(popover_1.Popover, null,
                                    React.createElement(popover_1.PopoverTrigger, { asChild: true },
                                        React.createElement("button", { id: "date", type: "button", className: "mt-1 flex w-full items-center border-b-2 border-gray-300 py-2 text-left outline-none focus:border-navy-blue" },
                                            React.createElement(lucide_react_1.CalendarIcon, { className: "mr-2 h-4 w-4" }),
                                            isRangeMode ? (dateRange.from ? (dateRange.to ? (React.createElement(React.Fragment, null,
                                                date_fns_1.format(dateRange.from, "PPP"),
                                                " - ",
                                                date_fns_1.format(dateRange.to, "PPP"))) : (date_fns_1.format(dateRange.from, "PPP"))) : (React.createElement("span", null, "Select date range"))) : date ? (date_fns_1.format(date, "PPP")) : (React.createElement("span", null, "Select date")))),
                                    React.createElement(popover_1.PopoverContent, { className: "w-auto p-0", align: "start" },
                                        React.createElement(lucide_react_1.Calendar, { mode: isRangeMode ? "range" : "single", selected: isRangeMode ? dateRange : date, onSelect: isRangeMode ? setDateRange : setDate, initialFocus: true }))))),
                        React.createElement("div", { className: "mt-8 flex items-end gap-8" },
                            React.createElement("div", { className: "w-1/3" },
                                React.createElement(label_1.Label, { htmlFor: "destination" }, "Destinations"),
                                React.createElement(popover_1.Popover, { open: isDestinationOpen, onOpenChange: setIsDestinationOpen },
                                    React.createElement(popover_1.PopoverTrigger, { asChild: true },
                                        React.createElement("button", { id: "destination", type: "button", className: "mt-1 flex w-full items-center justify-between border-b-2 border-gray-300 py-2 text-left outline-none focus:border-navy-blue" },
                                            selectedDestination
                                                ? (_a = destinations.find(function (d) { return d.value === selectedDestination; })) === null || _a === void 0 ? void 0 : _a.label : "Select destination",
                                            React.createElement(lucide_react_1.ChevronDown, { className: "h-4 w-4" }))),
                                    React.createElement(popover_1.PopoverContent, { className: "w-[200px] p-0" },
                                        React.createElement("div", { className: "max-h-[300px] overflow-auto" }, destinations.map(function (destination) { return (React.createElement("button", { key: destination.value, className: "w-full px-4 py-2 text-left hover:bg-gray-100", onClick: function () {
                                                setSelectedDestination(destination.value);
                                                setIsDestinationOpen(false);
                                            } }, destination.label)); }))))),
                            React.createElement(button_1.Button, { type: "submit", className: "flex-1 rounded-full bg-navy-blue py-2 text-center text-white hover:bg-[#F3A522] hover:text-navy-blue" }, "Submit")))),
                React.createElement("div", { className: "relative hidden md:block" },
                    React.createElement(image_1["default"], { src: "/placeholder.svg", alt: "Contact Us", fill: true, className: "object-cover" }))))));
}
exports["default"] = ContactSection;
