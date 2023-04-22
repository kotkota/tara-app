import "./styles.css";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import Info from "./Info";
import SettingsPanel from "./Settings";
import * as t from "./TaraUtils";
import { Button, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";

function App() {
  const [date, setDate] = useState(() => Date.now());
  const [isOpen, setIsOpen] = useState(!localStorage.getItem("location"));

  let options = {
    ...t.calendarOptions,
    eventClick: (eventInfo) => {
      setDate(eventInfo.event.startStr);
    },
    viewDidMount: (view) => {},
    dateClick: (info) => {
      console.log(info.dateStr);
      setDate(info.dateStr);
    },
  };

  return (
    <>
      <SettingsPanel />
      <FullCalendar {...options} />
      {isOpen ? (
        <>
          <Info date={date} />

          <Modal open={isOpen} onClose={() => {}}>
            <ModalDialog
              variant="plain"
              size="md"
              sx={(theme) => ({
                boxShadow: theme.shadow.xs,
              })}
            >
              <Typography level="body1">
                Для расчета времени событий в календаре необходим доступ к
                текущей геолокации.
              </Typography>
              <Button
                variant="soft"
                onClick={() => {
                  setDate(Date.now());
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
        <Info date={date} />
      )}
    </>
  );
}

export default App;
