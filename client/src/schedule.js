import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './schedule.css';
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

const Schedule = (handleCurrentPageChange) => {

    return(
        <div>
            <div className="header">
                {/* <div className="backarrow">
                    <img
                        src={backArrow}
                    ></img>
                </div> */}
                <div className="title">
                    <h2>時程安排</h2>
                </div>
                <div className="calendar">
                    <img
                        src={calendar}
                    ></img>
                </div>  
            </div>
            <div className="date">
                <img
                    src={dates}
                ></img>
            </div>
            <div className="appointments">
                <div className="client1">
                    <img
                        style={{
                            position: 'absolute',
                            top:'0%',
                            left:'50%',
                            transform: 'translate(-50%,0%)'
                        }}
                        src={line}
                    ></img>
                    <div className="body1">
                        <img
                            src={cardbg1}
                        ></img>
                        <div className="photofmed">
                            <img
                                src={clientpic1}
                            ></img>
                        </div>
                        <div className="info">
                            <p style={{
                                fontSize:'14px'
                            }}>12:30 PM</p>
                            <p style={{
                                fontSize:'19px',
                                fontWeight:'2000',
                                marginTop:'7%',
                                marginBottom:'7%'
                            }}>Amy 物理治療師</p>
                            <p style={{
                                fontSize:'15px',
                                opacity:'0.65'
                            }}>線上諮詢</p>
                        </div>
                        {/* <div className="option">
                            <div className="accept">
                                <img
                                src={accept}
                                ></img>
                            </div>
                            <div className="deny">
                                <img
                                    src={deny}
                                ></img>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="client2">
                    <img
                        style={{
                            position: 'absolute',
                            top:'0%',
                            left:'50%',
                            transform: 'translate(-50%,0%)'
                        }}
                        src={line}
                    ></img>
                    {/* <div className="body1">
                        <img
                            src={cardbg2}
                        ></img>
                        <div className="photo">
                            <img
                                src={clientpic1}
                            ></img>
                        </div>
                        <div className="info" style={{
                            color:'black'
                        }}>
                            <p style={{
                                fontSize:'14px'
                            }}>12:30 PM</p>
                            <p style={{
                                fontSize:'19px',
                                fontWeight:'2000',
                                marginTop:'7%',
                                marginBottom:'7%'
                            }}>林先生</p>
                            <p style={{
                                fontSize:'15px',
                                opacity:'0.65'
                            }}>到府服務</p>
                        </div>
                        <div className="option">
                            <div className="accept">
                                <img
                                src={accept}
                                ></img>
                            </div>
                            <div className="deny">
                                <img
                                    src={deny}
                                ></img>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="client3">
                    <img
                        style={{
                            position: 'absolute',
                            top:'0%',
                            left:'50%',
                            transform: 'translate(-50%,0%)'
                        }}
                        src={line}
                    ></img>
                    {/* <div className="body1">
                        <img
                            src={cardbg3}
                        ></img>
                        <div className="photo">
                            <img
                                src={clientpic1}
                            ></img>
                        </div>
                        <div className="info" style={{
                            color:'black'
                        }}>
                            <p style={{
                                fontSize:'14px'
                            }}>12:30 PM</p>
                            <p style={{
                                fontSize:'19px',
                                fontWeight:'2000',
                                marginTop:'7%',
                                marginBottom:'7%'
                            }}>林先生</p>
                            <p style={{
                                fontSize:'15px',
                                opacity:'0.65'
                            }}>到府服務</p>
                        </div>
                        <div className="option">
                            <div className="accept">
                                <img
                                src={accept}
                                ></img>
                            </div>
                            <div className="deny">
                                <img
                                    src={deny}
                                ></img>
                            </div>
                        </div>
                    </div> */}
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