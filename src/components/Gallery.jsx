import { useState } from "react";
import { getGalleryGroups } from "../data/content";
import PDFViewer from "./PDFViewer";

export default function Gallery() {
  var [selectedImg, setSelectedImg] = useState(null);
  var [viewerPdf, setViewerPdf] = useState(null);
  var groups = getGalleryGroups();
  var groupKeys = Object.keys(groups);

  var allItems = [];
  for (var g = 0; g < groupKeys.length; g++) {
    var cat = groupKeys[g];
    var items = groups[cat];
    for (var i = 0; i < items.length; i++) {
      allItems.push({ item: items[i], category: cat });
    }
  }

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">
          Design plates, spot essays, academic papers, and reflections.
        </p>

        <div className="gallery-flat-grid">
          {allItems.map(function(entry) {
            var item = entry.item;
            var cat = entry.category;
            if (item.type === "image") {
              return (
                <div key={item.id} className="gallery-card" onClick={function() { setSelectedImg(item); }}>
                  <div className="gallery-card-img">
                    <img src={item.src} alt={item.title} loading="lazy" />
                  </div>
                  <div className="gallery-card-body">
                    <span className="gallery-card-badge">{cat}</span>
                    <span className="gallery-card-title">{item.title}</span>
                  </div>
                </div>
              );
            }
            return (
              <div key={item.id} className="gallery-card" onClick={function() { setViewerPdf(item.pdf); }}>
                <div className="gallery-card-img">
                  <img src={item.preview} alt={item.title} loading="lazy" />
                  <div className="gallery-card-pdf-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                </div>
                <div className="gallery-card-body">
                  <span className="gallery-card-badge">{cat}</span>
                  <span className="gallery-card-title">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedImg ? (
        <div className="gallery-modal" onClick={function() { setSelectedImg(null); }}>
          <div className="gallery-modal-content" onClick={function(e) { e.stopPropagation(); }}>
            <button className="gallery-close" onClick={function() { setSelectedImg(null); }}>&times;</button>
            <img src={selectedImg.src} alt={selectedImg.title} />
            <p className="gallery-caption">{selectedImg.title}</p>
          </div>
        </div>
      ) : null}

      {viewerPdf ? <PDFViewer pdf={viewerPdf} onClose={function() { setViewerPdf(null); }} /> : null}
    </section>
  );
}
