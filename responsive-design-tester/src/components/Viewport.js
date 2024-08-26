import React from "react";
import "./Viewport.css";

function Viewport({ width, height, websiteURL }) {
  return (
    <div
      className="viewport"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {websiteURL ? (
        <iframe
          src={websiteURL}
          title="Responsive Tester"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      ) : (
        <p>Your Content Here</p>
      )}
    </div>
  );
}

export default Viewport;
