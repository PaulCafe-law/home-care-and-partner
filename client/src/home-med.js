import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import './home-med.css';
import personalPhoto from './images-home/personalphoto.svg';
import searchBg from './images-home/searchbg.svg';
import searchIcon from './images-home/searchicon.svg';
import filter from './images-home/filter.svg';
import introduction from './images-home/introduction.svg';
import clientform from './images-home-med/clientform.svg';
import social from './images-home/social.svg';
import ad from './images-home/ad.svg';
import cardbg1 from './images-appointment-med/cardbg1.svg';
import clientpic1 from './images-appointment-med/clientpic1.svg';
import appointment1 from './images-home-med/appointment1.svg';
import homepage from './images-home/homepage.svg';
import schedule from './images-home/schedule.svg';
import report from './images-home/report.svg';
import notification from './images-home/notification.svg';

// 跟後端有關
import axios from 'axios';

const HomePageMed = (handleCurrentPageChange) => {
    const navigate = useNavigate();
    // const { name } = useParams();
    const name = sessionStorage.getItem('name');
    // const gender = sessionStorage.getItem('gender');
    console.log("name:"+name )
    const email = sessionStorage.getItem('email');
    // console.log("gender:"+gender )
    const [specialization, setSpecialization] = useState('TEST職業');
    const professionalId = sessionStorage.getItem('professional_id')
    useEffect(() => {
        // 使用 Axios 向後端取得職業
        axios.get(`http://localhost:8080/user-specialization/${name}`)
          .then(response => {
            // 從回應中取得職業並設定到狀態中
            setSpecialization(response.data[0].specialization); // 假設回應是一個包含 username 的陣列
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    sessionStorage.setItem('specialization', specialization);

    // useEffect(() => {
    //     // 使用 Axios 向後端取得id
    //     axios.get(`http://localhost:8080/user-professional-id/${email}`)
    //       .then(response => {
    //         // 從回應中取得職業並設定到狀態中
    //         setProfessionalId(response.data[0].professional_id); // 假設回應是一個包含 username 的陣列
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   }, []);
    
    // sessionStorage.setItem('professional_id', professionalId);

    // 處理最近的預約
    const [clientname, setClientName] = useState('ClientName');
    const [gender, setGender] = useState('Gender');
    const [startTime, setStartTime] = useState('');
    const [serviceName, setServiceName] = useState('');
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
    useEffect(() => {
        console.log("professionalId:"+professionalId);
        // 從後端取得最近的預約資料
        axios.get(`http://localhost:8080/get-nearest-appointment-med/${professionalId}/${formattedDate}/${present_time}`)
        .then(response => {
            // setAppointmentData(response.data);
            console.log("response.data.username:"+response.data.username)
            
            if(!response.data.username){
                console.log("今天沒有預約了!")
                setClientName('今天沒有預約了!'); 
                setGender('');
                setStartTime('')
                setServiceName('')
                
                
            }
            else{
                console.log("response.data.full_name:"+response.data.full_name)
                setClientName(response.data.username); // 假設回應是一個包含 username 的陣列
                setGender(response.data.gender);
                setStartTime(response.data.appointment_start_time)
                setServiceName(response.data.service_name)
                
            }
            
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }, []);
    


    return(
        <div>
            <div className='header'>
                <p className='left-align hello'>👋Hello!</p>
                <p className='nameMed'>{name}{specialization}</p>
                <div className='photofhomemed'>
                    <Link to='/profilemed'>
                        <img
                            src={personalPhoto}
                        ></img>
                    </Link>
                    
                </div>
            </div>
            {/* <div className='search'>
                <img className='searchbg'
                    src={searchBg}
                ></img>
                <div className='searchicon'>
                    <img
                        src={searchIcon}
                    ></img>
                </div>
                <p className='searchtext'>搜尋有需要的患者..</p>
                <div className='searchfilter'>
                    <img
                        src={filter}
                    ></img>
                </div>
            </div> */}
            <div className='serviceItem'>
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
                        <p>自我介紹</p>
                    </div>
                    <div className='prescription'>
                        <Link to='/surveyform'>
                            <img
                                src={clientform}
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
                                whiteSpace: 'nowrap',
                                color:'black'
                            }}>患者表單</p>
                        </Link>
                            
                        
                        
                    </div>
                    <div className='social'>
                        <Link to='/calendarsmed'>
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
                                transform: 'translate(-50%, 0%)',
                                whiteSpace: 'nowrap'
                            }}>預約要求</p>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className='ad'>
                <img
                    src={ad}
                ></img>
            </div>
            <div className='appointment'>
                <h2 
                    style={{
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        marginTop: '0',
                        marginBottom: '0'
                    }}>即將到來的預約
                </h2>
                {/* <Link to='/clientdetailmed'>
                    <img
                        src={appointment1}
                        style={{
                            position: 'absolute',
                            top: '23.46%',
                            left: '0%'
                        }}>
                    </img>        
                </Link> */}
                <div className="cardsoftodayAppointment" >
                    
                    <div className="schedulesItemoftodayAppointment" >
                        <div className="bodytodayAppointment">
                            <Link to='/appointmentmed'>
                                <img src={cardbg1}></img>
                                <div className="photoftodayAppointment">
                                    <img src={clientpic1}></img>
                                </div>
                                <div className="infoftodayAppointment">
                                    <p style={{ fontSize: '14px' }}>{startTime}</p>
                                    <p style={{ fontSize: '19px', fontWeight: '2000', marginTop: '3%', marginBottom: '0%' }}>
                                        {clientname}{gender}
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
                    <Link to='/calendartoschedulemed'>
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
                    <Link to='/profilemed'>
                        <img
                            src={notification}
                        ></img>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default HomePageMed;