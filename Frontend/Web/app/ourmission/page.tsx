import Header from "@/components/Header";

export default function AboutPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f2dcb6] to-[#f3e2b0]">
        <div className="relative z-10 pt-8">
        <Header />
      </div>
        <div className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-8xl font-Montserrat font mb-2">Our Mission</h2>
        <p className="text-6xl text-black mb-12"> Your Gateway to The Experience<br></br><br></br></p>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left Column - Mission */}
            <div>
              <h1 className="text-5xl font-bold text-[#1E1E1E]">
                Why Us?
                <br />
               
                </h1>
            <p className="mt-10 text-xl text-gray-800">
            At Navigo, our mission is to revolutionize the travel experience by seamlessly connecting international explorers with trusted, knowledgeable local
             companions. We empower travelers to break down language barriers,
            navigate unfamiliar environments, and immerse themselves in authentic cultural experiences—all while ensuring safety and convenience.
            By leveraging innovative technology and a passionate network of local experts, we strive to transform every journey into a meaningful, enriching adventure that bridges cultural divides and fosters lasting connections.
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

            {/* Goals Section */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#1E1E1E]">Our Goals</h2>
              <ul className="space-y-4">
                {[
                  "Ensure safe and authentic travel experiences",
                  "Bridge cultural and language gaps",
                  "Empower local communities through tourism",
                  "Make Indian travel accessible to everyone",
                ].map((goal, index) => (
                  <li key={index} className="text-xl text-gray-800">
                    • {goal}
                  </li>
                ))}
              </ul>
            </div>
                {/* Values Section */}

            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#1E1E1E]">Our Values</h2>
              <ul className="space-y-4">
                {["Safety First", "Cultural Authenticity", "Community Connection", "Innovation"].map((value, index) => (
                  <li key={index} className="text-xl text-gray-800">
                    • {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}