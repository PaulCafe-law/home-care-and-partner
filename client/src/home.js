import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './home.css';
import personalPhoto from './images-home/personalphoto.svg';
import searchBg from './images-home/searchbg.svg';
import searchIcon from './images-home/searchicon.svg';
import filter from './images-home/filter.svg';
import introduction from './images-home/introduction.svg';
import prescription from './images-home/prescription.svg';
import social from './images-home/social.svg';
import ad from './images-home/ad.svg';
import appointment1 from './images-home/appointment1.svg';
import homepage from './images-home/homepage.svg';
import schedule from './images-home/schedule.svg';
import report from './images-home/report.svg';
import notification from './images-home/notification.svg';
import cardbg1 from './images-appointment-med/cardbg1.svg';
import clientpic1 from './images-appointment-med/clientpic1.svg';
// 跟後端有關
import axios from 'axios';

const HomePage = (handleCurrentPageChange) => {
    const navigate = useNavigate();
    const email = sessionStorage.getItem('email');
    console.log("email:"+email)
    const [name, setName] = useState('Name');
    const [gender, setGender] = useState('Gender');
    useEffect(() => {
        // 使用 Axios 透過email向後端取得名字
        axios.get(`http://localhost:8080/user-backend-name/${email}`)
          .then(response => {
            // 從回應中取得名字並設定到狀態中
            setName(response.data[0].username); // 假設回應是一個包含 username 的陣列
            console.log("response.data[0].username:"+response.data[0].username)
            sessionStorage.setItem('name', response.data[0].username);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    // const handleProfileClick = () => {
    //     navigate(`/profile/${name}`);
    //   };  

    
    useEffect(() => {
        // 使用 Axios 向後端取得gender
        axios.get(`http://localhost:8080/user-gender/${email}`)
          .then(response => {
            // 從回應中取得名字並設定到狀態中
            console.log("response.data[0].gender:"+response.data[0].gender)
            sessionStorage.setItem('gender', response.data[0].gender);
            setGender(response.data[0].gender); // 假設回應是一個包含 username 的陣列
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    const user_id = sessionStorage.getItem('user_id')
    

    
    console.log("user_id:"+user_id)
    
    // const [appointmentData, setAppointmentData] = useState([]);
    const [medname, setMedName] = useState('MedName');
    const [startTime, setStartTime] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [professionalid, setProfessionalid] = useState('');
    // 建立現在時間來獲得最近的預約的資訊
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始，所以要加 1
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }
      
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const present_time = formatTime(currentDate); // 获取并格式化当前时间
    console.log("formattedDate:"+formattedDate); 
    console.log("present_time:"+present_time); // 输出 "HH:MM:SS" 格式的当前时间
      
    useEffect(() => {
        // 從後端取得最近的預約資料
        axios.get(`http://localhost:8080/get-nearest-appointment/${user_id}/${formattedDate}/${present_time}`)
        .then(response => {
            // setAppointmentData(response.data);
            // console.log("response.data:"+response.data)
            
            if(!response.data.full_name){
                console.log("今天沒有預約了!")
                setMedName('今天沒有預約了!'); 
                setStartTime('')
                setServiceName('')
                setSpecialization('')
                setProfessionalid('')
            }
            else{
                console.log("response.data.full_name:"+response.data.full_name)
                setMedName(response.data.full_name); // 假設回應是一個包含 username 的陣列
                setStartTime(response.data.appointment_start_time)
                setServiceName(response.data.service_name)
                setSpecialization(response.data.specialization)
                setProfessionalid(response.data.professional_id)
            }
            
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }, []);
    sessionStorage.setItem("med_id",professionalid)
    

    return(
        <div>
            <div className='header'>
                <p className='left-align hello'>👋Hello!</p>
                <p className='nameClient'>{name} {gender}</p>
                <div className='photofhome'>
                    {/* <img
                        src={personalPhoto}
                    ></img> */}
                </div>
            </div>
            <div className='search'>
                <img className='searchbg'
                    src={searchBg}
                ></img>
                <Link to='/search'>
                    <div className='searchicon'>
                        <img
                            src={searchIcon}
                        ></img>
                    </div>
                    <p className='searchtextofhome'>搜尋醫療人員..</p>
                </Link>
                
                <div className='searchfilter'>
                    <img
                        src={filter}
                    ></img>
                </div>
            </div>
            <div className='serviceItemofhomepage'>
                <h2 
                style={{
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    marginTop: '0',
                    marginBottom: '0'
                }}>服務項目</h2>
                <div className='items'>
                    <div className='introduction'>
                        <img
                            src={introduction}
                        ></img>
                        <p
                        style={{
                            position: 'absolute',
                            zIndex: '2',
                            top: '71.42%',
                            left: '50%',
                            marginTop: '0',
                            fontWeight: 'bold',
                            fontSize: '9px',
                            transform: 'translate(-50%, 0%)',
                            whiteSpace: 'nowrap'
                        }}>自我介紹</p>
                    </div>
                    <div className='prescription'>
                        <img
                            src={prescription}
                        ></img>
                        <p
                        style={{
                            position: 'absolute',
                            zIndex: '2',
                            top: '71.42%',
                            left: '50%',
                            marginTop: '0',
                            fontWeight: 'bold',
                            fontSize: '9px',
                            transform: 'translate(-50%, 0%)'
                        }}>處方籤</p>
                    </div>
                    <div className='social'>
                        <img
                            src={social}
                        ></img>
                        <p
                        style={{
                            position: 'absolute',
                            zIndex: '2',
                            top: '71.42%',
                            left: '50%',
                            marginTop: '0',
                            fontWeight: 'bold',
                            fontSize: '9px',
                            transform: 'translate(-50%, 0%)'
                        }}>社群</p>
                    </div>
                </div>
            </div>
            <div className='ad'>
                <img
                    src={ad}
                ></img>
            </div>
            <div className='appointmentoftodayAppointment'>
                <h2 
                    style={{
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        marginTop: '0',
                        marginBottom: '0'
                    }}>今天的最近預約
                </h2>
                
                    
                
                <div className="cardsoftodayAppointment" >
                    
                    <div className="schedulesItemoftodayAppointment" >
                        <div className="bodytodayAppointment">
                            <Link to='/appointment'>
                                <img src={cardbg1}></img>
                                <div className="photoftodayAppointment">
                                    <img src={clientpic1}></img>
                                </div>
                                <div className="infoftodayAppointment">
                                    <p style={{ fontSize: '14px' }}>{startTime}</p>
                                    <p style={{ fontSize: '19px', fontWeight: '2000', marginTop: '3%', marginBottom: '0%' }}>
                                        {medname}{specialization}
                                    </p>
                                    <p style={{ fontSize: '15px', opacity: '0.65' }}>{serviceName}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                </div>

                
            </div>
            <div className='navbar'>
                <div className='homepage'
                style={{
                    position: 'absolute',
                    left: '0%'
                }}>
                    <img
                        src={homepage}
                    ></img>
                </div>
                <div className='schedule'
                style={{
                    position: 'absolute',
                    left: '29.65%'
                }}>
                    <Link to='/calendars'>
                        <img
                            src={schedule}
                        ></img>
                    </Link> 
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
                    <Link to='/profile' >
                        <img
                            src={notification}
                        ></img>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default HomePage;