import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './signup.css';
import topbg from './images-meddetail/topbg.svg';
import logo from './images-initialpage/logo.svg';
import titlebg from './images-meddetail/titlebg.svg';
import emailinput from './images-initialpage/emailinput.svg'
import malebtn from './images-signup/malebtn.svg';
import femalebtn from './images-signup/femalebtn.svg';
import backbtn from './images-signup/backbtn.svg';
import continuebtn from './images-signup/continuebtn.svg';
const SignUp = (handleCurrentPageChange) => {

    const [selectedGender, setSelectedGender] = useState(null);
    const handleGenderSelection = (gender) => {
      setSelectedGender(gender);
      // 進行其他操作，例如將選擇的性別存儲到 state 或執行其他處理
    };
    const [name, setName] = useState(''); // 初始化 email 狀態為空字串
    const handleNameChange = (event) => {
        setName(event.target.value); // 更新 email 狀態
    };
    const [email, setEmail] = useState(''); // 初始化 email 狀態為空字串
    const handleEmailChange = (event) => {
        setEmail(event.target.value); // 更新 email 狀態
    };
    const [password, setPassword] = useState(''); // 初始化 email 狀態為空字串
    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // 更新 email 狀態
    };

    sessionStorage.setItem('signup-gender', selectedGender);
    sessionStorage.setItem('signup-name', name);
    sessionStorage.setItem('signup-password', password);
    sessionStorage.setItem('signup-email', email);

    console.log("sessionStorage:"+sessionStorage)
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(key, value);
        console.log("一個sessionstorage項目已顯示")
      }

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
                        }}>創建帳號</p>
                    </div>
                </div>
            </div>
            <div className="mainsignupbody">
                <div className="gender">
                    <p
                    style={{
                        position:'absolute',
                        left:'15%'
                    }}>性別</p>
                    <button
                        onClick={() => handleGenderSelection('male')}
                        style={{
                            position:'absolute',
                            width:'33%',
                            height:'80%',
                            borderRadius:'20px',
                            backgroundColor: selectedGender === 'male' ? 'pink' : 'transparent',
                        }}
                    >
                        男生
                    </button>
                    <button
                        onClick={() => handleGenderSelection('female')}
                        style={{
                            position:'absolute',
                            width:'33%',
                            height:'80%',
                            right:'0%',
                            borderRadius:'20px',
                            backgroundColor: selectedGender === 'female' ? 'pink' : 'transparent',
                        }}
                    >
                        女生
                    </button>
                </div>
                <div className="realname">
                    <p style={{
                        marginBottom:'0'
                    }}>使用者真實名稱</p>
                    <input
                        type="text"
                        placeholder="輸入您的姓名"
                        style={{
                            position:'absolute',
                            left:'0',
                            border: '1px solid',
                            borderRadius: '10px',
                            width:'100%',
                            height:'50%'
                        }}
                        onChange={handleNameChange}
                        >
                    </input>
                </div>
                <div className="emailofsignup">
                    <p style={{
                        marginBottom:'0',
                        marginTop:'3px'
                    }}>電子郵件</p>
                    <input
                        type="text"
                        placeholder="輸入您的email"
                        style={{
                            position:'absolute',
                            left:'0',
                            border: '1px solid',
                            borderRadius: '10px',
                            width:'100%',
                            height:'50%'
                        }}
                        onChange={handleEmailChange} // 當輸入框內容變化時觸發的函式
                        >
                    </input>
                </div>
                <div className="passwordofsignup">
                    <p style={{
                        marginBottom:'0',
                        marginTop:'3px'
                    }}>註冊密碼</p>
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
                        onChange={handlePasswordChange}
                        >
                    </input>
                </div>
                
            </div>
            
            <div className="backandnext">
                <Link to='/initialpage'>
                    <img
                        src={backbtn}
                    ></img>
                </Link>
                <Link to='/verification'>
                    <img
                        src={continuebtn}
                    ></img>
                </Link>
                
            </div>
            
        </div>
    );
}

export default SignUp;