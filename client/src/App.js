import React, {Component, useState, useEffect, useRef} from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useRoutes } from 'react-router-dom';

import './App.css';
import HomePage from './home';
import Profile from './profile';
import HomePageMed from './home-med';
import AppointmentMed from './appointment-med';
import ScheduleMed from './schedule-med';
import Search from './search';
import Meddetail from './meddetail';
import AppointCalendar from './appointcalendar';
import Schedule from './schedule';
import ProfileMed from './profilemed';
import Appointment from './appointment';
import Chatroom from './chatroom';
import InitialPage from './initialpage';
import SignUp from './signup';
import Verification from './verification';
import ClientDetailMed from './clientdetail-med';
import ChatroomMed from './chatroom-med';
import SurveyForm from './surveyform';
import Payment from './payment';
import Calendars from './calendar';
import CalendarsMed from './calendar-med';
import CalendarToScheduleMed from './calendartoschedule-med';
import PersonalSetting from './personalsetting';
const App = () => {
  // const [currentPage, setCurrentPage] = useState("schedule");
  // const handleCurrentPageChange = (currentPage) => {
  //   setCurrentPage(currentPage);
  // };
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="homepage" index element={<HomePage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="homepagemed" element={<HomePageMed />} />
        <Route path="appointmentmed" element={<AppointmentMed />} />
        <Route path="schedulemed" element={<ScheduleMed />} />
        <Route path="search" element={<Search />} />
        <Route path="meddetail" element={<Meddetail />} />
        <Route path="appointcalendar" element={<AppointCalendar />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="profilemed" element={<ProfileMed />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="chatroom" element={<Chatroom />} />
        <Route path="initialpage" element={<InitialPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="verification" element={<Verification />} />
        <Route path="clientdetailmed" element={<ClientDetailMed />} />
        <Route path="chatroommed" element={<ChatroomMed />} />
        <Route path="surveyform" element={<SurveyForm />} />
        <Route path="payment" element={<Payment />} />
        <Route path="calendars" element={<Calendars />} />
        <Route path="calendarsmed" element={<CalendarsMed />} />
        <Route path="calendartoschedulemed" element={<CalendarToScheduleMed />} />
        <Route path="personalsetting" element={<PersonalSetting />} />
      </Routes>
    </div>
    
  );
}

export default App;
