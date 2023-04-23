import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { events } from "./events";

export const calendarOptions = {
  initialView: "multiMonthYear",
  plugins: [multiMonthPlugin, interactionPlugin],
  events: { events },
  multiMonthMaxColumns: 1,
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
