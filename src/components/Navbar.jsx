import { useState, useEffect } from "react";

var sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function Navbar(props) {
  var [active, setActive] = useState("hero");
  var [scrolled, setScrolled] = useState(false);

  useEffect(function() {
    var lenis = props.lenis ? props.lenis.current : null;

    function handleScroll(e) {
      setScrolled(e.scroll > 60);
      var scrollPos = e.scroll + 120;
      var current = "hero";
      for (var i = 0; i < sections.length; i++) {
        var el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) current = sections[i].id;
      }
      setActive(current);
    }

    if (lenis) {
      lenis.on("scroll", handleScroll);
      return function() { lenis.off("scroll", handleScroll); };
    }

    function fallbackScroll() {
      setScrolled(window.scrollY > 60);
      var scrollPos = window.scrollY + 120;
      var current = "hero";
      for (var i = 0; i < sections.length; i++) {
        var el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) current = sections[i].id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", fallbackScroll, { passive: true });
    return function() { window.removeEventListener("scroll", fallbackScroll); };
  }, [props.lenis]);

  function scrollTo(id) {
    var lenis = props.lenis ? props.lenis.current : null;
    if (lenis) {
      lenis.scrollTo("#" + id, { offset: -80, duration: 1.4 });
    } else {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  var isHero = active === "hero";
  var navClass = "navbar";
  if (scrolled) navClass += " scrolled";
  if (isHero) navClass += " hero-theme";

  return (
    <nav className={navClass}>
      <div className="nav-inner">
        <span className="nav-logo" onClick={function() { scrollTo("hero"); }}>
          Kollene Aika
          <span className="nav-logo-sub">Architecture Portfolio</span>
        </span>
        <div className="nav-links">
          {sections.map(function(s) {
            return (
              <button
                key={s.id}
                className={"nav-link" + (active === s.id ? " active" : "")}
                onClick={function() { scrollTo(s.id); }}
              >
                {s.label}
                <span className="nav-indicator" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
