import React, { useState } from "react";
import SelectNakshatra from "./SelectNakshatra";
import SelectSex from "./SelectSex";
import SetBirthTime from "./SetBirthTime";
import { AppContext } from "./AppContext";

import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as Logo } from "../assets/tara_logo.svg";
import {
  Link,
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
          pl: 1,
        }}
      >
        <Logo fill="darkseagreen" width="180" style={{ marginLeft: "-8px" }} />
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
            px: 1.5,
            mx: "auto",
            // boxShadow: theme.shadow.xs,
            boxShadow: "none",
            backgroundColor: "darkslategray",
            maxWidth: 500,
          })}
        >
          <ModalClose
            size="lg"
            sx={{ m: 0, top: -8, right: 5, color: "darkseagreen", zIndex: 1 }}
            color="transparent"
          />
          <Sheet
            variant="solid"
            invertedColors
            sx={{
              backgroundColor: "transparent",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography component="h3" textColor="darkseagreen">
              Настройки
            </Typography>
            <Divider inset="none" color="primary" />
            <SelectNakshatra />
            <SelectSex />
            {/* <SetBirthTime /> */}
            <Typography
              component="p"
              level="body-sm"
              textColor="darkseagreen"
              textAlign="center"
              sx={{ mt: "auto", py: 3, mx: "auto" }}
            >
              © 2023–2024 Надежда Афонькина. Разработка:{" "}
              <Link href="https://maxshu.ru" textColor="darkseagreen">
                maxshu
              </Link>
            </Typography>
          </Sheet>
        </ModalDialog>
      </Modal>
    </>
  );
}
