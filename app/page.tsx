import { FeatureGrid, Footer, Header, Pricing } from "./components";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FeatureGrid />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
