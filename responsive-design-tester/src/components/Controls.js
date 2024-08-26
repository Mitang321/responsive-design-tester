import React, { useState, useEffect } from "react";
import "./Controls.css";

function Controls({
  setViewportSize,
  setWebsiteURL,
  deviceProfiles,
  addDeviceProfile,
  deleteDeviceProfile,
  updateDeviceProfile,
  editingProfile,
  setEditingProfile,
}) {
  const [url, setUrl] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileWidth, setProfileWidth] = useState("");
  const [profileHeight, setProfileHeight] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState("");

  useEffect(() => {
    if (editingProfile) {
      const profile = deviceProfiles.find((p) => p.name === editingProfile);
      if (profile) {
        setProfileName(profile.name);
        setProfileWidth(profile.width);
        setProfileHeight(profile.height);
      }
    } else {
      setProfileName("");
      setProfileWidth("");
      setProfileHeight("");
    }
  }, [editingProfile, deviceProfiles]);

  const handleLoadWebsite = () => {
    setWebsiteURL(url);
  };

  const handleAddProfile = () => {
    if (!profileName || !profileWidth || !profileHeight) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(profileWidth) || isNaN(profileHeight)) {
      setError("Width and Height must be numbers.");
      return;
    }

    setError("");

    if (editingProfile) {
      updateDeviceProfile(
        editingProfile,
        profileName,
        profileWidth,
        profileHeight
      );
    } else {
      addDeviceProfile(profileName, profileWidth, profileHeight);
    }

    setProfileName("");
    setProfileWidth("");
    setProfileHeight("");
    setEditingProfile(null);
  };

  const handleEditProfile = (name) => {
    setEditingProfile(name);
  };

  const openDeleteModal = (name) => {
    setProfileToDelete(name);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteDeviceProfile(profileToDelete);
    setShowModal(false);
    setProfileToDelete("");
  };

  const cancelDelete = () => {
    setShowModal(false);
    setProfileToDelete("");
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

      <h3>
        {editingProfile ? "Edit Device Profile" : "Custom Device Profiles"}
      </h3>
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
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul className="profile-list">
        {deviceProfiles.map((profile) => (
          <li key={profile.name}>
            <button
              onClick={() => setViewportSize(profile.width, profile.height)}
            >
              {profile.name} ({profile.width}x{profile.height})
            </button>
            <button onClick={() => handleEditProfile(profile.name)}>
              Edit
            </button>
            <button onClick={() => openDeleteModal(profile.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
              <button onClick={cancelDelete} className="close-button">
                X
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete the profile "{profileToDelete}"?
              </p>
            </div>
            <div className="modal-footer">
              <button onClick={cancelDelete}>Cancel</button>
              <button onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Controls;
