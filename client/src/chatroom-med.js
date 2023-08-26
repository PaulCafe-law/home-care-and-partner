import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useParams } from 'react-router-dom';

import './chatroom-med.css';
import headerbg from './images-chatroom/headerbg.svg';
import backarrow from './images-chatroom/backarrow.svg';
import photo from './images-chatroom/photo.svg';
import bottombg from './images-chatroom/bottombg.svg';
import messagebg from './images-chatroom/messagebg.svg';
import sendbtn from './images-chatroom/sendbtn.svg';
import functionsbtn from './images-chatroom/functionsbtn.svg';
import camera from './images-chatroom/camera.svg';
const Chatroom = (handleCurrentPageChange) => {

    const { name } = useParams();
    console.log("username:"+name)
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
                        <Link to={`/clientdetailmed`}>
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
                        <p>林小民</p>
                    </div>
                </div>
            </div>
            <div className="bodyofchatroom">

            </div>
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
                        <img
                            src={messagebg}
                        ></img>
                    </div>
                    <div className="sendbtn">
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