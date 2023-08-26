import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import './appointcalendar.css';

import backArrow from './images-appointment-med/backarrow.svg';
import datepicker from './images-appointcalendar/datepicker.svg';
import timebg from './images-appointcalendar/timebg.svg';
import options from './images-appointcalendar/options.svg';
import appointbtn from './images-appointcalendar/appointbtn.svg';

const AppointCalendar = (handleCurrentPageChange) =>{

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
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
                <Calendar onChange={handleDateChange} value={selectedDate} />
            </div>
            <div className="timeoption">
                <div className='bg'>
                    <img
                        src={timebg}
                    ></img>
                </div>
                <div className='topic'>
                    <h2>Time</h2>
                </div>
                <div className='timeselect'>
                    <img
                        src={options}
                    ></img>
                </div>
                <div className='appointbtn'>
                    <Link to='/schedule'>
                        <img
                            src={appointbtn}
                        ></img>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default AppointCalendar;