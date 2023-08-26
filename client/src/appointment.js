import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './appointment.css';
import topbg from './images-meddetail/topbg.svg';
import backArrow from './images-appointment/backarrow.svg';
import titlebg from './images-meddetail/titlebg.svg';
import medphoto from './images-meddetail/medphoto.svg';
import infobg from './images-meddetail/infobg.svg';
import timebg from './images-meddetail/timebg.svg';
import chatroombtn from './images-appointment/chatroombtn.svg';
const Appointment = (handleCurrentPageChange) => {
    return(
        <div>
            <div className="topofappointment">
                <div className="backgroundofappointment">
                    <img
                        src={topbg}
                    ></img>
                </div>
                <div className="backarrowofappointment2">
                    <Link to='/homepage' >
                        <img
                            src={backArrow}
                        ></img>
                    </Link> 
                </div>
                <div className="poster">
                    <h2 style={{
                        color: 'white'
                    }}>詳細資訊</h2>
                </div>
            </div>
            <div className="titleofappointment">
                <div className="titlebg">
                    <img
                        src={titlebg}
                    ></img>
                </div>
                <div className="intro">
                    <div className="photo">
                        <img
                            src={medphoto}
                        ></img>
                    </div>
                    <div className="text">
                        <p style={{
                            fontSize:'19px',
                            fontWeight:'bold',
                            marginBottom:'0'
                        }}>Amy物理治療師</p>
                        <p style={{
                            fontSize:'12px',
                            color:'4A545E',
                        }}>成大醫院 老人物理治療專科</p>
                    </div>
                </div>
            </div>
            <div className="shortinfo">
                <div className="clientnumber">
                    <img
                        src={infobg}
                    ></img>
                    <div className="numbercontent">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0'
                        }}>歷年病患</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>100+</p>
                    </div>
                </div>
                <div className="expyr">
                    <img
                        src={infobg}
                    ></img>
                    <div className="yrcontent">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0'
                        }}>年資</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>10年</p>
                    </div>
                </div>
                <div className="rate">
                    <img
                        src={infobg}
                    ></img>
                    <div className="ratecontent">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0'
                        }}>評價</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>4.67</p>
                    </div>
                </div>
            </div>
            <div className="about">
                <h3>about</h3>
                <p>我是Amy，
                    一位熱愛幫助人恢復健康的物理治療師，
                    致力於提供個性化的康復方案!</p>
            </div>
            <div className="timeselection">
                
                <div className="timebg">
                    <img
                        src={timebg}
                    ></img>
                </div>
                <div className="timecontent">
                    <p style={{
                        fontSize:'14px',
                        marginBottom:'5%',
                        color:'black'
                    }}>今日可預約時間</p>
                    <p style={{
                        fontSize:'17px',
                        fontWeight:'bold',
                        marginTop:'0',
                        color:'black'
                    }}>6 PM - 9 PM</p>
                </div>
                
                
                
            </div>
            <div className="chatroombtn">
                <Link to='/chatroom'>
                    <img
                        src={chatroombtn}
                    ></img>
                </Link>
                
            </div>
        </div>
    );
}

export default Appointment;