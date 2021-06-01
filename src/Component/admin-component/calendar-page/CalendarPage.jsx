import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function CalendarPage() {
    return (
      <div className="calendar-page">

      <h2 className="calendar-page title">
        CALENDAR PAGE
      </h2>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        className="calendar-page-detail"
        />
      </div>

    )
}

export default CalendarPage
