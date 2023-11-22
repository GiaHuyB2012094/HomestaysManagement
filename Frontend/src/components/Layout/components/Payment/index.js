import classNames from "classnames/bind";
import styles from "./Payment.module.scss";
import Button from "src/components/Button";
import moment from "moment/moment";
import { useEffect, useState } from "react";
// import axios from "axios";
import {BsCheckCircleFill} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Error from "src/components/Error";
// import Image from "src/components/Image";
// import { useState,useMemo } from "react";
const cx = classNames.bind(styles);
function Payment({room, fromDate, toDate, totaldays, totalamount, service}) {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [nameuserorderVal, setNameUserOrderVal] = useState("");
    const [phoneVal, setPhoneVal] = useState("");
    const [close, setClose] = useState(true);
    const [paymentsuccessful, setPaymentSuccessful] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitSuccessful },
        reset,
    } = useForm({
        defaultValues: {
            nameuserorder: JSON.parse(localStorage.getItem('currentUser')).name,
            address: (user.address || ""),
            phone: (user.phone || ""),
            cccd: (user.cccd || ""),
            request: (user.request || ""),   
        }
    })
    var date = moment();
    var currentDate = date.format('DD-MM-YYYY'); 

    const onSubmit = async(data) => {
        const {address,phone,cccd,request,nameuserorder} = data;

        const booking = {
            room,
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
            fromdate : fromDate,
            todate : toDate,
            type: room.type,
            totaldays,
            totalamount,
            orderdate : currentDate,
            address: address,
            phone: phone,
            cccd: cccd,
            deposits: 0,
            services: service,
            requests: request,
            status: "booked",
            nameuserorder: nameuserorder,
        }
        
        setNameUserOrderVal(nameuserorder);
        setPhoneVal(phone);
        console.log(booking);
        try {
            const result =(await axios.post('/api/booking/bookroom',booking)).data;
            setClose(false)
            console.log(result);
            if (result) {
                setPaymentSuccessful(true)
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Đặt phòng thất bại',
                    text: 'Phòng này đã có người đặt vào ngày của bạn chọn! Vui lòng chọn phòng khác hoặc đổi ngày!',
                  })
            }
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(()=>{
        if (isSubmitSuccessful) {
          reset({
            nameuserorder: JSON.parse(localStorage.getItem('currentUser')).name,
            address: "",
            phone: "",
            cccd: "",
            request:  "",   
          })
        }
      },[isSubmitSuccessful,reset])
    const closePaymentHandle = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            setClose(false)
        }
    }
    const closePaymentSuccess = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            setPaymentSuccessful(false)
        }
    }
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
      });
    return (  
        <>
            {(close) ?(
            <div onClick={closePaymentHandle} className={cx("wrapper")} >
                <div className={cx('inner')}>
                    <div className={cx("closeBtn")}>
                        <AiOutlineClose className={cx("icon")} onClick={closePaymentHandle}/>
                    </div>
                    <h2 className={cx('heading')}>Xác nhận và Thanh Toán</h2>
                    <p className={cx('desc')}>Tìm kiếm Homestay đơn giản với Dhouse</p>
                    <h4 className={cx('orderDate')}>Ngày Đặt: <span style={{color: "green"}}>{currentDate}</span></h4>
                    <form
                        className={cx('formPayment')}
                        id="form"
                        key={1}
                        onSubmit={handleSubmit(onSubmit)} 
                        >
                            <div className={cx("top",'flex')}>
                                {/* left */}
                                <div className={cx("left")}>
                                    <div className={cx("headFormDiv",'flex')}>
                                        <label className={cx('form-label')}>Phòng: </label>
                                        <h4>{room.name}</h4>
                                    </div>
                                    <div className={cx("headFormDiv",'flex')}>
                                        <label className={cx('form-label')}>Loại phòng: </label>
                                        <h4>{room.type}</h4>
                                    </div>
                                    {/* Name User */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="NameUser" className={cx('form-label')}>
                                            Tên Người Đặt
                                        </label>
                                        <input
                                            {...register("nameuserorder", {
                                                required: {
                                                    value: true,
                                                    message:"Vui lòng nhập đầy đủ họ và tên"
                                                },
                                            })}
                                            id="NameUser"
                                            name="NameUser"
                                            type="text"
                                            // onChange={(e) => {setNameUserOrder(e.target.value)}}
                                            placeholder="Nhập tên người đặt"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                            {errors.nameuserorder && (
                                                <span className={cx("error")}>{errors.nameuserorder.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Address */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="address" className={cx('form-label')}>
                                            Địa chỉ
                                        </label>
                                        <input
                                            {...register("address",{
                                                required: {
                                                    value: true,
                                                    message:"Vui lòng nhập đầy đủ địa chỉ"
                                                },
                                            })}
                                            id="address"
                                            name="address"
                                            type="text"
                                            // onChange={(e) => {setaddressOrder(e.target.value)}}
                                            placeholder="Nhập địa chỉ của người đặt"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                            {errors.address && (
                                                <span className={cx("error")}>{errors.address.message}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* right */}
                                <div className={cx("right")}>
                                    <div className={cx("headFormDiv",'flex')}>
                                        <label className={cx('form-label')}>Giá Phòng : </label>
                                        <h4 style={{color:"#e64a19"}}>{formatter.format(room.price[1])} </h4>
                                    </div>
                                    <div className={cx("headFormDiv",'flex')}>
                                        <label className={cx('form-label')}>Tổng thanh toán : </label>
                                        <h4 style={{color:"#2e7d32"}}>{formatter.format(totalamount)} </h4>
                                    </div>
                                    {/* Number Phone */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="CCCD" className={cx('form-label')}>
                                            CCCD
                                        </label>
                                        <input
                                            {...register("cccd",{
                                                required: {
                                                    value: true,
                                                    message:"Vui lòng nhập đầy đủ số CCCD"
                                                },
                                                valueAsNumber: {
                                                    value: true,
                                                    message:"Căn Cước Công Dân bắt buộc là chữ số"
                                                },
                                            })}
                                            id="CCCD"
                                            name="CCCD"
                                            type="number"
                                            placeholder="Nhập Căn cước công dân"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                            {errors.cccd && (
                                                <span className={cx("error")}>{errors.cccd.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* CCCD */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="phone" className={cx('form-label')}>
                                            Số điện thoại
                                        </label>
                                        <input
                                            {...register("phone",{
                                                required: {
                                                    value: true,
                                                    message:"Vui lòng nhập đầy đủ số điện thoại"
                                                },
                                                valueAsNumber: {
                                                    value: true,
                                                    message:"Số điện thoại bắt buộc là chữ số"
                                                },
                                            })}
                                            id="phone"
                                            name="phone"
                                            type="number"
                                            placeholder="Nhập số điện thoại"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                        {errors.phone && (
                                            <span className={cx("error")}>{errors.phone.message}</span>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* bot */}
                            <div className={cx("bot")}>
                                <div className={cx('form-row')}>
                                    <div className={cx('form-group')}>
                                        <label htmlFor="content" className={cx('form-label')}>
                                            Những yêu cầu đặc biệt
                                        </label>
                                        <textarea
                                            {...register("request")}
                                            rows="10"
                                            cols="60"
                                            placeholder="Nhập những yêu cầu đặc biệt của bạn"
                                            className={cx('form-control')}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>                
                        <Button className={cx('form-submit')} onClick={handleSubmit(onSubmit)} primary small>
                            Xác nhận thanh toán
                        </Button>
                </div>
            </div>) : (
            paymentsuccessful ? 
            (<div className={cx("wrapper")} onClick={closePaymentSuccess}>
                <div className={cx("paymentSuccessful","flex")}>
                    <div className={cx("iconPaymentSuccess")}>
                        <BsCheckCircleFill></BsCheckCircleFill>
                    </div>
                    <div className={cx("titlePaymentSuccess")}>
                        <h2>Cảm Ơn Bạn Đã Đặt Phòng</h2>
                    </div>
                    <div className={cx("descPaymentSuccess")}>
                        <p>Đơn Đặt Phòng Của Bạn Đã Được Nhận</p>
                        <p style={{color:"#ef4e4e"}}>Vui lòng chờ xác nhận từ phía của Homestay</p>
                    </div>
                    <div className={cx("bodyPaymentSuccess")}>
                        <div className={cx("textGroup",'flex')}>
                            <p className={cx("textName")}>Tên Khách Hàng: </p>
                            <p>{nameuserorderVal}</p>
                        </div>
                        <div className={cx("textGroup",'flex')}>
                            <p className={cx("textName")}>Số Điện Thoại: </p>
                            <p>{phoneVal}</p>
                        </div>
                        <div className={cx("textGroup",'flex')}>
                            <p className={cx("textName")}>Tên Phòng: </p>
                            <p>{room.name}</p>
                        </div>
                        <div className={cx("textGroup",'flex')}>
                            <p className={cx("textName")}>Tổng Tiền: </p>
                            <p>{totalamount}</p>
                        </div>
                        <div className={cx("textGroup",'flex')}>
                            <p className={cx("textName")}>Ngày Đặt: </p>
                            <p>{currentDate}</p>
                        </div>
                        <div className={cx("textGroup",'flex')}>
                            <p className={cx("textName")}>Trạng Thái Giao Dịch: </p>
                            <p>Thành Công</p>
                        </div>
                    </div>
                    <Button 
                        className={cx("btnMakeAnotherBooking")} 
                        primary
                        onClick={(e)=>setPaymentSuccessful(false)}
                        >
                        Đặt Thêm Phòng Khác
                    </Button>
                </div>
            </div>):(<></>))       
            }
        </>
    );
}

export default Payment;