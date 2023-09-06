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
    // 狀態用於追踪選擇的選項
    const [selectedOption, setSelectedOption] = useState('');
    // 選項的數據
    const [options, setOptions] = useState([]);
    // 當選擇項目改變時的處理函式
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        
    };
    console.log("selectedOption:"+selectedOption)
    sessionStorage.setItem("selectedOption",selectedOption)

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

    useEffect(() => {
        // 在這裡呼叫 API，並根據返回的數據更新 options 狀態
        axios.get(`http://localhost:8080/get-professional-servicename/${professional_id}`) // 替換為實際的 API 端點
          .then(response => {
            // 在上述代碼中，response.data 是從 API 返回的數據陣列，
            // 而 serviceNames 則是根據每個數據元素的 service_name 屬性創建的新陣列。
            // 這樣，您就可以得到一個只包含 service_name 的陣列
            const serviceNames = response.data.map(service => service.service_name);
            setOptions(serviceNames);
            
          })
          .catch(error => {
            console.error('發生錯誤', error);
          });
      }, [professional_id]); // 在 professional_id 更改時重新執行 useEffect

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
                            marginBottom:'0'
                        }}>平台個案</p>
                        <p style={{
                            fontSize:'18px',
                            fontWeight:'bolder',
                            marginTop:'10%'
                        }}>{pnumber}次</p>
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
            <div className="aboutofmeddetail">
                <h3>about</h3>
                <p>{bio}</p>
            </div>
            <div className="dropdownofmeddetail">
                <h2>step1:&nbsp;選擇服務項目</h2>
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="">請選擇一個選項</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {/* <p>您選擇的服務是: {selectedOption}</p> */}
            </div>
            <div className="timeselectionofmeddetail">
                <h2>step2:&nbsp;預約時間</h2>
                <Link to='/appointcalendar'>
                    <div className="timebg">
                        <img
                            src={timebg}
                        ></img>
                    </div>
                    <div className="timecontentofmeddetail">
                        <h2 style={{
                            
                            fontWeight:'bold',
                            marginTop:'0',
                            color:'black',
                            whiteSpace:'nowrap'
                        }}>&nbsp;點我查看時間表</h2>
                    </div>
                </Link>
                
                
            </div>
        </div>
    );
}

export default Meddetail;