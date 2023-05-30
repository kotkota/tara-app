import { ReactComponent as AddIcon } from "../assets/icons/add_FILL0_wght300_GRAD0_opsz24.svg";
import { ReactComponent as ResetIcon } from "../assets/icons/device_reset_FILL1_wght300_GRAD0_opsz24.svg";
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { formatDate } from "./utils";
import { events } from "../data/events";
import { AppContext } from "./AppContext";

export default function InfoTheDay() {
  const { date, setDate, periodStartDate, setPeriodStartDate } =
    useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  function updateTitles(date = Date.now()) {
    // console.log("boop", typeof date, date, formatDate(Date.now()));
    return {
      dateStr: new Date(date).toLocaleString("ru", { dateStyle: "long" }),
      dateTitles: getStoredEventsByDate(date, events),
    };
  }

  function getStoredEventsByDate(date, events) {
    const matchingEvents = events.filter((event) => {
      const eventStartDate = new Date(event.start).toLocaleDateString();
      const eventEndDate = new Date(event.end).toLocaleDateString();
      const requestedDate = new Date(date).toLocaleDateString();
      return eventStartDate === requestedDate || eventEndDate === requestedDate;
    });
    return matchingEvents.map((event) => event.title).join(". ");
  }

  function saveTheDate() {
    const selectedDate = formatDate(date);
    setPeriodStartDate(selectedDate);
    localStorage.setItem("periodStartDate", selectedDate);
  }

  let titles = updateTitles(date);

  return (
    <div className="module today">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className="module_title">{titles.dateStr}</h3>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {typeof date == "string" ? (
            <IconButton
              aria-label="Вернуть текущий момент"
              variant="plain"
              color="transparent"
              size="sm"
              onClick={() => setDate(Date.now())}
              sx={{ mr: 1.5 }}
            >
              <ResetIcon fill="darkseagreen" />
            </IconButton>
          ) : null}
          <IconButton
            aria-label="Добавить начало периода"
            variant="plain"
            color="transparent"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            <AddIcon fill="darkseagreen" />
          </IconButton>
        </Box>
      </Box>
      <p className="module_description">{titles.dateTitles}</p>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalDialog
          aria-labelledby="modal-dialog-title"
          aria-describedby="modal-dialog-description"
          size="md"
          variant="plain"
          sx={(theme) => ({
            boxShadow: theme.shadow.xs,
            maxWidth: 430,
            width: "calc(100vw - 40px)",
          })}
        >
          <Typography id="modal-dialog-title" level="h3">
            Отметить начало цикла?
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setIsOpen(false)}
            >
              Нет
            </Button>
            <Button
              variant="soft"
              color="success"
              onClick={() => {
                saveTheDate();
                setIsOpen(false);
              }}
            >
              Отметить
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
