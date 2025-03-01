"use strict";
exports.__esModule = true;
function AboutPage() {
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-[#F3A522] to-[#FFC107]" },
        React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-24" },
            React.createElement("div", { className: "grid gap-16 lg:grid-cols-2" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-6xl font-bold text-[#1E1E1E]" },
                        "Our",
                        React.createElement("br", null),
                        "Mission"),
                    React.createElement("p", { className: "mt-8 text-xl text-gray-800" }, "Navigo is your trusted companion for exploring India safely and authentically. We're driven by our passion to make travel accessible, safe, and enriching for everyone.")),
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
