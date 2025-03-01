"use strict";
exports.__esModule = true;
var Header_1 = require("@/components/layout/Header");
function AboutPage() {
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-[#f2dcb6] to-[#f3e2b0]" },
        React.createElement("div", { className: "relative z-10 pt-8" },
            React.createElement(Header_1["default"], null)),
        React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-24" },
            React.createElement("h2", { className: "text-8xl font-Montserrat font mb-2" }, "Our Mission"),
            React.createElement("p", { className: "text-6xl text-black mb-12" },
                " Your Gateway to The Experience",
                React.createElement("br", null),
                React.createElement("br", null)),
            React.createElement("div", { className: "grid gap-16 lg:grid-cols-2" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-5xl font-bold text-[#1E1E1E]" },
                        "Why Us?",
                        React.createElement("br", null)),
                    React.createElement("p", { className: "mt-10 text-xl text-gray-800" }, "At Navigo, our mission is to revolutionize the travel experience by seamlessly connecting international explorers with trusted, knowledgeable local companions. We empower travelers to break down language barriers, navigate unfamiliar environments, and immerse themselves in authentic cultural experiences\u2014all while ensuring safety and convenience. By leveraging innovative technology and a passionate network of local experts, we strive to transform every journey into a meaningful, enriching adventure that bridges cultural divides and fosters lasting connections.")),
                React.createElement("div", { className: "space-y-16" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "mb-4 text-3xl font-bold text-[#1E1E1E]" }, "Our Vision"),
                        React.createElement("p", { className: "text-xl text-gray-800" }, "We envision a world where travelers can experience the true essence of India without barriers, creating meaningful connections and unforgettable memories.")),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "mb-6 text-3xl font-bold text-[#1E1E1E]" }, "Our Goals"),
                        React.createElement("ul", { className: "space-y-4" }, [
                            "Ensure safe and authentic travel experiences",
                            "Bridge cultural and language gaps",
                            "Empower local communities through tourism",
                            "Make Indian travel accessible to everyone",
                        ].map(function (goal, index) { return (React.createElement("li", { key: index, className: "text-xl text-gray-800" },
                            "\u2022 ",
                            goal)); }))),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "mb-6 text-3xl font-bold text-[#1E1E1E]" }, "Our Values"),
                        React.createElement("ul", { className: "space-y-4" }, ["Safety First", "Cultural Authenticity", "Community Connection", "Innovation"].map(function (value, index) { return (React.createElement("li", { key: index, className: "text-xl text-gray-800" },
                            "\u2022 ",
                            value)); }))))))));
}
exports["default"] = AboutPage;
