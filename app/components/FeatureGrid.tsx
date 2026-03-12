import React from "react";

const features = [
  {
    icon: "💡",
    title: "Code Explanation",
    description:
      "Understand complex code instantly with AI-powered explanations in plain English",
  },
  {
    icon: "🐛",
    title: "Smart Debugging",
    description:
      "Find and fix bugs faster with intelligent error analysis and solutions",
  },
  {
    icon: "⚡",
    title: "Code Generation",
    description:
      "Generate production-ready code from natural language descriptions",
  },
];

export const FeatureGrid = () => (
  <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Powerful Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
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
