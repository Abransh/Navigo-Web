"use strict";
exports.__esModule = true;
// frontend/web/app/page.tsx
var react_1 = require("react");
var Mainlayout_1 = require("@/components/layout/Mainlayout");
var HeroSection_1 = require("@/components/sections/HeroSection");
var PlaneScrollSection_1 = require("@/components/sections/PlaneScrollSection");
var section4_1 = require("@/components/sections/section4");
var FeatureBoxes_1 = require("@/components/sections/FeatureBoxes");
var advantages_1 = require("@/components/sections/advantages");
var ExploreDestinations_1 = require("@/components/sections/ExploreDestinations");
var ExpDest_1 = require("@/components/sections/ExpDest");
var testimonials_1 = require("@/components/sections/testimonials");
var ContactSection_1 = require("@/components/sections/ContactSection");
function Home() {
    return (react_1["default"].createElement(Mainlayout_1["default"], null,
        react_1["default"].createElement(HeroSection_1["default"], null),
        react_1["default"].createElement(PlaneScrollSection_1["default"], null),
        react_1["default"].createElement(section4_1["default"], null),
        react_1["default"].createElement(FeatureBoxes_1["default"], null),
        react_1["default"].createElement(advantages_1["default"], null),
        react_1["default"].createElement(ExpDest_1["default"], null),
        react_1["default"].createElement(ExploreDestinations_1["default"], null),
        react_1["default"].createElement(testimonials_1["default"], null),
        react_1["default"].createElement(ContactSection_1["default"], null)));
}
exports["default"] = Home;
