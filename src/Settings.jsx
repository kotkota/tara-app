import React, { useState, useEffect } from "react";
import { getLocation } from "./TaraUtils";
import SelectNakshatra from "./SelectNakshatra";
import { ReactComponent as LocationIcon } from "./icons/location.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { ReactComponent as Logo } from "./icons/tara_logo.svg";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Switch,
  Select,
  Typography,
} from "@mui/joy";

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const [location, setLocation] = useState(() => getLocation());

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
        <Logo fill="darkseagreen" width="120" style={{ marginLeft: 1 }} />
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
          invertedColors
          size="md"
          sx={(theme) => ({
            py: 0,
            boxShadow: theme.shadow.xs,
            backgroundColor: "darkslategray",
          })}
        >
          <ModalClose
            size="lg"
            sx={{ m: 0, top: -8, color: "darkseagreen" }}
            color="transparent"
          />
          <Box display="flex" flexDirection="column" gap={2}>
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
                  onClick={updateLocation}
                >
                  <LocationIcon fill="darkseagreen" />
                </IconButton>
              </Box>
              <Box display="flex" gap={2}>
                <Typography level="body3" flexGrow={1}>
                  Широта: {location.latitude}
                </Typography>
                <Typography level="body3" flexGrow={1}>
                  Долгота: {location.longitude}
                </Typography>
              </Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}