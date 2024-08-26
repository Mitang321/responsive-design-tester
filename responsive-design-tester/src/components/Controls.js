import React, { useState } from "react";
import "./Controls.css";

function Controls({
  setViewportSize,
  setWebsiteURL,
  deviceProfiles,
  addDeviceProfile,
  deleteDeviceProfile,
  updateDeviceProfile,
}) {
  const [url, setUrl] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileWidth, setProfileWidth] = useState("");
  const [profileHeight, setProfileHeight] = useState("");
  const [editingProfile, setEditingProfile] = useState(null);

  const handleLoadWebsite = () => {
    setWebsiteURL(url);
  };

  const handleAddProfile = () => {
    if (profileName && profileWidth && profileHeight) {
      if (editingProfile) {
        updateDeviceProfile(
          editingProfile,
          profileName,
          profileWidth,
          profileHeight
        );
        setEditingProfile(null);
      } else {
        addDeviceProfile(profileName, profileWidth, profileHeight);
      }
      setProfileName("");
      setProfileWidth("");
      setProfileHeight("");
    }
  };

  const handleEditProfile = (profile) => {
    setProfileName(profile.name);
    setProfileWidth(profile.width);
    setProfileHeight(profile.height);
    setEditingProfile(profile.name);
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

      <h3>Custom Device Profiles</h3>
      <div className="profile-form">
        <input
          type="text"
          placeholder="Profile Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Width (px)"
          value={profileWidth}
          onChange={(e) => setProfileWidth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (px)"
          value={profileHeight}
          onChange={(e) => setProfileHeight(e.target.value)}
        />
        <button onClick={handleAddProfile}>
          {editingProfile ? "Update Profile" : "Add Profile"}
        </button>
      </div>

      <ul className="profile-list">
        {deviceProfiles.map((profile) => (
          <li key={profile.name}>
            <button
              onClick={() => setViewportSize(profile.width, profile.height)}
            >
              {profile.name} ({profile.width}x{profile.height})
            </button>
            <button onClick={() => handleEditProfile(profile)}>Edit</button>
            <button onClick={() => deleteDeviceProfile(profile.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Controls;
