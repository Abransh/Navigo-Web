// frontend/web/components/layout/Header.tsx
"use client";
"use strict";

exports.__esModule = true;

var link_1 = require("next/link");

var react_1 = require("react");

var Header = function Header() {
  var _a = react_1.useState(true),
      visible = _a[0],
      setVisible = _a[1];

  var _b = react_1.useState(0),
      prevScrollPos = _b[0],
      setPrevScrollPos = _b[1];

  react_1.useEffect(function () {
    var handleScroll = function handleScroll() {
      var currentScrollPos = window.pageYOffset; // Always show header at the top of the page (hero section)

      if (currentScrollPos < 200) {
        setVisible(true);
      } else {
        // Otherwise, only show when scrolling up
        var isScrollingUp = prevScrollPos > currentScrollPos;
        setVisible(isScrollingUp);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return function () {
      return window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  return react_1["default"].createElement("div", {
    className: "fixed top-4 left-0 right-0 z-50 transition-transform duration-300 px-2 " + (visible ? 'translate-y-0' : '-translate-y-full')
  }, react_1["default"].createElement("header", {
    className: "flex justify-between items-center py-3 max-w-7xl mx-auto"
  }, react_1["default"].createElement("div", {
    className: "w-[373px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6"
  }, react_1["default"].createElement(link_1["default"], {
    href: "/",
    className: "text-xl font text-[#000000]"
  }, "Navigo")), react_1["default"].createElement("div", {
    className: "w-[622px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md mx-2 flex justify-center items-center"
  }, react_1["default"].createElement("nav", {
    className: "flex space-x-6"
  }, react_1["default"].createElement(link_1["default"], {
    href: "/explore",
    className: "hover:text-[#F3A522] text-sm"
  }, "Explore Destinations"), react_1["default"].createElement(link_1["default"], {
    href: "/plan",
    className: "hover:text-[#F3A522] text-sm"
  }, "Plan Your Trip"), react_1["default"].createElement(link_1["default"], {
    href: "/magazine",
    className: "hover:text-[#F3A522] text-sm"
  }, "Magazine"), react_1["default"].createElement(link_1["default"], {
    href: "/about",
    className: "hover:text-[#F3A522] text-sm"
  }, "Our Mission"))), react_1["default"].createElement("div", {
    className: "w-[249px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6 justify-between group hover:bg-[#6babea] transition-all duration-300"
  }, react_1["default"].createElement(link_1["default"], {
    href: "/trip-planner",
    className: "text-sm group-hover:text-white transition-colors duration-300"
  }, "Plan Your Trip"), react_1["default"].createElement("svg", {
    className: "w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, react_1["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M14 5l7 7m0 0l-7 7m7-7H3"
  })))));
};

exports["default"] = Header;