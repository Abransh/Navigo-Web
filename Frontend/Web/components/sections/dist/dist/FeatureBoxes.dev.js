// frontend/web/components/sections/FeatureBoxes.tsx
"use client";
"use strict";

var _react = require("react");

var _image = _interopRequireDefault(require("next/image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.__esModule = true;

var FeatureBoxes = function FeatureBoxes() {
  var featureBoxes = [{
    title: 'Enhanced Safety & Specialized safety for Women',
    description: 'Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It\'s overwhelming, time-consuming, and many aren\'t even in English. We simplify it by bringing you local apps in English.',
    leftImage: '/images/feature-image-1-left.jpg',
    rightImage: '/images/feature-image-1-right.jpg'
  }, {
    title: 'Protection from Tourist Inflation',
    description: 'With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.',
    leftImage: '/images/feature-image-2-left.jpg',
    rightImage: '/images/feature-image-2-right.jpg'
  }, {
    title: 'Enhanced Safety & Specialized safety for Women',
    description: 'Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It\'s overwhelming, time-consuming, and many aren\'t even in English. We simplify it by bringing you local apps in English.',
    leftImage: '/images/feature-image-3-left.jpg',
    rightImage: '/images/feature-image-3-right.jpg'
  }, {
    title: 'Enhanced Safety & Specialized safety for Women',
    description: 'Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It\'s overwhelming, time-consuming, and many aren\'t even in English. We simplify it by bringing you local apps in English.',
    leftImage: '/images/feature-image-4-left.jpg',
    rightImage: '/images/feature-image-4-right.jpg'
  }];
  var sectionRefs = react_1.useRef([]);
  react_1.useEffect(function () {
    var observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    var handleIntersect = function handleIntersect(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-20');
        } else {
          // Only add the fade out effect if the element has moved above the viewport
          if (entry.boundingClientRect.y < 0) {
            entry.target.classList.add('opacity-0');
            entry.target.classList.remove('opacity-100');
          }
        }
      });
    };

    var observer = new IntersectionObserver(handleIntersect, observerOptions);
    sectionRefs.current.forEach(function (section) {
      if (section) observer.observe(section);
    });
    return function () {
      sectionRefs.current.forEach(function (section) {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  return react_1["default"].createElement("div", {
    className: "relative"
  }, featureBoxes.map(function (feature, index) {
    return react_1["default"].createElement("section", {
      key: index,
      ref: function ref(el) {
        sectionRefs.current[index] = el;
      },
      className: "py-8 opacity-0 translate-y-20 transition-all duration-700 sticky",
      style: {
        top: '24vh'
      }
    }, react_1["default"].createElement("div", {
      className: "max-w-6xl mx-auto flex"
    }, react_1["default"].createElement("div", {
      className: "w-[529px] h-[243px] rounded-2xl bg-[#ECEBE9] p-6 flex flex-col justify-center"
    }, react_1["default"].createElement("h3", {
      className: "text-[28px] font-bold mb-4"
    }, feature.title), react_1["default"].createElement("p", {
      className: "text-base"
    }, feature.description)), react_1["default"].createElement("div", {
      className: "w-[81px] h-[243px] rounded-2xl mx-1 overflow-hidden"
    }, react_1["default"].createElement("div", {
      className: "w-full h-full relative"
    }, react_1["default"].createElement(_image["default"]["default"], {
      src: feature.leftImage,
      alt: "Feature " + (index + 1),
      fill: true,
      className: "object-cover"
    }))), react_1["default"].createElement("div", {
      className: "w-[448px] h-[243px] rounded-2xl overflow-hidden"
    }, react_1["default"].createElement("div", {
      className: "w-full h-full relative"
    }, react_1["default"].createElement(_image["default"]["default"], {
      src: feature.rightImage,
      alt: "Feature " + (index + 1),
      fill: true,
      className: "object-cover"
    })))));
  }));
};

exports["default"] = FeatureBoxes;