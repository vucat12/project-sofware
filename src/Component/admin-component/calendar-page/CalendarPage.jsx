import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarPage() {
  let todayStr = new Date().toISOString().replace(/T.*$/, '')

  const handleEventClick = (clickInfo) => {
    console.log("==========", clickInfo);
  }
    return (
      <div className="calendar-page">

      <h2 className="calendar-page title">
        CALENDAR PAGE
      </h2>
        <FullCalendar
        headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        className="calendar-page-detail"
        eventClick={handleEventClick}
        initialEvents={[
          {
            id: 1,
            title: 'All-day event',
            start: todayStr
          },
          {
            id: 2,
            title: 'Timed event',
            start: todayStr + 'T12:00:00',
            end: todayStr + 'T14:00:00',
          }
        ]}
        />
      </div>

    )
}

export default CalendarPage
