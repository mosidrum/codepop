import React from "react";

const features = [
  {
    icon: "💡",
    title: "Explain Any Algorithm",
    description:
      "Paste a sorting algorithm, a dynamic programming solution, or any tricky snippet — get a clear, plain-English breakdown of exactly what it does and why.",
  },
  {
    icon: "🐛",
    title: "Debug in Seconds",
    description:
      "Stuck on a failing test case or a runtime error? Drop your code in and get a precise diagnosis with a fix, not just a guess.",
  },
  {
    icon: "⚡",
    title: "Solve Challenges Faster",
    description:
      "Working through HackerRank, LeetCode, or interview prep? Describe the problem and get a clean, working solution with an explanation.",
  },
];

export const FeatureGrid = () => (
  <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
        Everything you need to level up
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
