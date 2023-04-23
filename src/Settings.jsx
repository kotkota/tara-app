import React, { useState } from "react";
import SelectNakshatra from "./SelectNakshatra";
import { ReactComponent as LocationIcon } from "./icons/location.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { ReactComponent as Logo } from "./icons/tara_logo.svg";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Switch,
  Typography,
} from "@mui/joy";

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 1,
          px: 1,
        }}
      >
        <Logo fill="darkseagreen" width="120" />
        <IconButton
          variant="plain"
          sx={{ m: 0 }}
          onClick={() => setIsOpen(true)}
          color="transparent"
        >
          <SettingsIcon fill="darkseagreen" />
        </IconButton>
      </Box>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalDialog
          layout="fullscreen"
          variant="solid"
          size="md"
          sx={(theme) => ({
            py: 0,
            // boxShadow: theme.shadow.xs,
            backgroundColor: "darkslategray",
          })}
        >
          <ModalClose
            size="lg"
            sx={{ m: 0, top: -8, color: "darkseagreen", zIndex: 1 }}
            color="transparent"
          />
          <Sheet
            variant="solid"
            invertedColors
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "transparent",
            }}
          >
            <Typography component="h3" textColor="darkseagreen">
              Настройки
            </Typography>
            <Divider inset="none" color="primary" />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="h6">Tara Pro</Typography>
              <Switch
                checked={true}
                color="neutral"
                disabled={true}
                size="md"
                variant="soft"
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="h6">Накшатра Луны</Typography>
              <SelectNakshatra />
            </Box>
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
          </Sheet>
        </ModalDialog>
      </Modal>
    </>
  );
}
