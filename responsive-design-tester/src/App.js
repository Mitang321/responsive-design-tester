import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Viewport from "./components/Viewport";
import Controls from "./components/Controls";
import "./App.css";

function App() {
  const [width, setWidth] = useState(375);
  const [height, setHeight] = useState(667);
  const [websiteURL, setWebsiteURL] = useState("");
  const [deviceProfiles, setDeviceProfiles] = useState([]);

  useEffect(() => {
    const savedProfiles =
      JSON.parse(localStorage.getItem("deviceProfiles")) || [];
    setDeviceProfiles(savedProfiles);
  }, []);

  useEffect(() => {
    localStorage.setItem("deviceProfiles", JSON.stringify(deviceProfiles));
  }, [deviceProfiles]);

  const setViewportSize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const addDeviceProfile = (name, width, height) => {
    setDeviceProfiles([
      ...deviceProfiles,
      { name, width: Number(width), height: Number(height) },
    ]);
  };

  const deleteDeviceProfile = (name) => {
    setDeviceProfiles(
      deviceProfiles.filter((profile) => profile.name !== name)
    );
  };

  return (
    <div className="App">
      <Header />
      <Controls
        setViewportSize={setViewportSize}
        setWebsiteURL={setWebsiteURL}
        deviceProfiles={deviceProfiles}
        addDeviceProfile={addDeviceProfile}
        deleteDeviceProfile={deleteDeviceProfile}
      />
      <Viewport width={width} height={height} websiteURL={websiteURL} />
    </div>
  );
}

export default App;
