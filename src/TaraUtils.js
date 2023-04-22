import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { events } from "./events";

export function getLocation() {
  if (localStorage.getItem("location")) {
    console.log("getLoc returned storage");
    return JSON.parse(localStorage.getItem("location"));
  } else {
    console.log("getLoc requested update");
    return updateLocation();
  }
}

export function updateLocation() {
  let coords = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.latitude = position.coords.latitude.toFixed(2);
        coords.longitude = position.coords.longitude.toFixed(2);
        localStorage.setItem("location", JSON.stringify(coords));
        console.log("getCurrentPosition success", coords);
      },
      (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
      {
        enableHighAccuracy: false,
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  console.log("update result:", coords);
  return coords;
}

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
