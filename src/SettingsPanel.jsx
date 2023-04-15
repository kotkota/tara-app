import React, { useState, useEffect } from "react";

export default function SettingsPanel() {
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("location")) || null
  );

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          localStorage.setItem(
            "location",
            JSON.stringify({ latitude, longitude })
          );
        },
        (error) => console.log(error)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h3>Geolocation Component</h3>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <button onClick={getLocation}>Update</button>
        </div>
      ) : (
        <button onClick={getLocation}>Get Location</button>
      )}
    </div>
  );
}
