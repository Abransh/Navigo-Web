"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
var auth_context_1 = require("@/contexts/auth-context");
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
    var _b = auth_context_1.useAuth(), user = _b.user, isAuthenticated = _b.isAuthenticated;
    var _c = react_1.useState({
        firstName: "",
        lastName: "",
        email: ""
    }), formData = _c[0], setFormData = _c[1];
    react_1.useEffect(function () {
        if (isAuthenticated && user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || ""
            });
        }
    }, [isAuthenticated, user]);
    var _d = react_1.useState(undefined), date = _d[0], setDate = _d[1];
    var _e = react_1.useState({
        from: undefined,
        to: undefined
    }), dateRange = _e[0], setDateRange = _e[1];
    var _f = react_1.useState(false), isRangeMode = _f[0], setIsRangeMode = _f[1];
    var _g = react_1.useState(""), selectedDestination = _g[0], setSelectedDestination = _g[1];
    var _h = react_1.useState(false), isDestinationOpen = _h[0], setIsDestinationOpen = _h[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        console.log("Form Submitted", formData);
        // Process form submission
    };
    var handleChange = function (e) {
        var _a = e.target, id = _a.id, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[id] = value, _a)));
        });
    };
    return (React.createElement("section", { className: "mx-auto max-w-7xl px-4 py-16" },
        React.createElement("div", { className: "overflow-hidden" },
            React.createElement("div", { className: "grid md:grid-cols-[1fr_100px]" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "rounded-t-3xl bg-gray-700 p-6 text-3xl font-bold text-white" }, "Contact Us to Book Your Trip"),
                    React.createElement("form", { onSubmit: handleSubmit, className: "rounded-b-3xl bg-gray-300 p-6" },
                        React.createElement("div", { className: "grid gap-8 md:grid-cols-2" },
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "firstName", className: "flex items-center" },
                                    "First Name",
                                    React.createElement("span", { className: "ml-1 text-grey-500" }, "*")),
                                React.createElement("input", { id: "firstName", required: true, className: "mt-1 w-full border-b-2 bg-gray-200 border-gray-300 py-2 outline-none focus:border-navy-blue", value: formData.firstName, onChange: handleChange })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "lastName", className: "flex items-center" },
                                    "Last Name",
                                    React.createElement("span", { className: "ml-1 text-red-500" }, "*")),
                                React.createElement("input", { id: "lastName", required: true, className: "mt-1 w-full border-b-2 border-gray-300 py-2 outline-none focus:border-navy-blue", value: formData.lastName, onChange: handleChange }))),
                        React.createElement("div", { className: "mt-8 grid gap-8 md:grid-cols-2" },
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "email", className: "flex items-center" },
                                    "Email",
                                    React.createElement("span", { className: "ml-1 text-red-500" }, "*")),
                                React.createElement("input", { id: "email", type: "email", required: true, className: "mt-1 w-full border-b-2 border-gray-300 py-2 outline-none focus:border-navy-blue", value: formData.email, onChange: handleChange })),
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
                                    React.createElement(popover_1.PopoverContent, { className: "w-auto p-0", align: "start" }, (React.createElement(calendar_1.Calendar, { mode: "single", selected: date, onSelect: function (selected) {
                                            setDate(selected);
                                        }, initialFocus: true })))))),
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
                React.createElement("div", { className: "w-[100px] h-[400px] rounded-2xl mx-1 overflow-hidden" },
                    React.createElement("div", { className: "w-full h-full relative" },
                        React.createElement(image_1["default"], { src: "/images/QrBarBoxes.png", alt: "Contact Us", fill: true, className: "object-cover" })))))));
}
exports["default"] = ContactSection;
