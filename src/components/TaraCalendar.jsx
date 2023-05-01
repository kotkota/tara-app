import React, { useContext, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { formatDate } from "../utils";
import { AppContext } from "./AppContext";

import { events } from "../data/events";

export function TaraCalendar() {
  const calendarRef = useRef();

  const { periodStartDate, periodDuration, date, setDate } =
    useContext(AppContext);

  const options = {
    plugins: [multiMonthPlugin, rrulePlugin, interactionPlugin],
    initialView: "multiMonthYear",
    multiMonthMaxColumns: 1,
    // initialEvents: { events },
    events: [
      ...events,
      {
        title: "Period",
        rrule: {
          // dtstart: "2023-03-30",
          dtstart: formatDate(periodStartDate),
          until: "2024-01-01",
          freq: "daily",
          interval: periodDuration,
        },
        duration: "120:00:00",
        display: "background",
        allDay: true,
        backgroundColor: "#ffdab9",
        // color: "#deb887",
        classNames: "period",
      },
    ],
    selectable: true,
    locale: "ru",
    firstDay: 1,
    nextDayThreshold: "09:00:00",
    eventColor: "firebrick",
    headerToolbar: {
      left: "",
      center: "",
      right: "",
    },
    // eventClick: (eventInfo) => {
    //   setDate(eventInfo.event.startStr);
    // },
    viewDidMount: (view) => {},
    dateClick: (info) => {
      console.log(info.dateStr);
      setDate(info.dateStr);
      handleTap(info.dateStr);
    },
  };

  const handleTap = (date) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.select(date);
  };

  return <FullCalendar ref={calendarRef} {...options} />;
}
