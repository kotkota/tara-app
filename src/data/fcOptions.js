import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";

import { events } from "./events";

export const calendarOptions = {
  plugins: [multiMonthPlugin, rrulePlugin, interactionPlugin],
  initialView: "multiMonthYear",
  multiMonthMaxColumns: 1,
  initialEvents: { events },
  events: {
    title: "rrule event",
    rrule: {
      dtstart: "2023-03-30T00:00:00",
      // dtstart: '2023-01-14',
      freq: "daily",
      interval: 28,
    },
    duration: "100:00:00",
    // display: 'background',
    // allDay: true,
    backgroundColor: "#ff0000",
  },
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
};
