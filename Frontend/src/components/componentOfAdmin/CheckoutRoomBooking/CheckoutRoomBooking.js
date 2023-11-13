import classNames from "classnames/bind";
import style from './CheckoutRoomBooking.module.scss';
import Button from "~/components/Button";
import {AiOutlineClockCircle,AiOutlineDollarCircle,AiOutlineClose} from "react-icons/ai";
import {HiOutlineUsers} from "react-icons/hi";
import {BiBed,BiPencil,BiUser,BiPhoneCall} from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

const cx = classNames.bind(style);
function CheckoutRoomBooking(props) {
    const closeHandle = (e) => { 
        e.preventDefault();
        if (e.target === e.currentTarget) {
          props.sendData(false); 
        }
    }
    const checkoutHandle = async() => {
        try {
            const result = (await (axios.post('/api/booking/checkoutBooking',{
                booking: props.bookingItem[0],
            }))).data;
            if (result) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Trả phòng thành công',
                    text: 'Phòng đã được thanh toán!',
                  })
                const roomitem = (await (axios.get('/api/rooms/getallrooms'))).data;
                props.allRoomList(roomitem);
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Trả phòng thất bại',
                    text: 'Phòng chưa được thanh toán!',
                  })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
      });
    return ( 
        <div className={cx("wrapper")} onClick={closeHandle}>
            <div className={cx("inner")}>
                <div className={cx("header","flex")}>
                    <div className={cx("title","flex")}>
                        <h4 
                            style={{
                                padding: ".6rem",
                                borderRadius: "8px",
                                color:"#fff",
                                marginRight: "2rem",
                                fontSize: "13px",
                                backgroundColor: "#676b6e",
                            }}
                        >
                            P.10{props.roomchoosed.number}
                        </h4>
                        <p
                            style={{
                                backgroundColor:"#e9f7ef",
                                borderRadius:"6px",
                                padding: "3px 6px",
                                color:"#27ae61",
                            }}
                        > 
                            Đang sử dụng 
                        </p>
                    </div>
                    <div className={cx("closeBtn")}>
                        <AiOutlineClose 
                            onClick={closeHandle} 
                            className={cx("icon")} 
                        />
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("title")}>
                        <h4>{props.roomchoosed.type}</h4>
                    </div>
                    <div className={cx("groupBody")}>
                        <div className={cx("iconGroupBody")}>
                            <AiOutlineClockCircle className={"icon"}/>
                        </div>
                        <p>{props.bookingItem[0].fromdate} - {props.bookingItem[0].todate}</p>
                    </div>
                    <div className={cx("groupBody")}>
                        <div className={cx("iconGroupBody")}>
                            <BiUser className={"icon"}/>
                        </div>
                        <h5>{props.bookingItem[0].nameuserorder}</h5>
                    </div>
                    <div className={cx("groupBody")}>
                        <div className={cx("iconGroupBody")}>
                            <BiPhoneCall className={"icon"}/>
                        </div>
                        <h5>{props.bookingItem[0].phone}</h5>
                    </div>
                    <div className={cx("groupBody")}>
                        <div className={cx("iconGroupBody")}>
                            <HiOutlineUsers className={"icon"}/>
                        </div>
                        <p>Sức chứa : {props.roomchoosed.maxcount}</p>
                    </div>
                    <div className={cx("groupBody")}>
                        <div className={cx("iconGroupBody")}>
                            <BiBed className={"icon"}/>
                        </div>
                        <p>P.10{props.roomchoosed.number}</p>
                    </div>
                    <div className={cx("groupBody")}>
                        <div className={cx("iconGroupBody")}>
                            <BiPencil className={"icon"}/>
                        </div>
                        <p>{(props.bookingItem[0].requests!=="") ? (props.bookingItem[0].requests) : ("Chưa có ghi chú")}</p>
                    </div>
                    <div className={cx("groupBody")}>
                        <div className={cx("iconGroupBody")}>
                            <AiOutlineDollarCircle className={"icon"}/>
                        </div>
                        <span 
                            className={cx("flex")}
                            style={{alignItems:"center"}}
                        >
                            <h4 style={{
                                    color:"#27ae61",
                                    marginRight:"1rem",
                                }}>
                                     {formatter.format(props.bookingItem[0].totalamount)} 
                                </h4>
                            <div 
                                className={cx("flex")}
                                style={{alignItems:"center"}}
                            >
                                <p>-Khach đã trả:</p>
                                <h4 
                                    style={{
                                        color:"#e42a1e",
                                        marginLeft:"1rem",
                                    }}
                                >
                                    {props.bookingItem[0].deposits ? formatter.format(props.bookingItem[0].deposits) : formatter.format(0)}
                                </h4>
                            </div>
                        </span>
                    </div>
                </div>
                <div className={cx("bottom","flex")}>
                    <Button
                        className={cx("btn","addBtn")}
                        onClick={checkoutHandle}
                    >
                        Trả phòng
                    </Button>
                    <Button
                        className={cx("btn","cancelBtn")}
                        onClick={closeHandle} 
                    >
                        Bỏ qua
                    </Button>
                </div>
            </div>
        </div>
     );
}

export default CheckoutRoomBooking;