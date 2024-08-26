import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./Viewport.css";

function Viewport({ width, height, websiteURL }) {
  const [loading, setLoading] = useState(true);
  const viewportRef = useRef(null);

  const handleLoad = () => {
    setLoading(false);
  };

  const captureScreenshot = () => {
    if (!viewportRef.current) {
      console.error("Viewport reference not found");
      return;
    }

    html2canvas(viewportRef.current, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#fff",
      scale: window.devicePixelRatio,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "screenshot.png";
        link.click();
      })
      .catch((error) => {
        console.error("Screenshot capture failed:", error);
      });
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
      <button
        onClick={captureScreenshot}
        className="screenshot-button"
        disabled={loading}
      >
        Capture Screenshot
      </button>
    </div>
  );
}

export default Viewport;
