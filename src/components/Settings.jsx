import React, { useState } from "react";
import SelectNakshatra from "./SelectNakshatra";
import SelectSex from "./SelectSex";
import { AppContext } from "./AppContext";

import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as Logo } from "../assets/tara_logo.svg";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        className="tara-header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 1,
          px: 1,
        }}
      >
        <Logo fill="darkseagreen" width="120" style={{ marginLeft: "-8px" }} />
        <IconButton
          aria-label="Открыть настройки"
          variant="plain"
          sx={{ m: 0 }}
          onClick={() => setIsOpen(true)}
          color="transparent"
        >
          <SettingsIcon fill="darkseagreen" />
        </IconButton>
      </Box>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="tara-settings"
      >
        <ModalDialog
          layout="fullscreen"
          variant="solid"
          size="md"
          sx={(theme) => ({
            py: 0,
            mx: "auto",
            // boxShadow: theme.shadow.xs,
            boxShadow: "none",
            backgroundColor: "darkslategray",
            maxWidth: 500,
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
            <SelectNakshatra />
            <SelectSex />
          </Sheet>
        </ModalDialog>
      </Modal>
    </>
  );
}
