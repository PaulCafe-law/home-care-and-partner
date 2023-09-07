import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './schedule-med.css';
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
import homepage from './images-schedule-med/homepage.svg';
import schedule from './images-schedule-med/schedule.svg';
import report from './images-home/report.svg';
import notification from './images-home/notification.svg';

// 跟後端有關
import axios from 'axios';

const ScheduleMed = (handleCurrentPageChange) => {
    const professional_id = sessionStorage.getItem('professional_id')
    const formattedDate = sessionStorage.getItem("formattedDate")
    console.log("professional_id:"+professional_id)
    console.log("formattedDate:"+formattedDate)

    const [appointmentData, setAppointmentData] = useState([]);
    useEffect(() => {
        // 從後端取得預約資料
        axios.get(`http://localhost:8080/get-schedule-appointments-med/${professional_id}/${formattedDate}`)
        .then(response => {
            setAppointmentData(response.data);
            // console.log("response.data:"+response.data)
            if(!response.data[0]){
                console.log("今天沒有安排喔!")
            }
            else{
                console.log("response.data[0].user_name:"+response.data[0].username)
            }
            
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }, []);


    return(
        <div>
            <div className="header">
                <div className="backarrowofschedulemed">
                    <Link to='/calendartoschedulemed'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                </div>
                <div className="title">
                    <h2>時程安排</h2>
                </div>
                <div className="calendar">
                    <Link to='/calendartoschedulemed'>
                        <img
                            src={calendar}
                        ></img>
                    </Link>
                </div>  
            </div>
            <div className="dateofschedule-med">
                <h2>{formattedDate}</h2>
            </div>
            <div className='schedulesmed-wrap'>
                <div className='schedulesmed'>
                    {/* appointments */}
                    <div className="schedulesmed-container">
                        {/* appointments-container */}
                    {appointmentData.map((appointment, index) => (
                        <div className="schedulesItemmed clearfix" key={index}>
                            <img
                                style={{
                                    position: 'absolute',
                                    top: '0%',
                                    left: '50%',
                                    transform: 'translate(-50%,0%)'
                                }}
                                src={line}
                            ></img>
                            <div className="body1ofschedulemed">
                                <Link 
                                    to={'/chatroommed'}
                                    state={{
                                        from: 'schedulemed',
                                        client_id: appointment.user_id
                                    }} // 使用 state 标识来源
                                >
                                    <img
                                        src={cardbg1}
                                    ></img>
                                    <div className="photo">
                                        <img
                                            src={clientpic1}
                                        ></img>
                                    </div>
                                    <div className="infofschedulemed">
                                        <p className='infoftime'>{appointment.appointment_start_time}</p>
                                        <p className='infofmain'>{appointment.username}{appointment.gender}</p>
                                        <p className='infoofservice'>{appointment.service_name}</p>
                                    </div>
                                </Link>
                                
                                
                            </div>
                        </div>
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
                    <Link to='/homepagemed'>
                        <img
                            src={homepage}
                        ></img>
                    </Link>
                    
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

export default ScheduleMed;