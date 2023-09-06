import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './schedule.css';
import backArrow from './images-appointment-med/backarrow.svg';
import calendar from './images-appointment-med/calendar.svg';

import line from './images-appointment-med/line.svg'
import cardbg1 from './images-appointment-med/cardbg1.svg';

import clientpic1 from './images-appointment-med/clientpic1.svg';

import homepage from './images-schedule-med/homepage.svg';
import schedule from './images-schedule-med/schedule.svg';
import report from './images-home/report.svg';
import notification from './images-home/notification.svg';

// 跟後端有關
import axios from 'axios';


const Schedule = (handleCurrentPageChange) => {
    const user_id = sessionStorage.getItem('user_id')
    const formattedDate = sessionStorage.getItem("formattedDate")
    console.log("user_id:"+user_id)
    console.log("formattedDate:"+formattedDate)
    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {
        // 從後端取得預約資料
        axios.get(`http://localhost:8080/get-appointments/${user_id}/${formattedDate}`)
        .then(response => {
            setAppointmentData(response.data);
            // console.log("response.data:"+response.data)
            if(!response.data[0]){
                console.log("今天沒有安排!")
            }
            else{
                console.log("response.data[0].full_name:"+response.data[0].full_name)
            }
            
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }, []);



    return(
        <div style={{
            width:'360px',
            height: '780px'
        }}>
            <div className="header">
                <div className="backarrowofschedule">
                    <Link to='/calendars'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                </div>
                <div className="title">
                    <h2>時程安排</h2>
                </div>
                <div className="calendar">
                    <Link to='/calendars'>
                        <img
                            src={calendar}
                        ></img>
                    </Link> 
                </div>  
            </div>
            <div className="dateofschedule">
                <h2>{formattedDate}</h2>
            </div>
            <div className="appointments-wrap">
                <div className="appointments"> 
                {/* result-wrap */}
                    <div className="appointments-container">
                        {/* results-con */}
                        {appointmentData.map((appointment, index) => (
                            <div className="appointItem " key={index}>
                                <img
                                    style={{
                                        position: 'absolute',
                                        top: '0%',
                                        left: '50%',
                                        transform: 'translate(-50%,0%)'
                                    }}
                                    src={line}
                                ></img>
                                <div className="body1">
                                    <Link 
                                        to={'/appointment'}
                                        state={{
                                            from: 'schedule',
                                            professional_id: appointment.professional_id
                                        }} // 使用 state 标识来源
                                    >
                                        <img src={cardbg1}></img>
                                        <div className="photofmed">
                                            <img src={clientpic1}></img>
                                        </div>
                                        <div className="info">
                                            <p className='infoftime'>{appointment.appointment_start_time}</p>
                                            <p className='infofmain'>
                                                {appointment.full_name}{appointment.specialization}
                                            </p>
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
                    <Link to='/homepage'>
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

export default Schedule;