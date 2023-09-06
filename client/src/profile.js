import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import './profile.css';
import backArrow from './images-profile/backarrow.svg';
import client from './images-profile/client.svg';
import setting from './images-profile/setting.svg';
import toMed from './images-profile/tomed.svg';
import joinMed from './images-profile/joinmed.svg';
import logoutbtn from './images-profile/logoutbtn.svg';

// 跟後端有關
import axios from 'axios';

const Profile = (handleCurrentPageChange) => {
    const canvasStyle = {
        position: 'absolute',
        width: '360px',
        height: '780px',
        backgroundColor: '#1C6BA4',
        left: '50%',
        transform: 'translate(-50%,0)'
      };
    // 用參數來傳遞姓名和性別
    // const { name, gender } = useParams();
    const name = sessionStorage.getItem('name');
    const gender = sessionStorage.getItem('gender');
    console.log("name:"+name )
    console.log("gender:"+gender )

    console.log("sessionStorage:"+sessionStorage)
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(key, value);
        console.log("一個sessionstorage項目已顯示")
      }
      
    const user_id = sessionStorage.getItem('user_id');
    const navigate = useNavigate();
    const handleMedLinkClick = async () => {
        try {
          const responseOfRole = await axios.get(`http://localhost:8080/checkUserRole/${name}`); // 替換成實際的後端路由
          const userRole = responseOfRole.data[0].role; // 假設後端回傳的資料中有 role 屬性
      
          if (userRole === 'med') {
            const responseOfProId = await axios.get(`http://localhost:8080/get-users-professionalId/${user_id}`); // 替換成實際的後端路由
            const professional_id = responseOfProId.data[0].professional_id; // 假設後端回傳的資料中有 role 屬性
            sessionStorage.setItem('professional_id',professional_id)
            navigate(`/homepagemed`); // 如果使用者的 role 是 med，則導航到 homepagemed
          } else {
            // 在這裡可以執行其他操作，例如顯示錯誤訊息
            console.log("您不是醫療人員，請先去註冊成為醫療人員")
          }
        } catch (error) {
          console.error('Error checking user role:', error);
        }
      };

    const handleLogout = () => {
    // 清空 sessionStorage
    sessionStorage.clear();
    };

    return(
        <div style={canvasStyle}>
            <div className="backarrowofprofile">
            <Link to='/homepage'>
                <img
                    src={backArrow}
                ></img>
            </Link>  
            </div>
            <div className="photofprofile">
                <img
                    src={client}
                ></img>
            </div>
            <div className="infofprofile">
                <div className="nameofprofile">
                    <p>{name}&nbsp;{gender}</p>
                </div>
                <div className="address">
                    <p>台南市 東區</p>
                </div>
            </div>
            <div className="itemsofProfile">
                <div className="setting">
                    <Link to='/personalsetting'>
                        <img
                            src={setting}
                        ></img>
                    </Link>
                </div>
                <div className="toMed">
                    <Link to='#' onClick={handleMedLinkClick}>
                        <img
                            src={toMed}
                        ></img>
                    </Link>  
                </div>
                <div className="joinMed">
                    
                    <img
                        src={joinMed}
                    ></img>
                    
                </div>
                
            </div>
            <div className="logoutbtn">
                <Link to='/initialpage' onClick={handleLogout}>
                    <img
                        src={logoutbtn}
                    ></img>
                </Link>
                
            </div>
        </div>
    )
}

export default Profile;