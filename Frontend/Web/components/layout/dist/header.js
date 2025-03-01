"use strict";
exports.__esModule = true;
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
            return (react_1["default"].createElement("div", null));
            export default Header;
        };
    });
};
