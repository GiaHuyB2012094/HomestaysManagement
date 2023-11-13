import { useState,useMemo } from "react";
import classNames from "classnames/bind";
import Payment from "../Payment";
import styles from "./FormBooking.module.scss";
import Button from "src/components/Button";
import Image from "src/components/Image";
import {AiOutlineClose} from "react-icons/ai"
const cx = classNames.bind(styles);

function FormBooking({fromDate, toDate, room}) {
    const [closeForm, setCloseForm] = useState(true);
    const [openPayment, setOpenPayment] = useState(false);
    const form = new Date(fromDate);
    const to = new Date(toDate);
    const timeDate = to.getTime() - form.getTime();
    const totaldays = timeDate / (1000 * 3600 * 24) + 1;
    const totalamount = useMemo(()=>  totaldays *room.price[1]
    ,[totaldays,room.price]);

    const closeFormHandle = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            setCloseForm(false)
        }
    }
    // const 
    return ( 
      <>  {(closeForm) ? (<>   
        <div  onClick={closeFormHandle} className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("left")}>
                    <div className={cx("nameRoom")}>
                        <h3>{room.name}</h3>
                    </div>
                    <div className={cx("imgRoom")}>
                        <Image src={room.imgs[0].src} alt={room.imgs[0].alt} className={cx("img")}></Image>
                    </div>
                </div>
                <div className={cx("right")}> 
                    <div className={cx("body")}>
                        <div className={cx("titleForm")}>
                            <h3>Chi Tiết Đặt Phòng</h3>
                        </div>
                        <div className={cx("fromDate")}>
                            Ngày vào ở: {fromDate}
                        </div>
                        <div className={cx("toDate")}>
                            Ngày đi : {toDate}
                        </div>
                        <div className={cx("maxCount")}>
                            Số lượng tối đa : {room.maxcount}
                        </div> 
                        {/* payment */}
                        <div className={cx("titlePayment")}>
                            <h3>Thành Tiền</h3>
                        </div>
                        <div className={cx("totalDate")}>
                            Tổng số ngày : {totaldays}
                        </div>
                        <div className={cx("price")}>
                            Giá thuê mõi ngày : 
                            <span className={cx("text")}>{room.price[1]} VND</span>
                        </div>
                        <div className={cx("totalAmount")}>
                            Tổng giá thuê : 
                            <span className={cx("text","totalamount")}>{totalamount} VND</span>
                        </div>
                    </div>
                <div className={cx("btnPayment")}>
                        <Button 
                                primary 
                                onClick={() => {
                                    setOpenPayment(true)
                                    setCloseForm(false)
                                }}
                            >
                            Thanh Toán
                        </Button>
                </div>
                </div>
                <div className={cx("closeBtn")}
                     >
                    <AiOutlineClose className={cx("icon")} onClick={closeFormHandle}/>
                </div>
            </div>
           
        </div></>) : (openPayment ? (
        <>
            <Payment 
                room={room} 
                fromDate={fromDate} 
                toDate={toDate}
                totaldays={totaldays}
                totalamount={totalamount}
                >
            </Payment>
        </>) : (<></>))}</>
    )
}

export default FormBooking;