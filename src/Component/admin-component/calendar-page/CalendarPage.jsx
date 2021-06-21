import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getCalendarById, getClassByShift, getListCalendar } from '../../../services/admin/calendarServices';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import { Breadcrumb, Button, Col, Input, Row } from 'antd';
import './CalendarPage.scss';
import {
  SearchOutlined
} from '@ant-design/icons';
import { read_cookie } from '../../../services/admin/commonServices';

let filter = {
  fromDate: '',
  toDate: '',
}

function CalendarPage() {

  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataEvent, setDataEvent] = useState({});
  const [dataShifts, setDataShifts] = useState([]);
  const [dataClass, setDataClass] = useState({});
  const [valueSearch, setValueSearch] = useState({ class_name: '', course_name: '' });

  useEffect(() => {
    setDataShifts(read_cookie('getShift'))

  }, []);

  const handleEventClick = (event) => {
    let shift = dataShifts.filter(el => el.name == event.event.extendedProps.shifts)
    getClassByShift({
      date: moment(event.event.start).format("YYYY-MM-DD") + 'T00:00:00.00Z',
      shift: shift[0].code,
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
    filter = {
      fromDate: moment(event.start).format("YYYY-MM-DD"),
      toDate: moment(event.end).format("YYYY-MM-DD"),
    }
    await getDataSource();
  }

  async function getDataSource() {
    let data = await getListCalendar({ ...filter, ...valueSearch });
    let arr = data.data.map((el, index, final) => {
      let count = 1;
      for (let i = index + 1; i < final.length; i++) {
        if (el.start === final[i].start && el.end === final[i].end && el.shifts === final[i].shifts)
          count++;
      }
      return { ...el, count: count };
    })
    let arrNew = [];
    arr.forEach((el, index) => {
      let checkLoop = 0;
      arrNew.forEach(element => {
        if (element.shifts === el.shifts && element.start === el.start && element.end === el.end) checkLoop++;
      })
      if (checkLoop === 0) arrNew.push({ ...el })
    })

    data.data = arrNew.map(el => {
      let start = moment(el.start).format("YYYY-MM-DDTHH:mm:ss");
      let end = moment(el.end).format("YYYY-MM-DDTHH:mm:ss");
      let id_shift = el.shifts.slice(3, el.shifts.lastIndexOf('('));
      return { ...el, start: start, end: end, title: el.shifts + ': ' + el.count + ' Lớp', classNames: ['styleEvent', 'shift-' + id_shift] }
    })
    setDataSource(data.data)
  }

  const viewDetailClass = (id) => {
    getCalendarById(id).then(res => setDataClass(res.data))
  }

  function getTitleShift() {
    let title = '';
    dataShifts.forEach((el) => {
      if (el.code === dataEvent?.shift) {
        title = el.name;
        return title;
      }
    })
    return title;
  }

  const getSearchCalendar = async () => {
    await getDataSource()
  }

  const changeClassName = (e) => {
    setValueSearch({
      ...valueSearch,
      class_name: e.target.value,
    })
  }

  const changeCourseName = (e) => {
    setValueSearch({
      ...valueSearch,
      course_name: e.target.value,
    })
  }

  const enterEvent = (e) => {
    if(e.charCode === 13)
    getSearchCalendar()
  }

  return (
    <div className="calendar-page">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Lịch làm việc</Breadcrumb.Item>
        {/*<Breadcrumb.Item>Calendar Page</Breadcrumb.Item> */}
      </Breadcrumb>
      <Row className="calendar-page-search">
        <Col span={10} className="pr-4">
          <div>Tên lớp: </div>
          <Input value={valueSearch.class_name} onChange={changeClassName} onKeyPress={enterEvent}/>
        </Col>
        <Col span={10} className="pr-4">
          <div>Tên khóa học: </div>
          <Input value={valueSearch.course_name} onChange={changeCourseName}  onKeyPress={enterEvent}/>
        </Col>
        <Col span={4} style={{
          textAlign: 'center', display: 'flex',
          alignItems: 'flex-end'
        }}>
          <Button
            type="primary"
            className="button-green calendar-page-search__button"
            onClick={() => getSearchCalendar()}>
            <SearchOutlined style={{ fontSize: '14px' }} /> Tìm kiếm
          </Button>
        </Col>
      </Row>

      <FullCalendar

        dayMaxEvents={true}
        
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
        <div className="text-center" style={{ fontSize: '16px' }}>Tổng số lớp học: <span className="font-bold">{dataEvent.total_class_room}</span></div>
        {dataEvent.courses?.map(el => {
          return (<div className="mt-3 text-center">Phòng học: <span className="font-bold">{el.class_room}</span>
            <Button onClick={() => viewDetailClass(el.id_course)} className="ml-3" style={{ height: '30px' }}>Xem chi tiết</Button>
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
