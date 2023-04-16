import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/joy";

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("location")) || {}
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
        (err) => console.warn(`ERROR(${err.code}): ${err.message}`)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          width: 1,
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
          variant="plain"
          size="md"
          sx={(theme) => ({ boxShadow: theme.shadow.xs })}
        >
          <ModalClose size="lg" sx={{ m: 0 }} color="transparent" />
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography component="h3" textColor="#0F5D26">
              Настройки
            </Typography>
            <Divider inset="none" />
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
            <Box display="flex" flexDirection="column" gap={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Typography component="h6">Текущее местоположение</Typography>
                <IconButton variant="plain" sx={{ m: 0 }} onClick={getLocation}>
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
              {/* <Button variant="soft" onClick={getLocation} sx={{ mt: 0.5 }} color="primary" >
              Обновить
            </Button> */}
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
