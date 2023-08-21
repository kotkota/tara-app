import React, { useContext, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import { addDays } from './utils'
import InfoTheDay from './InfoTheDay'
import { AppContext } from './AppContext'

import { events } from '../data/events'

// const FullCalendar = lazy(() => import("@fullcalendar/react"));

export default function TaraCalendar() {
  const calendarRef = useRef()

  const { periodStartDate, period, setDate } = useContext(AppContext)

  const options = {
    plugins: [multiMonthPlugin, rrulePlugin, interactionPlugin],
    initialView: 'multiMonthYear',
    multiMonthMaxColumns: 1,
    // initialEvents: { events },
    events: [
      ...events,
      {
        title: 'Period',
        rrule: {
          // dtstart: "2023-03-30",
          dtstart: periodStartDate,
          until: '2024-01-01',
          freq: 'daily',
          interval: period.cycle
        },
        duration: period.duration * 24 + ':00:00',
        display: 'background',
        allDay: true,
        backgroundColor: '#ff7070',
        classNames: 'period'
      },
      {
        title: 'Ovulation',
        rrule: {
          // dtstart: "2023-03-30",
          dtstart: addDays(
            periodStartDate,
            period.duration - 1 + (period.cycle - period.duration) / 2
          ),
          until: '2024-01-01',
          freq: 'daily',
          interval: period.cycle
        },
        duration: 3 * 24 + ':00:00',
        display: 'background',
        allDay: true,
        backgroundColor: '#bcfca2',
        classNames: 'ovulation'
      }
    ],
    selectable: true,
    locale: 'ru',
    firstDay: 1,
    nextDayThreshold: '09:00:00',
    eventColor: 'firebrick',
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    // eventClick: (eventInfo) => {
    //   setDate(eventInfo.event.startStr);
    // },
    viewDidMount: (view) => {},
    dateClick: (info) => {
      console.log(info.dateStr, new Date(info.dateStr).setHours(12))
      setDate(new Date(info.dateStr).setHours(12))
      handleTap(info.dateStr)
    }
  }

  const handleTap = (date) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.select(date)
  }

  return (
    <div className="tara-calendar module__wide">
      <FullCalendar ref={calendarRef} {...options} />
      <InfoTheDay />
    </div>
  )
}
