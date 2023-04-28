import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";

import { events } from "./events";

export const calendarOptions = {
  plugins: [multiMonthPlugin, rrulePlugin, interactionPlugin],
  initialView: "multiMonthYear",
  multiMonthMaxColumns: 1,
  // initialEvents: { events },
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
