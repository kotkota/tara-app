import React, { useContext, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { addDays, formatMonth } from "./utils";
import InfoTheDay from "./InfoTheDay";
import { AppContext } from "./AppContext";

import { events } from "../data/events";
import { sankranti } from "../data/sankranti";
import { events2024 } from "../data/events2024";
import { events2025 } from "../data/events2025";

// const FullCalendar = lazy(() => import("@fullcalendar/react"));
export let calendarApi;

export default function TaraCalendar() {
  const calendarRef = useRef();
  const { periodStartDate, isFemale, period, date, setDate } =
    useContext(AppContext);

  let eventsToShow = [...sankranti, ...events2024, ...events2025];

  if (isFemale)
    eventsToShow = [
      ...eventsToShow,
      {
        title: "Period",
        rrule: {
          // dtstart: "2023-03-30",
          dtstart: periodStartDate,
          until: "2025-01-01",
          freq: "daily",
          interval: period.cycle,
        },
        duration: period.duration * 24 + ":00:00",
        display: "background",
        allDay: true,
        backgroundColor: "#ff7070",
        classNames: "period",
      },
      {
        title: "Ovulation",
        rrule: {
          // dtstart: "2023-03-30",
          dtstart: addDays(
            periodStartDate,
            period.duration - 1 + (period.cycle - period.duration) / 2
          ),
          until: "2025-01-01",
          freq: "daily",
          interval: period.cycle,
        },
        duration: 3 * 24 + ":00:00",
        display: "background",
        allDay: true,
        backgroundColor: "#bcfca2",
        classNames: "ovulation",
      },
    ];

  const options = {
    plugins: [multiMonthPlugin, rrulePlugin, interactionPlugin],
    initialView: "multiMonth",
    initialDate: getDate182DaysAgo(),
    multiMonthMaxColumns: 1,
    // initialEvents: { events },
    events: eventsToShow,
    // visibleRange: {
    //   start: "2023-01-01",
    //   end: "2024-12-31",
    // },
    // visibleRange: function () {
    //   // Generate a new date for manipulating in the next step
    //   const startDate = new Date(date);
    //   const endDate = new Date(date);

    //   // Adjust the start & end dates, respectively
    //   startDate.setMonth(startDate.getMonth() - 6); // 6 month ago
    //   startDate.setDate(1);
    //   endDate.setMonth(endDate.getMonth() + 6); // 6 month into the future
    //   endDate.setDate(31);

    //   console.log("startDate: ", startDate);

    //   return { start: startDate, end: endDate };
    // },
    duration: { months: 12 },

    selectable: true,
    locale: "ru",
    firstDay: 1,
    nextDayThreshold: "09:00:00",
    showNonCurrentDates: false,
    eventColor: "firebrick",
    headerToolbar: {
      left: "",
      center: "",
      right: "",
    },
    // eventClick: (eventInfo) => {
    //   setDate(eventInfo.event.startStr);
    // },
    viewDidMount: (view) => {
      goToday();
    },
    dateClick: (info) => {
      console.log(info);
      // console.log(info.dateStr, new Date(info.dateStr).setHours(12));
      // setDate(new Date(info.dateStr).setHours(12));
      setDate(info.date.setHours(12));
      // console.log(info.dateStr, new Date(info.dateStr).setHours(12));
      handleTap(info);
    },
  };

  const goToday = () => {
    setTimeout(() => {
      calendarApi = calendarRef.current.getApi();
      // console.log (calendarApi);
      // calendarApi.today();
      const currentMonth = formatMonth(date);
      document.querySelector(`[data-date="${currentMonth}"]`).scrollIntoView();
    }, 10);
  };

  const handleTap = (date) => {
    calendarApi = calendarRef.current.getApi();
    calendarApi.select(date.dateStr);
    // console.log(calendarRef);
    // calendarApi.gotoDate(date);
    // const dayID = date.dayEl.attributes["aria-labelledby"].value;
    // console.log(dayID);
  };
  function getDate182DaysAgo() {
    const today = new Date();
    today.setDate(today.getDate() - 182);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-01`;
  }

  return (
    <div className="tara-calendar module__wide">
      <FullCalendar ref={calendarRef} {...options} />
      <InfoTheDay />
    </div>
  );
}
