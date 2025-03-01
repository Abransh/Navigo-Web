"use strict";
exports.__esModule = true;
// frontend/web/components/layout/Header.tsx
var link_1 = require("next/link");
var react_1 = require("react");
var Header = function () {
    var _a = react_1.useState(true), visible = _a[0], setVisible = _a[1];
    var _b = react_1.useState(0), prevScrollPos = _b[0], setPrevScrollPos = _b[1];
    var _c = react_1.useState(0), scrollSpeed = _c[0], setScrollSpeed = _c[1];
    var _d = react_1.useState(Date.now()), lastScrollTime = _d[0], setLastScrollTime = _d[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            var currentScrollPos = window.pageYOffset;
            var currentTime = Date.now();
            var timeDiff = currentTime - lastScrollTime;
            // Calculate scroll speed (pixels per millisecond)
            var speed = Math.abs(currentScrollPos - prevScrollPos) / (timeDiff || 1);
            setScrollSpeed(speed);
            // Update time of last scroll
            setLastScrollTime(currentTime);
            // Show header when scrolling up or when scroll speed is below threshold
            var isScrollingUp = prevScrollPos > currentScrollPos;
            var isFastScroll = speed > 0.5; // Adjust this threshold as needed
            setVisible(isScrollingUp || !isFastScroll);
            setPrevScrollPos(currentScrollPos);
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, [prevScrollPos, lastScrollTime]);
    return (react_1["default"].createElement("div", { className: "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 px-4 " + (visible ? 'translate-y-0' : '-translate-y-full') },
        react_1["default"].createElement("header", { className: "flex justify-between items-center py-3 max-w-7xl mx-auto" },
            react_1["default"].createElement("div", { className: "w-[373px] h-[32px] bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center px-6" },
                react_1["default"].createElement(link_1["default"], { href: "/", className: "text-xl font text-[#000000]" }, "Navigo")),
            "export default Header;")));
};
