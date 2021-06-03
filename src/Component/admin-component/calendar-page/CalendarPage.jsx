import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getListCalendar, getShift } from '../../../services/admin/calendarServices';
import moment from 'moment';

function CalendarPage() {
  let todayStr = new Date().toISOString().replace(/T.*$/, '')
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    // getShift().then(res => res.data)
  }, []);

  const handleEventClick = (event) => {
    console.log("=========", event)
  }

  const handleDateClick = () => {
    console.log("====dataSource=====", dataSource);
  }

  const handleDate = async (event) => {
    let filter = {
      fromDate: moment(event.start).format("YYYY-MM-DD"),
      toDate: moment(event.end).format("YYYY-MM-DD"),
    }

    let data = await getListCalendar(filter);

    data.data = data.data.map(el => {
      let start = moment(el.start).format("YYYY-MM-DDTHH:mm:ss");
      let end = moment(el.end).format("YYYY-MM-DDTHH:mm:ss");
      let title = el.course;
      return {...el, start: start, end: end, title: title}
    })
    setDataSource(data.data)
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

        dateClick={handleDateClick}

        datesSet={handleDate}
        events={dataSource}
        />
      </div>
    )
}

export default CalendarPage
