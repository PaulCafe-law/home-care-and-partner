import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';

import './appointment.css';
import topbg from './images-meddetail/topbg.svg';
import backArrow from './images-appointment/backarrow.svg';
import titlebg from './images-meddetail/titlebg.svg';
import medphoto from './images-meddetail/medphoto.svg';
import infobg from './images-meddetail/infobg.svg';
import timebg from './images-meddetail/timebg.svg';
import chatroombtn from './images-appointment/chatroombtn.svg';

// 跟後端有關
import axios from 'axios';

const Appointment = (handleCurrentPageChange) => {
    // 跟backarrow有關的開始

    // 使用 useLocation 钩子获取当前页面的路径
    const location = useLocation();
    
    
    // 检查 location.state 中的来源信息
    const isFromSchedule = location.state && location.state.from === 'schedule';
    console.log("location.state:"+location.state)
    console.log("isFromSchedule:"+isFromSchedule)
    // 根据来源信息设置返回链接的目标
    const backLinkTarget = isFromSchedule ? '/schedule' : '/homepage';
    var professional_id = sessionStorage.getItem('med_id');
    if(isFromSchedule){
        professional_id = location.state.professional_id;
        sessionStorage.setItem('med_id',professional_id)
    }
    console.log("med_id:"+professional_id)
    // 跟backarrow有關的結束
    
    const [name, setName] = useState('Name');
    const [specialization,setSpecialization] = useState('Specialization');
    const [expyear,setExpyear] = useState('ExpYear');
    const [rating,setRating] = useState('rating');
    const [pnumber,setPnumber] = useState('pnumber');
    const [bio,setBio] = useState('bio words');
    useEffect(() => {
        // 使用 Axios 透過professional_id向後端取得職業
        axios.get(`http://localhost:8080/professional-backend-spec/${professional_id}`)
            .then(response => {
            // 從回應中取得spec並設定到狀態中
            setName(response.data[0].full_name); 
            setSpecialization(response.data[0].specialization); // 假設回應是一個包含 username 的陣列
            console.log("response.data[0].specialization:"+response.data[0].specialization)
            setExpyear(response.data[0].experience_year);
            setRating(response.data[0].rating);
            setPnumber(response.data[0].patients_number);
            setBio(response.data[0].biography);
            })
            .catch(error => {
            console.error(error);
            });
        }, []);

    return(
        <div>
            <div className="topofappointment">
                <div className="backgroundofappointment">
                    <img
                        src={topbg}
                    ></img>
                </div>
                <div className="backarrowofappointment2">
                    <Link to={backLinkTarget} >
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
                        }}>{name}{specialization}</p>
                        {/* <p style={{
                            fontSize:'12px',
                            color:'4A545E',
                        }}>成大醫院 老人物理治療專科</p> */}
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
                            marginBottom:'0',
                            whiteSpace:'nowrap'
                        }}>平台個案</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>{pnumber}</p>
                    </div>
                </div>
                <div className="expyr">
                    <img
                        src={infobg}
                    ></img>
                    <div className="yrcontent">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0',
                            whiteSpace:'nowrap'
                        }}>年資</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%',
                            whiteSpace:'nowrap'
                        }}>{expyear}年</p>
                    </div>
                </div>
                <div className="rate">
                    <img
                        src={infobg}
                    ></img>
                    <div className="ratecontent">
                        <p style={{
                            fontSize:'14px',
                            marginBottom:'0',
                            whiteSpace:'nowrap'
                        }}>評價</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%',
                            whiteSpace:'nowrap'
                        }}>{rating}</p>
                    </div>
                </div>
            </div>
            <div className="about">
                <h3>about</h3>
                <p>{bio}</p>
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