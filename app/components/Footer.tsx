import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © 2026 Code Pop. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
