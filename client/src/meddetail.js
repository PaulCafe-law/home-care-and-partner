import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './meddetail.css';
import topbg from './images-meddetail/topbg.svg';
import backArrow from './images-meddetail/backarrow.svg';
import titlebg from './images-meddetail/titlebg.svg';
import medphoto from './images-meddetail/medphoto.svg';
import infobg from './images-meddetail/infobg.svg';
import timebg from './images-meddetail/timebg.svg';

// 跟後端有關
import axios from 'axios';

const Meddetail = (handleCurrentPageChange) => {
    const professional_id = sessionStorage.getItem('professional_id');
    console.log("professional_id:"+professional_id)

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
            <div className="topofmeddetail">
                <div className="background">
                    <img
                        src={topbg}
                    ></img>
                </div>
                <div className="backarrowofmeddetail">
                    <Link to='/search'>
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
                            src={medphoto}
                        ></img>
                    </div>
                    <div className="text">
                        <p style={{
                            fontSize:'19px',
                            fontWeight:'bold',
                            marginBottom:'0'
                        }}>{name}{specialization}</p>
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
                            marginBottom:'0'
                        }}>年資</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
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
                            marginBottom:'0'
                        }}>評價</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>{rating}</p>
                    </div>
                </div>
            </div>
            <div className="about">
                <h3>about</h3>
                <p>{bio}</p>
            </div>
            <div className="timeselection">
                <Link to='/appointcalendar'>
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
                </Link>
                
                
            </div>
        </div>
    );
}

export default Meddetail;