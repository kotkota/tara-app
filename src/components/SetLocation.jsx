import React, { useState, useContext } from "react";
import { Box, Typography, IconButton } from "@mui/joy";
import { ReactComponent as LocationIcon } from "../assets/icons/location.svg";

import { AppContext } from "./AppContext";

export default function SetLocation() {
  const [location, setLocation] = useState(() => getStoredLocation());

  function getStoredLocation() {
    if (localStorage.getItem("location")) {
      console.log("getLoc returned storage");
      return JSON.parse(localStorage.getItem("location"));
    } else {
      console.log("getLoc failed");
    }
  }

  function updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let coords = {};
          coords.latitude = position.coords.latitude.toFixed(2);
          coords.longitude = position.coords.longitude.toFixed(2);
          localStorage.setItem("location", JSON.stringify(coords));
          setLocation(coords);
        },
        (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
        {
          enableHighAccuracy: false,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography component="h6">Текущее местоположение</Typography>
        <IconButton
          variant="plain"
          sx={{ m: 0 }}
          onClick={() => updateLocation()}
        >
          <LocationIcon fill="darkseagreen" />
        </IconButton>
      </Box>
      <Box display="flex" gap={2}>
        <Typography level="body3" flexGrow={1}>
          Широта: {location?.latitude}
        </Typography>
        <Typography level="body3" flexGrow={1}>
          Долгота: {location?.longitude}
        </Typography>
      </Box>
    </Box>
  );
}
