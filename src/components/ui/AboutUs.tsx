const missionItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    ),
    text: "Support local automotive businesses and professionals",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    ),
    text: "Make auto repair accessible and stress-free",
  },
];

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-r from-blue-900 to-slate-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-6">About MechanicsMatch</h2>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              We're revolutionizing how car owners connect with trusted
              automotive professionals. Our platform makes it easy to find
              verified mechanics, compare services, and book appointments with
              confidence.
            </p>

            <div className="">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Join Our Network
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <div className="space-y-4">
                {missionItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-blue-100">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
