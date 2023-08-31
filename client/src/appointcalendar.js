import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import './appointcalendar.css';

import backArrow from './images-appointment-med/backarrow.svg';

import timebg from './images-appointcalendar/timebg.svg';
import options from './images-appointcalendar/options.svg';
import appointbtn from './images-appointcalendar/appointbtn.svg';

// 跟後端有關
import axios from 'axios';

const AppointCalendar = (handleCurrentPageChange) =>{
    // 處理日曆功能
    const [selectedDate, setSelectedDate] = useState(new Date());
    useEffect(()=>{
        // 先初始formattedDate，避免使用者先直接按幾點而導致沒有存日期進sessionStorage
        sessionStorage.setItem("formattedDate",formatDate(new Date()))
    },[]);
    //讓今天的資料不用重新整理就可以出現    
    useEffect(() => {
        // 一開始就呼叫資料
        fetchData(formatDate(selectedDate));
    }, []); // 空數組表示只在組件載入時執行

    // 處理時間選擇功能
    const professionalId = sessionStorage.getItem("professional_id")
    console.log("professionalId:"+professionalId)
    const serviceName = sessionStorage.getItem("selectedOption")
    console.log("serviceName:"+serviceName)
    const [timeSlots, setTimeSlots] = useState([]); //把從後端傳來的時間加進去timeslots array裡面
    // 處理價格顯示
    const [price,setPrice] = useState('0');
    // 處理button變色
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    console.log("activeButtonIndex:"+activeButtonIndex)
    // 處理日曆變化
    const fetchData = (formattedDate) => {
        console.log("formattedDate:"+formattedDate)
        // setSelectedDate(date);
        // 將選擇的日期傳送到後端
        axios.get(`http://localhost:8080/get-service-hours/${professionalId}/${serviceName}`, {
            params: {
                date: formattedDate // 格式化日期為符合後端的格式
            }
        })
        .then(response => {
            setTimeSlots(response.data.map(slot => slot.start_time));
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
      };

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        sessionStorage.setItem("formattedDate",formattedDate)
        fetchData(formattedDate);
    };

    // 時間選擇被按下
    const handleTimeSlotClick = (time,index) => {
        // 在這裡處理按鈕點擊事件，可以選擇時段或執行其他操作
        // e.preventDefault(); // 阻止瀏覽器的默認行為
        if (activeButtonIndex === index) {
            setActiveButtonIndex(null); // 按下已選取的按鈕，取消選取
            console.log('取消的時段:', time);
        } else {
            setActiveButtonIndex(index); // 按下其他按鈕，設置選取的按鈕
            console.log('選擇了時段:', time);
        }
    };  

    const fetchPrice = () =>{
        axios.get(`http://localhost:8080/get-service-price/${professionalId}/${serviceName}`)
        .then(response => {
            setPrice(response.data[0].base_price);
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }


    return(
        <div>
            <div className="headerofappointcalendar">
                <div className="backarrowofappointcalendar">
                    <Link to='/meddetail'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                    
                </div>
                <div className="titleofappointcalendar">
                    <h2>行事曆</h2>
                </div>
            </div>
            <div className="body">
                {/* <img
                    src={datepicker}
                ></img> */}
                <Calendar 
                    onChange={handleDateChange} 
                    value={selectedDate} 
                    defaultView="month"
                />
            </div>
            <div className="timeoption">
                <div className='bg'>
                    <img
                        src={timebg}
                    ></img>
                </div>
                <div className='topicofcalendar'>
                    <h2>Time</h2>
                </div>
                <div className='timeselect'>
                    {/* <img
                        src={options}
                    ></img> */}
                    <div className='timelements'>
                        <div className="row1">
                            {timeSlots.slice(0, 3).map((time, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => {
                                        handleTimeSlotClick(time,index);
                                        fetchPrice();
                                        sessionStorage.setItem("appoint_starttime", time); // 設置 sessionStorage
                                    }}
                                    className={activeButtonIndex === index ? 'active' : ''}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <div className="row2">
                            {timeSlots.slice(3, 6).map((time, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => {
                                        handleTimeSlotClick(time,index+3);
                                        fetchPrice();

                                    }}
                                    className={activeButtonIndex === index+3 ? 'active' : ''}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='appointbtn'>
                    <Link to='/payment'>
                        <img
                            src={appointbtn}
                        ></img>
                        <div className='textofappointbtn'>
                            <p style={{
                                marginBottom:'0',
                                marginTop:'0',
                                fontWeight:'bold'
                            }}>預約{serviceName}</p>
                            <p style={{
                                marginTop:'0',
                                fontWeight:'bold'
                            }}>-NTD:&nbsp;{price}元</p>
                        </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default AppointCalendar;