import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './search.css';

import backArrow from './images-appointment-med/backarrow.svg';
import searchBg from './images-home/searchbg.svg';
import searchIcon from './images-home/searchicon.svg';
import filter from './images-home/filter.svg';
import medphoto1 from './images-search/medphoto1.svg';
import star from './images-search/star.svg';

// 跟後端有關
import axios from 'axios';

const Search = (handleCurrentPageChange) =>{

    const allFullNames = []
    const allSpecialization = []
    const allRating = []
    const allOrganization = []

    const [medicalProfessionals, setMedicalProfessionals] = useState([]);
    useEffect(() => {
        // 發送GET請求
        axios.get('http://localhost:8080/medical-professionals')
        .then(response => {
            // 從回應中獲取醫療專業人員資訊並設定到狀態中
            // for(var i =0; i<response.data.length; i++){
            //     const {full_name, specialization, rating, organization } =response.data[i]
            //     console.log("name:"+full_name)
            //     allFullNames.push(full_name)
            //     allSpecialization.push(specialization)
            //     allRating.push(rating)
            //     allOrganization.push(organization)
            //     console.log("allFullNames:"+allFullNames)
            //     console.log("allSpecialization:"+allSpecialization)
            // }
            
            
            setMedicalProfessionals(response.data);
            console.log("response.data[0].full_name:"+response.data[0].full_name)
            
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }, []);


    // 將相關資料添加到對應的陣列中
    medicalProfessionals.forEach(professional => {
        allFullNames.push(professional.full_name);
        allSpecialization.push(professional.specialization);
        allRating.push(professional.rating);
        allOrganization.push(professional.organization);
    });
    console.log("allFullNames:"+allFullNames)
    console.log("allSpecialization:"+allSpecialization)

    return(
        <div>
            <div className="header">
                <div className="backarrowofsearch">
                    <Link to='/homepage'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                </div>
                <div className="title">
                    <h2>醫療人員</h2>
                </div>
            </div>
            <div className="searchbar">
                <img className='searchbg'
                    src={searchBg}
                ></img>
                <div className='searchicon'>
                    <img
                        src={searchIcon}
                    ></img>
                </div>
                <p className='searchtext'>搜尋醫療人員姓名..</p>
                <div className='searchfilter'>
                    <img
                        src={filter}
                    ></img>
                </div>
            </div>
            <div className="searchresult">
                <div className='topic'>
                    <h3>推薦列表</h3>
                </div>
                <div className='result-wrap'>
                    <div className='results-con'>
                        {medicalProfessionals.map((professional, index) => (
                            <div className='resultItem clearfix' key={index}>
                                <Link to='/meddetail' onClick={() => sessionStorage.setItem("professional_id", professional.professional_id)}>
                                    <div className='medphoto'>
                                        <img
                                            src={medphoto1}
                                            alt="Medical Professional Photo"
                                        />
                                    </div>
                                    <div className='medinfo' >
                                        <p className='medinfofname'>{professional.full_name}<br></br>{professional.specialization} </p>
                                        <br></br>
                                        <p style={{
                                            position: 'absolute',
                                            left: '0%',
                                            top: '50%',
                                            color: 'black'
                                        }}>{professional.organization} </p>
                                        <div className='rating'>
                                            <img
                                                src={star}
                                                alt="Star Rating"
                                            />
                                            <p>&nbsp;{professional.rating}</p>
                                            
                                        </div>
                                    </div>
                                </Link>
                                
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Search;