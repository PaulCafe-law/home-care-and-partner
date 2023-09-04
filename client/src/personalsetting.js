import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import './personalsetting.css';
import backArrow from './images-appointment-med/backarrow.svg';
import infobg from './images-personalsetting/infobg.svg';

// 跟後端有關
import axios from 'axios';

const PersonalSetting = (handleCurrentPageChange) => {
    const canvasStyle = {
        width: '360px',
        height: '780px',
        backgroundColor: '#FFFFFF'
      };
    // 用參數來傳遞姓名和性別
    // const { name, gender } = useParams();
    const user_id = sessionStorage.getItem('user_id')
    const name = sessionStorage.getItem('name');
    const gender = sessionStorage.getItem('gender');
    const email = sessionStorage.getItem('email');
    console.log("name:"+name )
    console.log("gender:"+gender )
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // 发送 GET 请求
    axios.get(`http://localhost:8080/get-user-info/${user_id}`)
    .then((response) => {
        // 处理从服务器返回的用户信息数据，例如将其存储在状态中以在界面上显示
        const userInfo = response.data;
        console.log('用户信息:', userInfo);
        setBirthday(userInfo.date_of_birth)
        setPhone(userInfo.phone)
        setAddress(userInfo.address)
    })
    .catch((error) => {
        console.error('获取用户信息失败', error);
    });

      
      
    

    return(
        <div style={canvasStyle}>
            <div className="headerofpersonalsetting">
                <div className="backarrowofsetting">
                    <Link to='/profile'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                </div>
                <div className="titleofsetting">
                    <h2>個人資料設定</h2>
                </div>
            </div>
            <div className='basicInfofsetting'>
                <h3 className="smalltopic">基本資料</h3>
                <div className="bgofbasicInfo">
                    <button 
                        className="infostyle"
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                    }}>
                        <span>真實姓名</span>
                        <span>{name}</span>
                    </button>
                    <button className="infostyle"
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                    }}>
                        <span>出生年月日</span>
                        <span>{birthday}</span>
                        
                    </button>
                    <button className="infostyle"
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                    }}>
                        <span>電話</span>
                        <span>{phone}</span>
                    </button>
                    <button className="infostyle"
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                    }}>
                        
                        <span>Email</span>
                        <span>{email}</span>
                    </button>
                    <button className="infostyle"
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                    }}>
                        <span>地址</span>
                        <span>{address}</span>
                    </button>
                </div>
            </div>
            <div className='aidataofsetting'>
                <h3 className="smalltopic">AI數據</h3>
                <div className="bgofaidata">
                    <button className="infostyle">
                        {/* 在按钮内部添加内容 */}
                        匯入健康存摺資料
                    </button>
                    <button className="infostyle">
                        {/* 在按钮内部添加内容 */}
                        處方籤紀錄
                    </button>
                    <button className="infostyle">
                        {/* 在按钮内部添加内容 */}
                        飲食拍照上傳
                    </button>
                </div>
            </div>
            <div className='historyofsetting'>
                <h3 className="smalltopic">個案紀錄</h3>
                <div className="bgofhistory">
                    <button className="infostyle"
                        // onClick={handleButtonClick} // 在这里添加按钮点击的处理函数
                    >
                        {/* 在按钮内部添加内容 */}
                        過去預約和照護記錄
                    </button>

                    
                </div>
            </div>
            <div className='paymentofsetting'>
                <h3 className="smalltopic">支付相關</h3>
                <div className="bgofpayment">
                    <button className="infostyle">
                        {/* 在按钮内部添加内容 */}
                        設定支付方式
                    </button>
                    <button className="infostyle">
                        {/* 在按钮内部添加内容 */}
                        帳單明細
                    </button>
                </div>
            </div>
            
            
            
            
        </div>
    )
}

export default PersonalSetting;