import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useParams } from 'react-router-dom';

import './clientdetail-med.css';
import topbg from './images-meddetail/topbg.svg';
import backArrow from './images-meddetail/backarrow.svg';
import titlebg from './images-meddetail/titlebg.svg';
import clientphoto from './images-clientdetail-med/clientphoto.svg';
import infobg from './images-meddetail/infobg.svg';
import timebg from './images-meddetail/timebg.svg';
import chatroombtn from './images-clientdetail-med/chatroombtn.svg';
const ClientDetailMed = (handleCurrentPageChange) => {
    const { name } = useParams();
    console.log("username:"+name)
    return(
        <div>
            <div className="topofmeddetail">
                <div className="background">
                    <img
                        src={topbg}
                    ></img>
                </div>
                <div className="backarrowofmeddetail">
                    <Link to={`/homepagemed`}>
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
            <div className="titleofmeddetail">
                <div className="titlebg">
                    <img
                        src={titlebg}
                    ></img>
                </div>
                <div className="intro">
                    <div className="photo">
                        <img
                            src={clientphoto}
                        ></img>
                    </div>
                    <div className="text">
                        <p style={{
                            fontSize:'19px',
                            fontWeight:'bold',
                            marginBottom:'0'
                        }}>個案&nbsp;林小民先生</p>
                        <p style={{
                            fontSize:'12px',
                            color:'4A545E',
                        }}>台南市&nbsp;東區&nbsp;東寧路111號</p>
                    </div>
                </div>
            </div>
            <div className="shortinfo">
                <div className="chronic">
                    <img
                        src={infobg}
                    ></img>
                    <div className="chronicstatus">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0',
                            textAlign:'center'
                        }}>慢性病有無</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%',
                            textAlign:'center'
                        }}>有</p>
                    </div>
                </div>
                <div className="years">
                    <img
                        src={infobg}
                    ></img>
                    <div className="yearscontent">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0'
                        }}>年齡</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>76歲</p>
                    </div>
                </div>
                <div className="genderofclientdetail">
                    <img
                        src={infobg}
                    ></img>
                    <div className="gendercontent">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0'
                        }}>性別</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>男</p>
                    </div>
                </div>
            </div>
            
            <div className="clientpersonalinformation">
                
                    <div className="timebgofclientdetailmed">
                        <img
                            src={timebg}
                        ></img>
                    </div>
                    <div className="servicetime">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'5%',
                            color:'black'
                        }}>患者個人資訊</p>
                        <p style={{
                            fontSize:'14px',
                            fontWeight:'bold',
                            marginTop:'0',
                            color:'black',
                            whiteSpace:'nowrap'
                        }}>身高、體重、BMI、血糖...</p>
                    </div>
                
            </div>
            <div className="clienthealthplan">
                
                    <div className="timebgofclientdetailmed">
                        <img
                            src={timebg}
                        ></img>
                    </div>
                    <div className="servicetime">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'5%',
                            color:'black'
                        }}>健康計畫</p>
                        <p style={{
                            fontSize:'14px',
                            fontWeight:'bold',
                            marginTop:'0',
                            color:'black',
                            whiteSpace:'nowrap'
                        }}>症狀評估、照護措施...</p>
                    </div>
                
            </div>
            <div className="servicetimeselection">
                
                    <div className="timebgofclientdetailmed">
                        <img
                            src={timebg}
                        ></img>
                    </div>
                    <div className="servicetime">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'5%',
                            color:'black'
                        }}>預約服務時間</p>
                        <p style={{
                            fontSize:'14px',
                            fontWeight:'bold',
                            marginTop:'0',
                            color:'black',
                            whiteSpace:'nowrap'
                        }}>8/12 9:30 AM-10:30 AM</p>
                    </div>
                
            </div>
            <div className="chatroomofclientdetailmed">
                <Link to={`/chatroommed`}>
                    <img
                        src={chatroombtn}
                    ></img>
                </Link>
                
            </div>
        </div>
    );
}

export default ClientDetailMed;