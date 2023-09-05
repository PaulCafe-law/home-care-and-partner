import React, {Component, useState, useEffect, useRef} from 'react';
import { Link, useParams } from 'react-router-dom';

import './profilemed.css';
import backArrow from './images-profile/backarrow.svg';
import client from './images-profile/client.svg';
import setting from './images-profile/setting.svg';
import toclient from './images-profile-med/toclient.svg';
const Profile = (handleCurrentPageChange) => {
    const canvasStyle = {
        position: 'absolute',
        width: '360px',
        height: '780px',
        backgroundColor: '#1C6BA4',
        left: '50%',
        transform: 'translate(-50%,0)'
      };
    // const { name, specialization } = useParams();
    const name = sessionStorage.getItem('name');
    const specialization = sessionStorage.getItem('specialization');
    console.log("username:"+name)  
    console.log("specialization:"+specialization)  
    return(
        <div style={canvasStyle}>
            <div className="backarrowofprofile">
            <Link to={`/homepagemed`}>
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
                    <p>{name} {specialization}</p>
                </div>
                <div className="address">
                    <p>台南市 東區</p>
                </div>
            </div>
            <div className="itemsofprofile">
                <div className="setting">
                    <img
                        src={setting}
                    ></img>
                </div>
                <div className="toclient">
                    <Link to='/homepage'>
                        <img
                            src={toclient}
                        ></img>
                    </Link>  
                </div>
                
            </div>
        </div>
    )
}

export default Profile;