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
            // Increased scroll speed by multiplying scrollPercent
            var scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 250;
            var translateX = (scrollPercent * window.innerWidth) / 100;
            planeRef.current.style.transform = "translateX(" + translateX + "px)";
        };
        window.addEventListener("scroll", updatePlanePosition);
        return function () { return window.removeEventListener("scroll", updatePlanePosition); };
    }, []);
    return (React.createElement("div", { className: "relative h-[42px] w-full overflow-hidden" },
        React.createElement("div", { className: "absolute left-0 top-1/2 h-[2px] w-full", style: {
                background: "repeating-linear-gradient(to right, #333 0, #333 15px, transparent 15px, transparent 25px)"
            } }),
        React.createElement("div", { ref: planeRef, className: "absolute left-0 top-1/2 -translate-y-[60%] transition-transform duration-75" },
            React.createElement("img", { src: "/images/frontend/web/public/images/plane.jpg", alt: "Plane", className: "w-6 h-6" }))));
}
exports["default"] = PlaneAnimation;
