"use strict";
exports.__esModule = true;
// frontend/web/components/sections/PlaneScrollSection.tsx
import * as react_1 from "react";
var PlaneScrollSection = function () {
    var planeRef = react_1.useRef(null);
    var pathRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (planeRef.current && pathRef.current) {
                var scrollPosition = window.scrollY;
                var pathWidth = pathRef.current.offsetWidth;
                var maxScroll = 1000; // Adjust based on how much scroll you want to complete the animation
                // Calculate plane position based on scroll (capped at path width)
                var planePosition = Math.min((scrollPosition / maxScroll) * pathWidth, pathWidth - 50);
                planeRef.current.style.transform = "translateX(" + planePosition + "px)";
            }
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    return (react_1["default"].createElement("section", { className: "h-[42px] flex items-center justify-center relative overflow-hidden" },
        react_1["default"].createElement("div", { className: "max-w-full w-full mx-auto relative" },
            react_1["default"].createElement("div", { ref: pathRef, className: "h-[1px] bg-gray-300 w-full relative" }),
            react_1["default"].createElement("div", { ref: planeRef, className: "absolute top-0 transform -translate-y-1/2", style: { left: 0 } },
                react_1["default"].createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "#F3A522" },
                    react_1["default"].createElement("path", { d: "M22,16.21V14.67a2,2,0,0,0-1.36-1.9L12,10,3.36,12.77A2,2,0,0,0,2,14.67v1.55a.5.5,0,0,0,.65.47L12,14l9.35,2.69A.5.5,0,0,0,22,16.21Z" }),
                    react_1["default"].createElement("path", { d: "M13.75,9h.5a.25.25,0,0,0,.25-.25V5a1,1,0,0,0-1-1h-3a1,1,0,0,0-1,1V8.75A.25.25,0,0,0,9.75,9h.5L12,8Z" }),
                    react_1["default"].createElement("path", { d: "M12,16l-9.5,3.25a.5.5,0,0,0-.35.52.51.51,0,0,0,.56.45L12,19l9.29,1.22a.51.51,0,0,0,.56-.45.5.5,0,0,0-.35-.52Z" }))))));
};
exports["default"] = PlaneScrollSection;
