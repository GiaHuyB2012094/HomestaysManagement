import classNames from "classnames/bind";
import style from './ListBooked.module.scss'
import Button from "~/components/Button";
import Loader from "~/components/Loader";
import useFetch from "~/Hook/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const cx = classNames.bind(style);
function ListBooked() {
    const [bookings, setBookings] = useState([])
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const {data,loading} = useFetch(`/api/booking/getbookingsbyuserid/${user._id}`)
    useEffect(()=> {
        setBookings(data);
    },[data])
    async function cancelBooking(bookingid, roomid){
        try {
            const result = (await axios.post('/api/booking/cancelbooking',{bookingid, roomid})).data
            Swal.fire('Hủy Đơn Thành Công','Đơn phòng của bạn đã được hủy','success').then(result=>{window.location.reload()})
        } catch (error) {
            console.log(error)
            Swal.fire('Hủy Đơn Thất Bại','Đơn phòng của bạn chưa được hủy','error')
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner','flex')}>
                {loading && (<Loader/>)}
                {bookings && (bookings.map((booking,index) => (
                    <div className={cx('cart')} key={index}>
                        <div className={cx('nameCart')}>
                            <h3>{booking.room}</h3>
                        </div>
                        <div className={cx('bodyCart')}>
                            <div className={cx('idBookingCart')}>
                                <h4>{booking._id}</h4>
                            </div>
                            <div className={cx('checkinBookingCart')}>
                                <h4>{booking.fromdate}</h4>
                            </div>
                            <div className={cx('checkoutBookingCart')}>
                                <h4>{booking.todate}</h4>
                            </div>
                            <div className={cx('amountBookingCart')}>
                                <h4>{booking.totalamount}</h4>
                            </div>
                            <div className={cx('statusBookingCart','flex')}>
                                <h4>Trạng Thái:</h4>
                                {booking.status === 'booked' ? (<h5 className={cx('awaitConfirm')}>CHỜ XÁC NHẬN</h5>) 
                                : (<h5 className={cx('cancelled')}>ĐÃ HỦY</h5>)}
                            </div>
                        </div>
                       {booking.status !== 'cancelled' && (
                        <div className={cx('btnBookingCart','flex')}>
                            <Button 
                                className={cx('btn','cancelBtn')}
                                
                                onClick={()=>{cancelBooking(booking._id, booking.roomid)}}
                            >
                                Huỷ Đơn
                            </Button>
                            <Button 
                                className={cx('btn','addBtn')}
                                
                                to={`/Book/${booking.roomid}/${booking.fromdate}/${booking.todate}`}
                            >
                                Xem Chi Tiết
                            </Button>
                        </div>)}
                    </div>
                    )))
                }
            </div>
        </div>
    );
}

export default ListBooked;
