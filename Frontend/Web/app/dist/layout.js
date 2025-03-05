"use strict";
exports.__esModule = true;
exports.metadata = void 0;
// frontend/web/app/layout.tsx
require("../styles/globals.css");
var google_1 = require("next/font/google");
var footer_1 = require("@/components/footer");
var Header_1 = require("@/components/Header");
var poppins = google_1.Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins'
});
exports.metadata = {
    title: 'Navigo - Your Gateway to The Experience',
    description: 'Plan and book your perfect trip with Navigo'
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", className: poppins.variable },
        React.createElement("body", { className: "font-sans" },
            React.createElement(Header_1["default"], null),
            children,
            React.createElement(footer_1["default"], null))));
}
exports["default"] = RootLayout;
