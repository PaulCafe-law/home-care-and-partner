import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import './calendar.css';

import backArrow from './images-appointment-med/backarrow.svg';



// 跟後端有關
import axios from 'axios';

const Calendars = (handleCurrentPageChange) =>{
    // 處理日曆功能
    const [selectedDate, setSelectedDate] = useState(new Date());
    

    // 處理時間選擇功能
    const professionalId = sessionStorage.getItem("professional_id")
    console.log("professionalId:"+professionalId)
    const serviceName = sessionStorage.getItem("selectedOption")
    console.log("serviceName:"+serviceName)
    const [timeSlots, setTimeSlots] = useState([]); //把從後端傳來的時間加進去timeslots array裡面
    // 處理價格顯示
    const [price,setPrice] = useState('0');
    
    

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
        
    };

    

    


    return(
        <div>
            <div className="headerofcalendar">
                <div className="backarrowofcalendar">
                    <Link to='/homepage'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                    
                </div>
                <div className="titleofcalendar">
                    <h2>行事曆</h2>
                </div>
            </div>
            <div className="body">
                {/* <img
                    src={datepicker}
                ></img> */}
                
                <Link to="/schedule" className="link-no-underline">
                    <Calendar 
                        onChange={handleDateChange} 
                        value={selectedDate} 
                        defaultView="month"
                        className="custom-calendar"
                        
                    />
                </Link>
            </div>
            
        </div>
    );
}

export default Calendars;