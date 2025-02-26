"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function PlaneAnimation() {
    var planeRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var updatePlanePosition = function () {
            if (!planeRef.current)
                return;
            var scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            var translateX = (scrollPercent * window.innerWidth) / 100;
            planeRef.current.style.transform = "translateX(" + translateX + "px)";
        };
        window.addEventListener("scroll", updatePlanePosition);
        return function () { return window.removeEventListener("scroll", updatePlanePosition); };
    }, []);
    return (React.createElement("div", { className: "relative h-[42px] w-full overflow-hidden" },
        React.createElement("div", { className: "absolute left-0 top-1/2 h-[1px] w-full bg-gray-300" }),
        React.createElement("div", { ref: planeRef, className: "absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-100" },
            React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { d: "M22 12L3 20L5 12L3 4L22 12Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })))));
}
exports["default"] = PlaneAnimation;
