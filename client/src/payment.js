import React, {Component, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './payment.css';

import backArrow from './images-appointment-med/backarrow.svg';
import confirmBtn from './images-payment/confirmbtn.svg';
import divideLine from './images-payment/divideline.svg';
import discountbg from './images-payment/discountbg.svg';

// 跟後端有關
import axios from 'axios';

const Payment = (handleCurrentPageChange) =>{
    const user_id = sessionStorage.getItem("user_id")
    const professionalId = sessionStorage.getItem("professional_id")
    const serviceName = sessionStorage.getItem("selectedOption")
    const appointment_date = sessionStorage.getItem("formattedDate")
    const start_time = sessionStorage.getItem("appoint_starttime")
    const status = "等待回應";
    console.log("professionalId:"+professionalId)
    console.log("serviceName:"+serviceName)
    // 新增到appointments table的data
    const data = {
        user_id,
        professional_id: professionalId,
        service_name: serviceName,
        appointment_date,
        appointment_start_time: start_time,
        status,
      };
    // 新增到appointments table的function
    const handleConfirmClick = () => {
        axios.post('http://localhost:8080/create-appointment', data)
            .then(response => {
                // 在這裡處理新增成功的情況
                console.log('新增預約成功');
            })
            .catch(error => {
                // 在這裡處理錯誤情況
                console.error('新增預約失敗', error);
            });
    };
    // 處理價格顯示
    const [price,setPrice] = useState('0');
    const fetchPrice = () =>{
        axios.get(`http://localhost:8080/get-service-price/${professionalId}/${serviceName}`)
        .then(response => {
            setPrice(response.data[0].base_price);
        })
        .catch(error => {
            console.error('發生錯誤', error);
        });
    }
    useEffect(() => {
        // 一開始就呼叫資料
        fetchPrice();
    }, []);

    return(
        <div>
            <div className="headerofpayment">
                <div className="backarrowofpayment">
                    <Link to='/appointcalendar'>
                        <img
                            src={backArrow}
                        ></img>
                    </Link>
                </div>
                <div className="title">
                    <h2>服務款項</h2>
                </div>
            </div>
            <div className="bodyofpayment">
                <div className="servicenameofpayment">
                    <h2 style={{
                        position:'absolute',
                        top:'0',
                        left:'7.778%',
                        marginTop:'0'
                    }}>服務名稱</h2>
                    <p style={{
                        position:'absolute',
                        bottom: '0',
                        right: '7.778%',
                        fontWeight: 'bolder'
                    }}>{serviceName}</p>
                    <img
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '50%',
                            transform: 'scaleY(2) translate(-50%,0%)',
                        }}
                        src={divideLine}
                    ></img>
                </div>
                <div className="amountofpayment">
                    <h2 style={{
                        position:'absolute',
                        top:'0',
                        left:'7.778%',
                        marginTop:'0'
                    }}>服務費用</h2>
                    <p style={{
                        position:'absolute',
                        bottom: '0',
                        right: '7.778%',
                    }}>NTD: {price}元</p>
                    <img
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '50%',
                            transform: 'scaleY(2) translate(-50%,0%)',
                        }}
                        src={divideLine}
                    ></img>
                </div>
                <div className="discountofpayment">
                    <h2 style={{
                        position:'absolute',
                        top:'0',
                        left:'7.778%',
                        marginTop:'0',
                        fontSize:'20px'
                    }}>輸入優惠碼</h2>
                    <input
                        className='inputofdiscount'
                        type="text" // 設定輸入框的類型為文字
                        placeholder="請輸入優惠碼" // 設定預設提示文字
                    />
                    <p style={{
                        position:'absolute',
                        bottom: '0',
                        right: '7.778%',
                    }}>-0元</p>
                    <img
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '50%',
                            transform: 'scaleY(2) translate(-50%,0%)',
                        }}
                        src={divideLine}
                    ></img>
                </div>
                <div className="totalofpayment">
                    <h2 style={{
                        position:'absolute',
                        top:'0',
                        left:'7.778%',
                        marginTop:'0'
                    }}>總計費用</h2>
                    <p style={{
                        position:'absolute',
                        bottom: '0',
                        right: '7.778%',
                    }}>NTD: {price}元</p>
                    <img
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '50%',
                            transform: 'scaleY(2) translate(-50%,0%)',
                        }}
                        src={divideLine}
                    ></img>
                </div>
                <div className="methodsofpayment">
                    <h2 style={{
                        position:'absolute',
                        top:'0',
                        left:'7.778%',
                        marginTop:'0'
                    }}>選擇付款方式</h2>
                    <div className="methodsbtn">
                        <label style={{
                            
                            whiteSpace: 'nowrap',
                            fontFamily: 'Nunito Sans',
                            fontSize: '3.5vh',
                            fontWeight:'bold'
                        }}>
                            <input type="radio" name="paymentMethod" value="cash" />
                            現金
                        </label>
                        <label style={{
                            
                            whiteSpace: 'nowrap',
                            fontFamily: 'Nunito Sans',
                            fontSize: '3.5vh',
                            fontWeight:'bold'
                        }}>
                            <input type="radio" name="paymentMethod" value="linepay" />
                            Line Pay
                        </label>
                        <label style={{
                            whiteSpace: 'nowrap',
                            fontFamily: 'Nunito Sans',
                            fontSize: '3.5vh',
                            fontWeight:'bold'
                        }}>
                            <input type="radio" name="paymentMethod" value="visa" />
                            Visa
                        </label>
                    </div>
                    <img
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '50%',
                            transform: 'scaleY(2) translate(-50%,0%)',
                        }}
                        src={divideLine}
                    ></img>
                </div>
            </div>
            <div className='confirmpaymentbtn'>
                <Link to='/schedule'>
                    <img
                        src={confirmBtn}
                        onClick={handleConfirmClick}
                    ></img>
                </Link>
                
            </div>
        </div>
    );
}

export default Payment;