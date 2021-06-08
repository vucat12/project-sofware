import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getCalendarById, getClassByShift, getListCalendar, getShift } from '../../../services/admin/calendarServices';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd';
import './CalendarPage.scss';

function CalendarPage() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataEvent, setDataEvent] = useState({});
  const [dataShifts, setDataShifts] = useState([]);
  const [dataClass, setDataClass] = useState({});


  useEffect(() => {
    getShift().then(res => {setDataShifts(res)})
  }, []);

  const handleEventClick = (event) => {
    let shift = `SHIFT_${dataShifts.indexOf(event.event.extendedProps.shifts) + 1}`;
    getClassByShift({
      date: moment(event.event.start).format("YYYY-MM-DD")+'T00:00:00.00Z', 
      shift: shift
    }).then(res => {
      setDataEvent(res.data);
      setIsModalVisible(true);
    })
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setDataClass({})
  }

  const handleDate = async (event) => {
    let filter = {
      fromDate: moment(event.start).format("YYYY-MM-DD"),
      toDate: moment(event.end).format("YYYY-MM-DD"),
    }


    let data = await getListCalendar(filter);
    let arr = data.data.map((el, index ,final) => {
      let count = 1;
      for (let i = index+1; i < final.length; i++) {
        if (el.start === final[i].start && el.end === final[i].end && el.shifts=== final[i].shifts)
        count++;
      }
      return {...el, count: count};
    })

    let arrNew = [];
    arr.forEach((el, index) => {
      let checkLoop = 0;
      arrNew.forEach(element => {
        if(element.shifts === el.shifts && element.start === el.start && element.end===el.end) checkLoop++;
      })
      if (checkLoop===0) arrNew.push({...el})
    })

    data.data = arrNew.map(el => {
      let start = moment(el.start).format("YYYY-MM-DDTHH:mm:ss");
      let end = moment(el.end).format("YYYY-MM-DDTHH:mm:ss");
      return {...el, start: start, end: end, title: el.shifts+ ': ' + el.count + ' Lớp', classNames: ['styleEvent']}
    })

    setDataSource(data.data)
  }

  const viewDetailClass = (id) => {
    getCalendarById(id).then(res => setDataClass(res.data))
  }

  function getTitleShift() {
    let title= '';
    dataShifts.forEach((el, index) => {
      if(dataEvent.shift?.indexOf(index+1) > 0) {
        title=el;
        return title;
      }
    })
    return title;
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

            <Modal title={getTitleShift()} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <div className="text-center" style={{fontSize: '16px'}}>Tổng số lớp học: <span className="font-bold">{dataEvent.total_class_room}</span></div>
              {dataEvent.courses?.map(el => {
                return (<div className="mt-3 text-center">Phòng học: <span className="font-bold">{el.class_room}</span>
                <Button onClick={() => viewDetailClass(el.id_course)} className="ml-3" style={{height: '30px'}}>Xem chi tiết</Button>
                </div>)
              })}
            {!!Object.keys(dataClass).length && <div className="text-center pt-2">
              <div>
                Phòng học: <span className="font-bold">{dataClass.class_room}</span>
              </div>
              <div>
                Môn: <span className="font-bold">{dataClass.course}</span>
              </div>
              <div>
                Bắt đầu: <span className="font-bold">{dataClass.start}</span>
              </div>
              <div>
                Kết thúc: <span className="font-bold">{dataClass.end}</span>
              </div>
            </div>}
            </Modal>

      </div>
    )
}

export default CalendarPage
