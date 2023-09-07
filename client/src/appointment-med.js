import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './appointment-med.css';
import backArrow from './images-appointment-med/backarrow.svg';
import calendar from './images-appointment-med/calendar.svg';
import dates from './images-appointment-med/dates.svg';
import line from './images-appointment-med/line.svg'
import cardbg1 from './images-appointment-med/cardbg1.svg';
import cardbg2 from './images-appointment-med/cardbg2.svg';
import cardbg3 from './images-appointment-med/cardbg3.svg';
import clientpic1 from './images-appointment-med/clientpic1.svg';
import accept from './images-appointment-med/accept.svg';
import deny from './images-appointment-med/deny.svg';
import homepage from './images-home/homepage.svg';
import schedule from './images-home/schedule.svg';
import report from './images-home/report.svg';
import notification from './images-home/notification.svg';

// 跟後端有關
import axios from 'axios';

const AppointmentMed = (handleCurrentPageChange) => {
    const professional_id = sessionStorage.getItem('professional_id')
    const formattedDate = sessionStorage.getItem("formattedDate")
    console.log("professional_id:"+professional_id)
    console.log("formattedDate:"+formattedDate)

    const [appointmentData, setAppointmentData] = useState([]);
    const [appointmentVisibility, setAppointmentVisibility] = useState([]); //跟預約項目使否顯示有關
    useEffect(() => {
        // 從後端取得預約資料
        axios.get(`http://localhost:8080/get-appointments-med/${professional_id}/${formattedDate}`)
        .then(response => {
            setAppointmentData(response.data);
            // console.log("response.data:"+response.data)
            console.log("response.data:"+response.data)
            // 初始化预约可见性数组
            setAppointmentVisibility(Array(response.data.length).fill(true));
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }, []);
    
    
    
    
    const handleDenyClick = async (index,appointmentId) => {
        // 复制一份现有的可见性数组
        const updatedVisibility = [...appointmentVisibility];
        // 将被点击的那个 appointment 的可见性设置为 false
        updatedVisibility[index] = false;
        // 更新状态变量
        setAppointmentVisibility(updatedVisibility);

        // 更新後端狀態
        console.log("appointmentId:"+appointmentId)
        try {
          const response = await axios.post('http://localhost:8080/update-appointment-status', {
            appointment_id: appointmentId,
            new_status: '已拒絕'
          });
    
          // 在這裡處理成功回應，例如重新載入預約資料等等
        } catch (error) {
          console.error('發生錯誤', error);
          // 在這裡處理錯誤
        }
      };
      

    // 按下accept的動作
    const handleAcceptClick = async (appointmentId) => {
        console.log("appointmentId:"+appointmentId)
        try {
          const response = await axios.post('http://localhost:8080/update-appointment-status', {
            appointment_id: appointmentId,
            new_status: '已確認'
          });
    
          // 在這裡處理成功回應，例如重新載入預約資料等等
        } catch (error) {
          console.error('發生錯誤', error);
          // 在這裡處理錯誤
        }
      };

    return(
        <div>
            <div className="header">
                <div className="backarrowofappointmed">
                    <Link to='/calendarsmed'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                </div>
                <div className="title">
                    <h2>預約要求</h2>
                </div>
                <div className="calendar">
                    <img
                        src={calendar}
                    ></img>
                </div>  
            </div>
            <div className="dateofappointment-med">
                <h2>{formattedDate}</h2>
            </div>
            <div className='appointmentsmed-wrap'>
                <div className='appointmentsmed'>
                    <div className="appointmentsmed-container">
                    {appointmentData.map((appointment, index) => (
                        appointmentVisibility[index] && (
                            <div className="appointItemmed" key={index}>
                                <img
                                    style={{
                                        position: 'absolute',
                                        top: '0%',
                                        left: '50%',
                                        transform: 'translate(-50%,0%)'
                                    }}
                                    src={line}
                                ></img>
                                <div className="body1ofappointmentmed">
                                    <img
                                        src={cardbg1}
                                    ></img>
                                    <div className="photo">
                                        <img
                                            src={clientpic1}
                                        ></img>
                                    </div>
                                    <div className="info">
                                        <p className='infoftime'>{appointment.appointment_start_time}</p>
                                        <p className='infofmain'>{appointment.username}{appointment.gender}</p>
                                        <p className='infoofservice'>{appointment.service_name}</p>
                                    </div>
                                    <div className="optionofappointmentmed">
                                        <Link to='/schedulemed'>
                                            <div className="accept" onClick={() => handleAcceptClick(appointment.appointment_id)}>
                                                <img
                                                    src={accept}
                                                ></img>
                                            </div>
                                        </Link>
                                        <div className="deny" onClick={() => handleDenyClick(index,appointment.appointment_id)}>
                                            <img
                                                src={deny}
                                            ></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    
                    ))}
                    </div>
                </div>
            </div>
            
            <div className="navbar">
                <div className='homepage'
                style={{
                    position: 'absolute',
                    left: '0%'
                }}>
                    <img
                        src={homepage}
                    ></img>
                </div>
                <div className='schedule'
                style={{
                    position: 'absolute',
                    left: '29.65%'
                }}>
                    <img
                        src={schedule}
                    ></img>
                </div>
                <div className='report'
                style={{
                    position: 'absolute',
                    left: '59.3%'
                }}>
                    <img
                        src={report}
                    ></img>
                </div>
                <div className='notification'
                style={{
                    position: 'absolute',
                    right: '0%'
                }}>
                    <img
                        src={notification}
                    ></img>
                </div>
            </div>
            
        </div>
    );
}

export default AppointmentMed;