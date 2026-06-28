import { profile } from "../data/content";
import ThreeBackground from "./ThreeBackground";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <ThreeBackground />
      <div className="hero-content">
        <p className="hero-subtitle">Map&uacute;a University &middot; BS Architecture</p>
        <h1 className="hero-title">{profile.name}</h1>
        <p className="hero-description">{profile.title}</p>
        <blockquote className="hero-quote">
          <p>"{profile.quote.text}"</p>
          <cite>&mdash; {profile.quote.author}</cite>
        </blockquote>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={function() { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
            View My Work
          </button>
          <button className="btn btn-outline" onClick={function() { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Get in Touch
          </button>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
