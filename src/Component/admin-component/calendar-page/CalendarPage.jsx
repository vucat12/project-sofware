import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getCalendarById, getListCalendar, getShift } from '../../../services/admin/calendarServices';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import { Col, Row } from 'antd';
import './CalendarPage.scss';

function CalendarPage() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataEvent, setDataEvent] = useState({});

  useEffect(() => {
    // getShift().then(res => res.data)
  }, []);

  const handleEventClick = (event) => {
    getCalendarById(event.event.id).then(res => {
      setIsModalVisible(true)
      setDataEvent(res.data)
    })
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleDate = async (event) => {
    let filter = {
      fromDate: moment(event.start).format("YYYY-MM-DD"),
      toDate: moment(event.end).format("YYYY-MM-DD"),
    }


    let data = await getListCalendar(filter);
    let arr = data.data.map((el, index ,final) => {
      let count = 0;
      for (let i = index+1; i < final.length; i++) {
        if (el.start === final[i].start && el.end === final[i].end && el.shifts=== final[i].shifts)
        count++;
      }
      return {...el, count: count};
    })

    let arrNew = [{}];

    arr.forEach(el => {
      arrNew.forEach(res => {
        if(res.shifts!==el.shifts)
        arrNew.push(el)
      })
    })

    console.log("====", arrNew);


    data.data = data.data.map(el => {
      let start = moment(el.start).format("YYYY-MM-DDTHH:mm:ss");
      let end = moment(el.end).format("YYYY-MM-DDTHH:mm:ss");
      let title = el.course;
      return {...el, start: start, end: end, title: el.shifts+ ': ' +title, classNames: ['styleEvent']}
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
        datesSet={handleDate}
        events={dataSource}
        />

            <Modal title="Thêm mới môn học" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Row>
              <Col span={12} className="text-center">Tên môn học: </Col>
              <Col span={12}>{dataEvent.course}</Col>
              </Row>
              <Row>
              <Col span={12} className="text-center">Phòng học: </Col>
              <Col span={12}>{dataEvent.class_room}</Col>
              </Row>
              <Row>
              <Col span={12} className="text-center">Giờ bắt đầu: </Col>
              <Col span={12}>{dataEvent.start}</Col>
              </Row>
              <Row>
              <Col span={12} className="text-center">Giờ kết thúc: </Col>
              <Col span={12}>{dataEvent.end}</Col>
              </Row>
            </Modal>

      </div>
    )
}

export default CalendarPage
