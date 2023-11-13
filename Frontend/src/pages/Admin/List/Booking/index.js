import classNames from "classnames/bind";
import style from './Booking.module.scss';

import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import {MdDelete} from "react-icons/md"
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const cx = classNames.bind(style);

  

function Booking() {
  const {data,loading} = useFetch('/api/booking/getallbooking');
  const [booking, setBooking] = useState([])
  useEffect(()=>{
    setBooking(data);
  },[data])
    // delete room by id
    const deleteHandle = async(bookingid) => {
      try {
        const deleteBooking = (await axios.delete(`/api/booking/deletebookingbyid/${bookingid}`))
        await Swal.fire({
          icon: 'success',
          title: 'Xóa đơn đặt phòng thành công',
          text: 'Đơn đặt phòng đã được xóa khỏi danh sách',
        })
        setBooking(
          prevBooking => (prevBooking.filter(el => el._id !== bookingid))
        )
      } catch (error) {
        console.log(error);
      }
    }
  console.log(data);
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header>
                <div className={cx("title","flex")}> 
                  <h2>Booking</h2>
                  <Button feature className={cx("btn",'updateBtn')}>Cập nhật</Button>
                </div>
                {loading ? <Loader/> : (
                <div className={cx("tableDiv")}>
                  <table cellpadding="0" border="0">
                    <thead>
                      <tr>
                        <th>stt</th>
                        <th>id</th>
                        <th className={cx("nameTH")} >name user</th>
                        <th className={cx("roomTH")}>room</th>
                        <th className={cx("dateTH")}>check in</th>
                        <th className={cx("dateTH")}>check out</th>
                        <th className={cx("dateTH")}>order date</th> 
                        <th>total amount</th>
                        <th>status</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking.length &&
                        booking.map((text,index)=>(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{text._id}</td>
                          <td>{text.nameuserorder}</td>
                          <td>{text.room}</td>
                          <td>{text.fromdate}</td>
                          <td>{text.todate}</td>
                          <td>{text.orderdate}</td>
                          <td>{text.totalamount}</td>
                          <td>{(text.status==="cancelled")? (
                            <span style={{color:"crimson", backgroundColor:"rgba(255,0,0,0.2)", padding: ".3rem",}}>{text.status}</span>
                            ):(
                            <span style={{color:"green", backgroundColor:"rgba(0,128,0,0.2)",padding: ".3rem",}}>{text.status}</span>
                            )}
                          </td>
                          <td style={{textAlign:"center"}}>
                            <MdDelete 
                              onClick={()=>{deleteHandle(text._id)}}
                              className={cx("iconDelete")}>
                            </MdDelete></td>
                        </tr>))
                      }
                    </tbody>
                  </table>
                </div>
                )
                }
            </div>
        </div>
    </div>
    )
}

export default Booking;
