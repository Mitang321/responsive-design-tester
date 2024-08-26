import React, { useState } from "react";
import Header from "./components/Header";
import Viewport from "./components/Viewport";
import Controls from "./components/Controls";
import "./App.css";

function App() {
  const [width, setWidth] = useState(375);
  const [height, setHeight] = useState(667);
  const [websiteURL, setWebsiteURL] = useState("");

  const setViewportSize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <div className="App">
      <Header />
      <Controls
        setViewportSize={setViewportSize}
        setWebsiteURL={setWebsiteURL}
      />
      <Viewport width={width} height={height} websiteURL={websiteURL} />
    </div>
  );
}

export default App;
