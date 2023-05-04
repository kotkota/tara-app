import { ReactComponent as MoonOutlined } from "../assets/icons/sleep_FILL0_wght300_GRAD0_opsz24.svg";
import { ReactComponent as MoonFilled } from "../assets/icons/sleep_FILL1_wght300_GRAD0_opsz24.svg";
import React, { useContext } from "react";
import { Box, IconButton } from "@mui/joy";
import { events } from "../data/events";
import { AppContext } from "./AppContext";

export default function InfoTheDay() {
  const { date, periodStartDate, setPeriodStartDate } = useContext(AppContext);

  function updateTitles(date = Date.now()) {
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

  function toggleDate() {
    console.log("boop");
  }

  return (
    <div className="module today">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className="module_title">{updateTitles(date).dateStr}</h3>
        <IconButton
          variant="plain"
          color="transparent"
          size="sm"
          onClick={() => toggleDate()}
        >
          <MoonOutlined fill="darkseagreen" />
        </IconButton>
      </Box>
      <p className="module_description">{updateTitles(date).dateTitles}</p>
    </div>
  );
}
