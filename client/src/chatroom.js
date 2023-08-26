import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useParams } from 'react-router-dom';

import './chatroom.css';
import headerbg from './images-chatroom/headerbg.svg';
import backarrow from './images-chatroom/backarrow.svg';
import photo from './images-chatroom/photo.svg';
import bottombg from './images-chatroom/bottombg.svg';
import messagebg from './images-chatroom/messagebg.svg';
import sendbtn from './images-chatroom/sendbtn.svg';
import functionsbtn from './images-chatroom/functionsbtn.svg';
import camera from './images-chatroom/camera.svg';
const Chatroom = (handleCurrentPageChange) => {
    const username = sessionStorage.getItem('name');
    // 跟message有關開始
    const prevHtml = [];
    const [socket, setSocket] = useState(null);
    const [myName, setMyName] = useState(`${username}`);
    const [message, setMessage] = useState('');
    const [currentHtml, setCurrentHtml] = useState([]); //message訊息
    // 跟socket相關
    useEffect(() => {
        // const socket = io('http://luffy.ee.ncku.edu.tw:7782');
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);

        // 當組件被卸載時（例如，組件從 DOM 中移除時）會執行。在這個清理函式中，關閉 WebSocket 連線以釋放資源。
        return () => {
        // socket.disconnect();
        socket.close();
        };
    }, []);

    useEffect(() => {
        if (socket) {
        // socket.on('connect', () => {
        //   // 连接成功
        // });
        socket.onopen = () => {
            // 连接成功
            console.log("socket連接成功")
        };

        // socket.on('disconnect', () => {
        //   // 连接断开
        // });
        socket.onclose = () => {
            // 连接断开
            console.log("socket連接斷開")
        };

        // socket.on('receiveMessage', (data) => {
        //   showMessage(data);
        // });

        // 這個是socket對象 "連接網址改變時才會改變的東東"
        // 當 WebSocket 連線從後端server接收到訊息時，這個回調函式就會被觸發。
        socket.onmessage = (event) => {
            console.log("有進入onmessage");
            console.log("event.data:"+event.data)
            const messageData = JSON.parse(event.data); // 解析接收到的消息数据
            console.log("messageData:"+messageData)
            console.log("messageData.data.username:"+messageData.data.username)
            // 处理聊天消息
            // const {username, message} = messageData.data;
            console.log("前端接受到的name:"+messageData.data.username)
            // const message = messageData.message;
            console.log("前端接受到的message:"+messageData.data.message)
            // 更新聊天界面显示接收到的消息
            // updateChatUI(username, message);
            showMessage(messageData )
        };
        }
    }, [socket,currentHtml]);
    const sendMessage = () => {
        // 檢查訊息是否為非空白字串。如果訊息不是空白字串，則執行以下內容
        if (message.trim() !== '') {
          // socket.emit('sendMessage', { username: myName, message });
          // setMessage('');
          // console.log(inputValue);
          // setInputValue(''); // 清空輸入框
          console.log("myName1:"+myName);
          // 宣告一個 JavaScript 物件 data，包含 username 和 message 兩個屬性。myName 和 message 是在函式範圍內聲明的變數。
          const data = { username: myName, message };
          
          console.log("myName2:"+myName);
          console.log("data name:"+data.username);
          console.log("data message:"+data.message);
          // 這行程式碼將 data 物件轉換成 JSON 字串，然後透過 WebSocket 連線發送給伺服器。
          socket.send(JSON.stringify(data));
          setMessage('');
        //   showMessage({ username: myName, message }); // 更新自己的聊天室内容
        }
      };

    // 更新聊天界面顯示接收到的消息得函式
    const showMessage = (data) => {
        console.log("xxxxx");
        console.log("present name:"+myName)
        console.log("回傳來的 name:"+data.data.username)
        console.log("回傳來的message:"+data.data.message)
        console.log("true of false:"+(data.data.username === myName));
        const html = (data.data.username === myName)? (
            <div className="chat-item item-right clearfix">
                <span className="abs uname">me</span>
                <span className="message fr">{data.data.message}</span>
            </div>
        ) : (
            <div className="chat-item item-left clearfix rela">
                <span className="abs uname">{data.data.username}</span>
                <span className="fl message">{data.data.message}</span>
            </div>
        );
        console.log("html:"+html);
        // console.log("chatLog:"+chatLog);
        console.log("prevHtml1:"+prevHtml);
        // 將創建的 HTML 元素 html 添加到目前狀態 currentHtml 的陣列中，
        // 從而更新界面上的聊天室內容
        setCurrentHtml((prevHtml) => [...prevHtml, html]);
        console.log("prevHtml2:"+prevHtml);
        // setChatLog((prevLog) => [...prevLog, html]);
    };

    const handleSendMessage = () => {
        sendMessage();
      };

    // 跟輸入文字有關開始
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // 在此處理按下 Enter 的事件
            sendMessage();
            }
    };
    const inputStyle = {
        position: 'relative',
        backgroundImage: `url(${messagebg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        padding: '10px',
        border: 'none', // 移除邊框
        outline: 'none', // 移除聚焦時的外框線
      };
    // 跟輸入文字有關結束
    
    return(
        <div>
            <div className="headerofchatroom">
                <div className="bgofchatroomheader">
                    <img
                        src={headerbg}
                    ></img>
                </div>
                <div className="contentofchatheader">
                    <div className="backarrowofchatroom">
                        <Link to='/appointment'>
                            <img
                                src={backarrow}
                            ></img>
                        </Link>
                    </div>
                    <div className="photofchatroom">
                        <img
                            src={photo}
                        ></img>
                    </div>
                    <div className="nameofchatroom">
                        <p>張育榮</p>
                    </div>
                </div>
            </div>
            {/* 聊天內容開始 */}
            <div className='chat-wrap'>
                <div className='chat-wrap-main'>
                    <div className="chat-con">
                        {currentHtml}
                    </div>
                </div>
            </div>
            {/* 聊天內容結束 */}
            <div className="bottomofchatroom">
                <img
                    src={bottombg}
                ></img>
                <div className="bottomcontentofchatroom">
                    <div className="functions">
                        <img
                            src={functionsbtn}
                        ></img>
                    </div>
                    <div className="camera">
                        <img
                            src={camera}
                        ></img>
                    </div>

                    <div className="messagebg">
                        <input
                            type="text"
                            // value={inputValue}
                            value={message}
                            // onChange={handleInputChange}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="輸入訊息..."
                            style={inputStyle}
                        />

                    </div>

                    <div className="sendbtn"
                    onClick={handleSendMessage}
                    >
                        <img
                            src={sendbtn}
                        ></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatroom;