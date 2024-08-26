import React, { useRef, useState } from "react";
import "./Viewport.css";

function Viewport({ width, height, websiteURL }) {
  const [loading, setLoading] = useState(true);
  const viewportRef = useRef(null);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="viewport-container">
      <div
        className="viewport"
        ref={viewportRef}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {loading && <div className="loading-spinner">Loading...</div>}
        <iframe
          src={websiteURL}
          title="Responsive Tester"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          onLoad={handleLoad}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Viewport;
