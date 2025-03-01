export default function AboutPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F3A522] to-[#FFC107]">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left Column - Mission */}
            <div>
              <h1 className="text-6xl font-bold text-[#1E1E1E]">
                Our
                <br />
                Mission
                </h1>
            <p className="mt-8 text-xl text-gray-800">
              Navigo is your trusted companion for exploring India safely and authentically. We're driven by our passion
              to make travel accessible, safe, and enriching for everyone.
            </p>
          </div>

          {/* Right Column - Vision, Goals, Values */}
          <div className="space-y-16">
            {/* Vision Section */}
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#1E1E1E]">Our Vision</h2>
              <p className="text-xl text-gray-800">
                We envision a world where travelers can experience the true essence of India without barriers, creating
                meaningful connections and unforgettable memories.
              </p>
            </div>  