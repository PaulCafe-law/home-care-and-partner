import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './verification.css';
import topbg from './images-meddetail/topbg.svg';
import logo from './images-initialpage/logo.svg';
import titlebg from './images-meddetail/titlebg.svg';
import emailinput from './images-initialpage/emailinput.svg'
import malebtn from './images-signup/malebtn.svg';
import femalebtn from './images-signup/femalebtn.svg';
import backbtn from './images-signup/backbtn.svg';
import finishbtn from './images-verification/finishbtn.svg';
import verificationinput from './images-verification/verificationinput.svg'; 
import sendbtn from './images-verification/sendbtn.svg';

// 跟後端有關
import axios from 'axios';


const SignUp = (handleCurrentPageChange) => {
    const navigate = useNavigate();

    console.log("sessionStorage:"+sessionStorage)
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(key, value);
        console.log("一個sessionstorage項目已顯示")
      }

    var gender = sessionStorage.getItem('signup-gender');
    if(gender =='male'){
        gender = '先生'
    }
    else{
        gender = '小姐'
    }
    const name = sessionStorage.getItem('signup-name');
    const email = sessionStorage.getItem('signup-email');
    const password = sessionStorage.getItem('signup-password');
    const role = 'normal'
    const handleFinishButtonClick = () => {
        const data = {
          gender: gender,
          name: name,
          email: email,
          password: password,
          role: role,
        };
    
        axios.post('http://localhost:8080/addUser', data)
          .then(response => {
            if (response.data.success) {
              console.log('新增使用者成功');
              // 導航到目標頁面，例如 HomePage
              navigate('/initialpage');
            } else {
              console.log('新增使用者失敗');
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
                        }}>驗證身分</p>
                    </div>
                </div>
            </div>
            <div className="mainsignupbody">
                
                <div className="phonenumber">
                    <p style={{
                        marginBottom:'0'
                    }}>手機號碼</p>
                    <img
                        src={emailinput}
                    ></img>
                </div>
                <div className="sendbtnofverification">
                    <img
                        src={sendbtn}
                    ></img>
                </div>
                <div className="verificationcode">
                    <p style={{
                        marginBottom:'0',
                        marginTop:'3px'
                    }}>驗證碼</p>
                    <img
                        src={verificationinput}
                    ></img>
                </div>
                
                
            </div>
            
            <div className="backandnext">
                <Link to='/signup'>
                    <img
                        src={backbtn}
                    ></img>
                </Link>
                
                <img
                    src={finishbtn}
                    onClick={handleFinishButtonClick}
                ></img>
                
                
            </div>
            
        </div>
    );
}

export default SignUp;