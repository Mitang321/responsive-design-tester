import React, { useState } from "react";
import "./Controls.css";

function Controls({ setViewportSize, setWebsiteURL }) {
  const [url, setUrl] = useState("");

  const handleLoadWebsite = () => {
    setWebsiteURL(url);
  };

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="url-input"
      />
      <button onClick={handleLoadWebsite}>Load Website</button>
      <button onClick={() => setViewportSize(375, 667)}>Mobile</button>
      <button onClick={() => setViewportSize(768, 1024)}>Tablet</button>
      <button onClick={() => setViewportSize(1440, 900)}>Desktop</button>
    </div>
  );
}

export default Controls;
