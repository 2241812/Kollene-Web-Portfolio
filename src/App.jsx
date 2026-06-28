import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  var lenisRef = useRef(null);

  useEffect(function() {
    var lenis = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: "vertical",
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return function() { lenis.destroy(); };
  }, []);

  return (
    <>
      <Navbar lenis={lenisRef} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}

export default App;
