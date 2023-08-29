import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './initialpage.css';
import topbg from './images-meddetail/topbg.svg';
import logo from './images-initialpage/logo.svg';
import titlebg from './images-meddetail/titlebg.svg';
import emailinput from './images-initialpage/emailinput.svg'
import loginbtn from './images-initialpage/loginbtn.svg';
import divideline from './images-initialpage/divideline.svg';
import googleloginbtn from './images-initialpage/googleloginbtn.svg';
import facebookloginbtn from './images-initialpage/facebookloginbtn.svg';

// 跟後端有關
import axios from 'axios';

const InitialPage = (handleCurrentPageChange) => {
    const navigate = useNavigate();

    // 檢查sessionstorage資料狀態開始
    console.log("sessionStorage:"+sessionStorage)
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(key, value);
        console.log("一個sessionstorage項目已顯示")
      }
    // 檢查sessionstorage資料狀態結束
    const [email, setEmail] = useState(''); // 初始化 email 狀態為空字串
    const handleEmailChange = (event) => {
        setEmail(event.target.value); // 更新 email 狀態
    };

    const [password, setPassword] = useState(''); // 初始化 email 狀態為空字串
    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // 更新 email 狀態
    };

    const handleLogin = () => {
        console.log("email:"+email)
        console.log("password:"+password)
        // 發送請求到後端
        axios.post('http://localhost:8080/checkLogin', { email, password })
          .then(response => {
            // 從後端收到回應後的處理
            if (response.data.success) {
              // 登入成功，執行你想要的操作
              console.log('登入成功');
              sessionStorage.setItem('user_id', response.data.user_id);
              sessionStorage.setItem('email', email);
              navigate('/homepage');
            } else {
              // 登入失敗，處理錯誤情況
              console.log('登入失敗');
              console.log('response.data.message'+response.data.message);
            }
          })
          .catch(error => {
            console.error('發生錯誤', error);
          });
      };
      

    return(
        <div>
            <div className="topofinitialpage">
                <div className="background">
                    <img
                        src={topbg}
                    ></img>
                </div>
                <div className="posterofinitialpage">
                    <img
                        src={logo}
                    ></img>
                    <h2 style={{
                        color: 'white'
                    }}>HOME C&P</h2>
                </div>
            </div>
            <div className="titleofmeddetail">
                <div className="titlebg">
                    <img
                        src={titlebg}
                    ></img>
                </div>
                <div className="introfinitialpage">
                    <div className="textofinitialpage">
                        <p style={{
                            fontSize:'19px',
                            fontWeight:'bold',
                            marginBottom:'0'
                        }}>Home Care and get Partner</p>
                        <p style={{
                            fontSize:'19px',
                            fontWeight:'bold',
                            color:'4A545E',
                        }}>登入/註冊頁面</p>
                    </div>
                </div>
            </div>
            <div className="mainloginbody">
                <div className="email"
                style={{
                    position:'absolute',
                    top:'0%',
                    width:'100%',
                    height:'28%'
                }}>
                    <p style={{
                        marginBottom:'0'
                    }}>使用者註冊信箱</p>
                    <input
                        type="text"
                        placeholder="輸入您的信箱"
                        style={{
                            position:'absolute',
                            left:'0',
                            border: '1px solid',
                            borderRadius: '10px',
                            width:'100%',
                            height:'50%'
                        }}
                         // 使用狀態中的 email 值
                        onChange={handleEmailChange} // 當輸入框內容變化時觸發的函式
                        >
                    </input>
                    
                </div>
                <div className="password" 
                style={{
                    position:'absolute',
                    top:'32%',
                    width:'100%',
                    height:'28%'
                }}>
                    <p style={{
                        marginBottom:'0',
                        marginTop:'3px'
                    }}>密碼</p>
                    <input
                        type="text"
                        placeholder="輸入您的密碼"
                        style={{
                            position:'absolute',
                            left:'0',
                            border: '1px solid',
                            borderRadius: '10px',
                            width:'100%',
                            height:'50%'
                        }}
                        // 使用狀態中的 email 值
                        onChange={handlePasswordChange} // 當輸入框內容變化時觸發的函式
                        >
                    </input>
                </div>
                <div className="loginbtn">
                    <img
                        src={loginbtn}
                        onClick={handleLogin}
                    ></img>
                </div>
                <div className="signup">
                    <p>New User? </p>&nbsp;
                    <Link to='/signup'>
                        <p style={{
                            textDecoration:'underline',
                            color:'#B19191'
                        }}>Sign Up</p>
                    </Link>
                    
                    
                </div>
            </div>
            <div className="divideline">
                <img
                    src={divideline}
                ></img>
                <p>或是使用以下方式登入</p>
                <img
                    src={divideline}
                ></img>
            </div>
            <div className="otherloginbody">
                <div className="googleloginbtn">
                    <img
                        src={googleloginbtn}
                    ></img>
                </div>
                <div className="facebookloginbtn">
                    <img
                        src={facebookloginbtn}
                    ></img>
                </div>
            </div>
            
        </div>
    );
}

export default InitialPage;