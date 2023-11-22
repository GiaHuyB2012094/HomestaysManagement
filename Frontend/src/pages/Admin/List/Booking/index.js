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
    const handleConfirm = async(bookingid) => {
      try {
        const result = (await axios.post(`/api/booking/confirmbooking/${bookingid}`))
        await Swal.fire({
          icon: 'success',
          title: 'Xác nhận đơn đặt phòng thành công',
          text: 'Đơn đặt phòng đã được xác nhận',
        })
        const allbokings = (await axios.get('/api/booking/getallbooking')).data;
        setBooking(allbokings);
      } catch (error) {
        console.log(error);
      }
    }
    async function handleCancel(bookingid, roomid){
      try {
          const result = (await axios.post('/api/booking/cancelbooking',{bookingid, roomid})).data
          Swal.fire('Hủy Đơn Thành Công','Đơn phòng của bạn đã được hủy','success')
          const allbokings = (await axios.get('/api/booking/getallbooking')).data;
          setBooking(allbokings);
      } catch (error) {
          console.log(error)
          Swal.fire('Hủy Đơn Thất Bại','Đơn phòng của bạn chưa được hủy','error')
      }
  }
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header>
                <div className={cx("title","flex")}> 
                  <h2>Đơn đặt phòng</h2>
                  {/* <Button feature className={cx("btn",'updateBtn')}>Cập nhật</Button> */}
                </div>
                {loading ? <Loader/> : (
                <div className={cx("tableDiv")}>
                  <table cellpadding="0" border="0">
                    <thead>
                      <tr>
                        <th>stt</th>
                        {/* <th>id</th> */}
                        <th className={cx("nameTH")} >name user</th>
                        <th className={cx("roomTH")}>room</th>
                        {/* <th className={cx("dateTH")}>check in</th> */}
                        {/* <th className={cx("dateTH")}>check out</th> */}
                        <th className={cx("dateTH")}>order date</th> 
                        <th>Trạng thái</th>
                        <th>thành tiền</th>
                        <th style={{textAlign:"center"}}>Thao tác</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking.length &&
                        booking.map((text,index)=>(
                        <tr key={index}>
                          <td>{index+1}</td>
                          {/* <td>{text._id}</td> */}
                          <td>{text.nameuserorder}</td>
                          <td>{text.room}</td>
                          {/* <td>{text.fromdate}</td> */}
                          {/* <td>{text.todate}</td> */}
                          <td>{text.orderdate}</td>
                          <td style={{width: "270px"}}>{
                            (
                              text.status==="cancelled") ? (
                                <span 
                                  style={{
                                    color:"crimson",
                                    backgroundColor:"rgba(255,0,0,0.2)",
                                    padding: ".5rem",
                                    
                                  }}
                                > Đã hủy
                                </span>
                            ):( 
                              text.status==="success" ? (
                                <span 
                                  style={{
                                    color:"green",
                                    backgroundColor:"rgba(0,128,0,0.2)",
                                    padding: ".5rem",
                                  }}> Đã xác nhận
                                </span>
                              ) : (
                                <span 
                                  style={{
                                    color:"#827717",
                                    backgroundColor:"#e6ee9c",
                                    padding: ".5rem",
                                    width:"200px"
                                  }}> Chờ xác nhận
                                </span>
                              )
                            )}
                          </td>
                          <td>{text.totalamount}</td>
                          <td>{
                            (text.status==="booked") ? (
                                <div className={cx("flex")}>
                                  <Button  feature className={cx("btn","updateBtn")} style={{padding:"1rem"}} onClick={()=>{handleConfirm(text._id)}}> Xác nhận</Button>
                                  <Button  feature className={cx("btn","cancelBtn")} style={{padding:"1rem"}} onClick={()=>{handleCancel(text._id, text.roomid)}}> Hủy</Button>
                                </div>
                                ) : (
                               <div className={cx("flex")}>
                                  <Button disable feature className={cx("btn","updateBtn")} style={{padding:"1rem"}} > Xác nhận</Button>
                                  <Button disable feature className={cx("btn","cancelBtn")} style={{padding:"1rem"}} > Hủy</Button>
                               </div>
                              )
                            }
                          </td>
                          <td style={{textAlign:"center"}}>
                            <MdDelete 
                              onClick={()=>{deleteHandle(text._id)}}
                              className={cx("iconDelete")}>
                            </MdDelete>
                          </td>

                          
                          
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
