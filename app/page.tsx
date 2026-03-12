import { FeatureGrid, Footer, Header, Pricing } from "./components";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 bg-[linear-gradient(135deg,#7c3aed_0%,#1e3a8a_33%,#000000_66%,#064e3b_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.2),transparent,transparent)]" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-black/30" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <FeatureGrid />
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  );
}
