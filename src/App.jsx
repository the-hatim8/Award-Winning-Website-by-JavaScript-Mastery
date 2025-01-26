import About from "./Components/About";
import Hero from "./Components/Hero";
import NavBar from "./Components/Narbar";
import Features from "./Components/Features";
import Story from "./Components/Story";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
