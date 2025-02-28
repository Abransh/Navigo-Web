"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
function PlaneAnimation() {
    var planeRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var updatePlanePosition = function () {
            if (!planeRef.current)
                return;
            var scrollPercent = (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
                150;
            var translateX = (scrollPercent * window.innerWidth) / 100;
            planeRef.current.style.transform = "translateX(" + translateX + "px)";
        };
        window.addEventListener("scroll", updatePlanePosition);
        return function () {
            return window.removeEventListener("scroll", updatePlanePosition);
        };
    }, []);
    return (React.createElement("div", { className: "relative h-[42px] w-full overflow-hidden" },
        React.createElement("div", { className: "absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2", style: {
                background: "repeating-linear-gradient(to right, #333 0, #333 15px, transparent 15px, transparent 25px)"
            } }),
        React.createElement("div", { ref: planeRef, className: "absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-75" },
            React.createElement(image_1["default"], { src: "/images/frontend/web/public/images/plane.jpg", alt: "Plane", width: 24, height: 24, className: "-translate-y-[11px]" // Adjust this value to fine-tune vertical position
             }))));
}
exports["default"] = PlaneAnimation;
