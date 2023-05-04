import React, { useContext, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { formatDate } from "./utils";
import InfoTheDay from "./InfoTheDay";
import { AppContext } from "./AppContext";

import { events } from "../data/events";

export default function TaraCalendar() {
  const calendarRef = useRef();

  const { periodStartDate, period, setDate } = useContext(AppContext);

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
          interval: period.cycle,
        },
        duration: period.duration * 24 + ":00:00",
        display: "background",
        allDay: true,
        backgroundColor: "#ff7070",
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

  return (
    <div className="tara-calendar module__wide">
      <FullCalendar ref={calendarRef} {...options} />
      <InfoTheDay />
    </div>
  );
}