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
    
    

    return(
        <div>
            <div className='header'>
                <p className='left-align hello'>👋Hello!</p>
                <p className='nameClient'>{name} {gender}</p>
                <div className='photofhome'>
                    <Link to='/profile' >
                        <img
                            src={personalPhoto}
                        ></img>
                    </Link>
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
            <div className='appointment'>
                <h2 
                    style={{
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        marginTop: '0',
                        marginBottom: '0'
                    }}>即將到來的預約
                </h2>
                <Link to='/appointment'>
                    <img
                        src={appointment1}
                        style={{
                            position: 'absolute',
                            top: '23.46%',
                            left: '0%'
                        }}>
                    </img>
                </Link>
                
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
                    <Link to='/schedule'>
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
                    <img
                        src={notification}
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default HomePage;