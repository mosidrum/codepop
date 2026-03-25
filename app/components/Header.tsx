import { Button } from "./Button";
import { Logo } from "./Logo";

export const Header = () => (
  <header className="w-full">
    <nav className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
          >
            Pricing
          </a>
          <Button size="md">Sign In</Button>
        </div>
      </div>
    </nav>

    <div className="w-full py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-linear-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Crack Code. Fast.
        </h1>
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Built for engineers who want to move fast. Paste any code, algorithm, or challenge — get instant explanations, debug help, and working solutions.
        </p>
        <Button
          size="lg"
          className="font-semibold hover:shadow-2xl"
          href="/code"
        >
          Start Coding
        </Button>
      </div>
    </div>
  </header>
);
