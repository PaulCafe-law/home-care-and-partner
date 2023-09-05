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
import ad from './images-home-med/ad.svg';
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
    const [professionalId, setProfessionalId] = useState('');
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

    useEffect(() => {
        // 使用 Axios 向後端取得職業
        axios.get(`http://localhost:8080/user-professional-id/${email}`)
          .then(response => {
            // 從回應中取得職業並設定到狀態中
            setProfessionalId(response.data[0].professional_id); // 假設回應是一個包含 username 的陣列
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    sessionStorage.setItem('professional_id', professionalId);

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
            <div className='search'>
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
                <Link to='/clientdetailmed'>
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