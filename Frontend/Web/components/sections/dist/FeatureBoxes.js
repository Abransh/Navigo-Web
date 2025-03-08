"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var FeatureBoxMobile_1 = require("@/components/sections/FeatureBoxMobile");
var use_mobile_1 = require("@/hooks/use-mobile");
var FeaturesSection = function () {
    var isMobile = use_mobile_1.useMobile();
    var sectionRefs = react_1.useRef([]);
    react_1.useEffect(function () {
        var observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        };
        var handleIntersect = function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("opacity-100", "translate-y-0");
                    entry.target.classList.remove("opacity-0", "translate-y-20");
                }
                else {
                    // Only add the fade out effect if the element has moved above the viewport
                    if (entry.boundingClientRect.y < 0) {
                        entry.target.classList.add("opacity-0");
                        entry.target.classList.remove("opacity-100");
                    }
                }
            });
        };
        var observer = new IntersectionObserver(handleIntersect, observerOptions);
        sectionRefs.current.forEach(function (section) {
            if (section)
                observer.observe(section);
        });
        return function () {
            sectionRefs.current.forEach(function (section) {
                if (section)
                    observer.unobserve(section);
            });
        };
    }, []);
    // If mobile, render the mobile version
    if (isMobile) {
        return React.createElement(FeatureBoxMobile_1["default"], null);
    }
    // Desktop version
    var featureBoxes = [
        {
            title: "Enhanced Safety & Specialized safety for Women",
            description: "Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It's overwhelming, time-consuming, and many aren't even in English. We simplify it by bringing you local apps in English.",
            leftImage: "/images/QrBarBoxes.jpg",
            rightImage: "/images/featuresbox1.jpg"
        },
        {
            title: "Protection from Tourist Inflation",
            description: "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
            leftImage: "/images/QrBarBoxes.jpg",
            rightImage: "/images/featuresbox2.jpg"
        },
        {
            title: "Seamless Communication",
            description: "With our Companions you would be easily able to communicate with the other people. Our Companions speak English.",
            leftImage: "/images/QrBarBoxes.jpg",
            rightImage: "/images/Featuresbox3.jpg"
        },
        {
            title: "TRAVEL APPS!!",
            description: "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
            leftImage: "/images/QrBarBoxes.jpg",
            rightImage: "/images/feature-image-4-right.jpg"
        },
    ];
    return (React.createElement("div", { className: "relative" }, featureBoxes.map(function (feature, index) { return (React.createElement("section", { key: index, ref: function (el) {
            sectionRefs.current[index] = el;
        }, className: "py-8 opacity-0 translate-y-20 transition-all duration-700 sticky", style: { top: "14vh" } },
        React.createElement("div", { className: "max-w-7xl mx-auto flex" },
            React.createElement("div", { className: "w-[700px] h-[330px] rounded-2xl bg-[#ECEBE9] p-6 flex flex-col justify-center" },
                React.createElement("h3", { className: "text-[36px] font mb-6 font-Poppins-400 " }, feature.title),
                React.createElement("p", { className: "text-base text-[25px] leading-[32px] font-Poppins protext-[#192328]" }, feature.description)),
            React.createElement("div", { className: "w-[100px] h-[330px] rounded-2xl mx-1 overflow-hidden" },
                React.createElement("div", { className: "w-full h-full relative" },
                    React.createElement(image_1["default"], { src: feature.leftImage || "/placeholder.svg", alt: "Feature " + (index + 1), fill: true, className: "object-cover" }))),
            React.createElement("div", { className: "w-[580px] h-[330px] rounded-2xl overflow-hidden" },
                React.createElement("div", { className: "w-full h-full relative" },
                    React.createElement(image_1["default"], { src: feature.rightImage || "/placeholder.svg", alt: "Feature " + (index + 1), fill: true, className: "object-cover" })))))); })));
};
