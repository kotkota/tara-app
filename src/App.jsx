import "./styles.css";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import Info from "./Info";
import SettingsPanel from "./Settings";
import * as t from "./TaraUtils";
import {
  Box,
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";

function App() {
  const [texts, setTexts] = useState(() => t.initTexts());
  const [isOpen, setIsOpen] = useState(!localStorage.getItem("location"));

  useEffect(() => {
    t.getDayInfo(new Date().getTime(), setTexts);
  }, []);

  let options = {
    ...t.calendarOptions,
    eventClick: (eventInfo) => {
      // console.log(eventInfo)
      // console.log(eventInfo.event)
      t.getDayInfo(eventInfo.event.startStr, setTexts);
    },
    viewDidMount: (view) => {
      // console.log(view)
      // t.getDayInfo(new Date().getTime(), setTexts)
    },
    dateClick: (info) => {
      console.log(info.dateStr);
      t.getDayInfo(info.dateStr, setTexts);
      // info.dayEl.style.backgroundColor = 'ghostwhite'
    },
  };

  return (
    <>
      <SettingsPanel />
      <FullCalendar {...options} />
      {isOpen ? (
        <>
          <Info texts={texts} />

          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <ModalDialog
              variant="plain"
              size="md"
              sx={(theme) => ({
                boxShadow: theme.shadow.xs,
              })}
            >
              {/* <ModalClose size="md" sx={{ color: "darkseagreen" }} /> */}
              <Typography level="body1">
                Для расчета времени событий в календаре необходим доступ к
                текущей геолокации.
              </Typography>
              <Button
                variant="soft"
                onClick={() => {
                  t.updateLocation();
                  t.getDayInfo(new Date().getTime(), setTexts);
                  setIsOpen(false);
                }}
                sx={{ mt: 2 }}
              >
                Запросить местоположение
              </Button>
            </ModalDialog>
          </Modal>
        </>
      ) : (
        <Info texts={texts} />
      )}
    </>
  );
}

export default App;
