import { useState } from "react";

export default function PDFViewer(props) {
  var [loading, setLoading] = useState(true);

  return (
    <div className="pdf-modal" onClick={props.onClose}>
      <div className="pdf-modal-content" onClick={function(e) { e.stopPropagation(); }}>
        <button className="pdf-close" onClick={props.onClose}>&times;</button>
        <div className="pdf-wrapper">
          {loading ? <div className="pdf-loading">Loading PDF...</div> : null}
          <iframe
            src={props.pdf + "#view=FitH"}
            className="pdf-iframe"
            title="PDF Viewer"
            onLoad={function() { setLoading(false); }}
          />
        </div>
      </div>
    </div>
  );
}
