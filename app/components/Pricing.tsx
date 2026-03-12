import React from "react";

import { Button } from "./Button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "10 code explanations/day",
      "5 debug sessions/day",
      "Basic code generation",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    features: [
      "Unlimited explanations",
      "Unlimited debugging",
      "Advanced code generation",
      "Priority support",
      "Custom AI models",
    ],
    popular: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per user/month",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Shared code library",
      "Admin dashboard",
      "Dedicated support",
    ],
  },
];

export const Pricing = () => (
  <section id="pricing" className="w-full py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Simple Pricing
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Choose the plan that fits your needs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
              plan.popular
                ? "bg-linear-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50 scale-105 shadow-xl shadow-purple-500/20"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30"
            }`}
          >
            {plan.popular && (
              <div className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wide">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">
                {plan.price}
              </span>
              <span className="text-gray-400 ml-2">/ {plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? "primary" : "secondary"}
              className="w-full"
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
