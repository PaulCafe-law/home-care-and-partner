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
        backgroundColor: '#FFFFFF',
        
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
    // 編輯名字
    const [buttonTextofname, setButtonTextofname] = useState(name);
    const handleEditClick = () => {
        const newValue = prompt('請輸入新的真實姓名：');
        if (newValue !== null) {
            setButtonTextofname(newValue);
            sessionStorage.setItem('name', newValue);
            // 发送 POST 请求来更新数据库中的用户名
            axios.post(`http://localhost:8080/update-username/${user_id}`, {
                newUsername: newValue,
            })
                .then((response) => {
                    // 处理成功响应
                    console.log('用户名已更新');
                })
                .catch((error) => {
                    console.error('更新用户名失败', error);
                });
        }
    };
    
    // 发送 GET 请求
    axios.get(`http://localhost:8080/get-user-info/${user_id}`)
    .then((response) => {
        // 处理从服务器返回的用户信息数据，例如将其存储在状态中以在界面上显示
        const userInfo = response.data;
        console.log('用户信息:', userInfo);
        setBirthday(userInfo.date_of_birth)
        setPhone(userInfo.phone)
        setAddress(userInfo.address)
        // 在这里设置 buttonTextof 的各項初始值
        setButtonTextofbirth(userInfo.date_of_birth);
        setButtonTextofphone(userInfo.phone)
        setButtonTextofemail(userInfo.email)
        setButtonTextofaddress(userInfo.address)
    })
    .catch((error) => {
        console.error('获取用户信息失败', error);
    });
    // 編輯出生年月日
    const [buttonTextofbirth, setButtonTextofbirth] = useState('');
    const handleEditClickbirth = () => {
        const newValue = prompt('請輸入新的生日：');
        if (newValue !== null) {
            setButtonTextofbirth(newValue);
            // 发送 POST 请求来更新数据库中的生日
            axios.post(`http://localhost:8080/update-user-birthday/${user_id}`, {
                newBirthday: newValue,
            })
                .then((response) => {
                    // 处理成功响应
                    console.log('用户名已更新');
                })
                .catch((error) => {
                    console.error('更新用户名失败', error);
                });
        }
    };
    // 編輯手機號碼
    const [buttonTextofphone, setButtonTextofphone] = useState('');
    const handleEditClickphone = () => {
        const newValue = prompt('請輸入新的電話：');
        if (newValue !== null) {
            setButtonTextofphone(newValue);
            // 发送 POST 请求来更新数据库中的生日
            axios.post(`http://localhost:8080/update-user-phone/${user_id}`, {
                newPhonenumber: newValue,
            })
                .then((response) => {
                    // 处理成功响应
                    console.log('用户手機號碼已更新');
                })
                .catch((error) => {
                    console.error('更新用户手機失败', error);
                });
        }
    };
    // 編輯email
    const [buttonTextofemail, setButtonTextofemail] = useState('');
    const handleEditClickemail = () => {
        const newValue = prompt('請輸入新的email：');
        if (newValue !== null) {
            setButtonTextofemail(newValue);
            // 发送 POST 请求来更新数据库中的生日
            axios.post(`http://localhost:8080/update-user-email/${user_id}`, {
                newEmail: newValue,
            })
                .then((response) => {
                    // 处理成功响应
                    console.log('用户email已更新');
                })
                .catch((error) => {
                    console.error('更新用户email失败', error);
                });
        }
    };

    // 編輯address
    const [buttonTextofaddress, setButtonTextofaddress] = useState('');
    const handleEditClickaddress = () => {
        const newValue = prompt('請輸入新的住址：');
        if (newValue !== null) {
            setButtonTextofaddress(newValue);
            // 发送 POST 请求来更新数据库中的住址
            axios.post(`http://localhost:8080/update-user-address/${user_id}`, {
                newAddress: newValue,
            })
                .then((response) => {
                    // 处理成功响应
                    console.log('用户address已更新');
                })
                .catch((error) => {
                    console.error('更新用户address失败', error);
                });
        }
    };
      
      
    

    return(
        <div >
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
                        }}
                        onClick={handleEditClick}
                    >
                        <span>真實姓名</span>
                        <span>{buttonTextofname}</span>
                    </button>
                    <button className="infostyle"
                        style={{ 
                            
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                        }}
                        onClick={handleEditClickbirth}
                    >
                        <span>出生年月日</span>
                        <span>{buttonTextofbirth}</span>
                        
                    </button>
                    <button className="infostyle"
                        style={{ 
                            
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                        }}
                        onClick={handleEditClickphone}
                    >
                        <span>電話</span>
                        <span>{buttonTextofphone}</span>
                    </button>
                    <button className="infostyle"
                        style={{ 
                            
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                        }}
                        onClick={handleEditClickemail}
                    >
                        
                        <span>Email</span>
                        <span>{buttonTextofemail}</span>
                    </button>
                    <button className="infostyle"
                        style={{ 
                            
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            alignItems: 'center' 
                        }}
                        onClick={handleEditClickaddress}
                    >
                        <span>地址</span>
                        <span>{buttonTextofaddress}</span>
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
                <div className="bgofpaymentofsetting">
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