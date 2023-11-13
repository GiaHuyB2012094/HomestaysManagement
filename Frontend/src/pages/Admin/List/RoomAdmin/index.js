import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from './RoomAdmin.module.scss';

import AddRoom from "~/components/componentOfAdmin/AddRoom/index.";
import UpdateRoom from "~/components/componentOfAdmin/UpdateRoom/UpdateRoom";
import Slidebar from "~/components/componentOfAdmin/Slidebar";
import Header from "~/components/componentOfAdmin/Header";
import Button from "~/components/Button";
import useFetch from "~/Hook/useFetch";
import Loader from "~/components/Loader";
import UpdateRoomType from "~/components/componentOfAdmin/UpdateRoomType";
import axios from "axios";
import Swal from "sweetalert2";
import {MdDelete,MdAdd} from "react-icons/md";
import {GrAdd} from "react-icons/gr";
import {BiSolidEditAlt} from 'react-icons/bi'
import AddRoomType from "~/components/componentOfAdmin/AddRoomType";
// -------------------
const cx = classNames.bind(style);
function RoomAdmin() {
  const {data,loading} = useFetch('/api/rooms/getallrooms');
  const [room, setRoom] = useState([]);
  const [roomtype, setRoomtype] = useState([]);
  const [checked, setChecked] = useState(0);
  const [roomupdatechoosed, setRoomUpdateChoosed] = useState("");
  const [roomtypeupdatechoosed, setRoomtypeUpdateChoosed] = useState("");
  useEffect(()=>{
    const fecthData = async() => {
      try {
        const result = (await axios.get('/api/roomtype/getallroomtype')).data;
        setRoomtype(result)
      } catch (error) {
        console.log(error)
      }
    }
    fecthData();
  },[])
  useEffect(()=>{
    try {
      setRoom(data)
    } catch (error) {
      console.log(error)
    }
  },[data])
  // delete room by id
  const deleteRoomHandle = async(roomid) => {
    try {
      const deleteRoom = (await axios.delete(`/api/rooms/deleteroombyid/${roomid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa phòng thành công',
        text: 'Phòng đã được xóa khỏi danh sách',
      })
      setRoom(
        prevRoom => (prevRoom.filter(el => el._id !== roomid))
      )
    } catch (error) {
      console.log(error);
    }
  }
  const updateRoomHandle = (roomval) => {
    setRoomUpdateChoosed(roomval);
    setChecked(2);
  }
  const updateRoomTypeHandle = (roomtypeval) => {
    setRoomtypeUpdateChoosed(roomtypeval);
    setChecked(5);
  }
  const deleteRoomTypeHandle = async(roomtypeid) => {
    try {
      const deleteRoomtype = (await axios.delete(`/api/roomtype/deleteroomtypebyid/${roomtypeid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa loại phòng thành công',
        text: 'Loại phòng đã được xóa khỏi danh sách',
      });
      setRoomtype(
        prevRoomType => (prevRoomType.filter(el => el._id !== roomtypeid))
      )
    } catch (error) {
      console.log(error);
    }
  }
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header>
                {checked===0 ? 
                  (<>
                    <div className={cx("title","flex")}> 
                      <h2>Phòng & Hạng Phòng</h2>
                      <div className={cx("flex")}>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(3)}
                        >
                          Thêm Hạng Phòng
                        </Button>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(1)}
                        >
                          Thêm Phòng
                        </Button>
                      </div>
                    </div>
                    <div className="flex">
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            color: "#fff",
                            padding: "8px",
                            backgroundColor:"#0090da", 
                            width: "150px",
                            cursor: "pointer",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }} 
                        onClick={()=>setChecked(0)}
                        >
                        Danh sách phòng
                      </div>
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            color: "#1f1f29",
                            padding: "8px",
                            backgroundColor:"#ddd", 
                            width: "120px",
                            cursor: "pointer",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }}
                        onClick={()=>setChecked(4)}
                        >
                        Hạng phòng
                      </div>
                    </div>
                    {loading ? <Loader/> : (
                    <div className={cx("tableDiv")}>
                      <table >
                        <thead>
                          <tr>
                            <th>stt</th>
                            <th>Tên phòng</th>
                            <th>Chi nhánh</th>
                            <th>Diện tích</th>
                            <th>Giá</th>
                            <th>Sức chứa</th>
                            <th>Hạng Phòng</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {room.length ?(
                            room.map((text,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{text.name}</td>
                              <td>{text.branch}</td>
                              <td>{text.acreage}</td>
                              <td>{text.price[0]}</td>
                              <td>{text.maxcount}</td>
                              <td>{text.type}</td>
                              <td style={{textAlign:"center"}}>
                                <BiSolidEditAlt
                                  onClick={()=>{updateRoomHandle(text)}}
                                  className={cx("iconEdit")}
                                    >
                                </BiSolidEditAlt>
                                <MdDelete 
                                  className={cx("iconDelete")}
                                  onClick={()=>{deleteRoomHandle(text._id)}}
                                >
                                </MdDelete>
                              </td>

                            </tr>))
                            ):null
                          }
                        </tbody>
                      </table>
                    </div>  )}
                  </>) : 
                (checked===4 ? (
                <>
                  <div className={cx("title","flex")}> 
                      <h2>Phòng & Hạng Phòng</h2>
                      <div className={cx("flex")}>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(3)}
                        >
                          Thêm Hạng Phòng
                        </Button>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(1)}
                        >
                          Thêm Phòng
                        </Button>
                      </div>
                    </div>
                    <div className="flex">
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            padding: "8px",
                            width: "150px",
                            cursor: "pointer",
                            backgroundColor:"#ddd", 
                            color: "#1f1f29",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }} 
                        onClick={()=>setChecked(0)}
                        >
                        Danh sách phòng
                      </div>
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            padding: "8px",
                            backgroundColor:"#0090da", 
                            color: "#fff",

                            width: "120px",
                            cursor: "pointer",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }}
                        onClick={()=>setChecked(4)}
                        >
                        Hạng phòng
                      </div>
                    </div>
               
                    <div className={cx("tableDiv")}>
                      <table >
                        <thead>
                          <tr>
                            <th>stt</th>
                            <th>Mã hạng phòng</th>
                            <th>Tên hạng phòng</th>
                            <th>Số lượng</th>
                            <th>Sức chứa</th>
                            <th>Giá theo giờ</th>
                            <th>Giá theo ngày</th>
                            <th>Giá theo đêm</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {roomtype.length ?(
                            roomtype.map((text,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{text.codeRoomType}</td>
                              <td>{text.name}</td>
                              <td>{text.quantity}</td>
                              <td>{text.maxcount}</td>
                              <td>{text.price[0]}</td>
                              <td>{text.price[1]}</td>
                              <td>{text.price[2]}</td>
                              <td style={{textAlign:"center"}}>
                                <BiSolidEditAlt
                                  onClick={()=>{updateRoomTypeHandle(text)}}
                                  className={cx("iconEdit")}
                                    >
                                </BiSolidEditAlt>
                                <MdDelete 
                                  className={cx("iconDelete")}
                                  onClick={()=>{deleteRoomTypeHandle(text._id)}}
                                >
                                </MdDelete>
                              </td>

                            </tr>))
                            ):null
                          }
                        </tbody>
                      </table>
                    </div>
                </>) :
                (checked===1 ? 
                  (<AddRoom 
                      sendData={(data)=>setChecked(data)}
                      sendAllRoom={(ok)=>{if (ok.data) setRoom(ok.data)}}
                      roomtype={roomtype}
                    />) :
                (checked===2 ? 
                  (<UpdateRoom
                      cancelUpdate={(data)=>setChecked(data)}
                      sendAllRoom={(ok)=>{if (ok.data) setRoom(ok.data)}}
                      roomdetail={roomupdatechoosed}
                      roomtype={roomtype}
                    />) :
                (checked===3 ? (
                  <AddRoomType
                    sendData={(data)=>setChecked(data)}
                    sendAllRoomType={(ok)=>{console.log(ok)}}
                  />
                ) :
                (checked===5 ? (
                  <UpdateRoomType
                    roomtypedetail={roomtypeupdatechoosed}
                    sendData={(data)=>setChecked(data)}
                    sendAllRoomType={(ok)=>{if (ok) setRoomtype(ok)}}
                  />
                ) : (<></>)
                )))))}
            </div>
        </div>
    </div>
    )
}

export default RoomAdmin;
