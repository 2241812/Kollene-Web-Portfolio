import { useState } from "react";
import { academicWorks } from "../data/content";
import PDFViewer from "./PDFViewer";

export default function Projects() {
  var [viewerPdf, setViewerPdf] = useState(null);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Academic Work</h2>
        <p className="section-subtitle">
          Selected essays, research papers, and reflective writing from my
          architecture studies at Map&uacute;a University. Click a card to view the full document.
        </p>

        <div className="academic-grid">
          {academicWorks.map(function(work) {
            return (
              <div key={work.id} className="academic-card" onClick={function() { setViewerPdf(work.pdf); }}>
                <div className="academic-card-bg">
                  <img src={work.preview} alt={work.title} loading="lazy" />
                </div>
                <div className="academic-card-overlay">
                  <div className="academic-card-meta">
                    <span className="academic-type">{work.category}</span>
                    {work.date ? <span className="academic-date">{work.date}</span> : null}
                  </div>
                  <h3 className="academic-card-title">{work.title}</h3>
                  <p className="academic-card-desc">{work.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {viewerPdf ? <PDFViewer pdf={viewerPdf} onClose={function() { setViewerPdf(null); }} /> : null}
    </section>
  );
}
