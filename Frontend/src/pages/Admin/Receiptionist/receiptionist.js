import classNames from "classnames/bind";
import style from  './receiptionist.module.scss';
import Header from "src/components/componentOfAdmin/Header";
import Slidebar from "src/components/componentOfAdmin/Slidebar";
import useFetch from "src/Hook/useFetch";
import { useEffect, useState } from "react";
import Loader from "src/components/Loader";
import {GiBroom} from 'react-icons/gi';
import {RiDraggable} from 'react-icons/ri';
import {IoSparklesSharp} from 'react-icons/io5';
import axios from "axios";
import { set } from "react-hook-form";
import AddBooking from "src/components/componentOfAdmin/AddBooking/addBooking";
import RoomBooking from "src/components/componentOfAdmin/RoomBooking/RoomBooking";
import RoomBooked from "src/components/componentOfAdmin/RoomBooked/RoomBooked";
import CheckoutRoomBooking from "src/components/componentOfAdmin/CheckoutRoomBooking/CheckoutRoomBooking";
import dayjs from "dayjs";
const cx = classNames.bind(style);
function Receiptionist() {
    const {data,loading} = useFetch('/api/rooms/getallrooms');
    const [rooms,setRooms] = useState([]);
    const [roomsfiltered,setRoomsfiltered] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);
    const [openBookingInfo, setOpenBookingInfo] = useState(false);
    const [branch, setBranch] = useState([]);
    const [branchval, setBranchval] = useState(1);
    const [bookingItem, setBookingItem] = useState("")

    const [filterOptions, setFilterOptions] = useState("allRoom");
    



    const [roomchoosed, setRoomChoosed] = useState("");    
    let tt = dayjs();
    
    useEffect(()=>{
        setRooms(data);
    },[data]);

    // get all branchs
    useEffect(()=>{
        const fetchDataBranch = async() => {
          try {
             const newbranch = (await axios.get('/api/branch/getallbranchs')).data;
             setBranch(newbranch);
          } catch (error) {
           console.log(error);
          } 
        }
        fetchDataBranch();
      },[]);
    const convertDate = (date, separator) => {
    var d = date.split(separator);
    var tam = new Date(d[2], parseInt(d[1])-1, d[0]);
    return tam;
    } 
    //   filter rooms
    useEffect(()=>{
        const roomsfilter = rooms.filter((room)=>{
            return (room.branch===parseInt(branchval));
        })
        if (filterOptions==="allRoom") {
            setRoomsfiltered(roomsfilter);
        }
        else if (filterOptions==="usedRoom") {
            setRoomsfiltered(roomsfilter.filter(room=>room.currentBooking.length>0))
        }
        else if (filterOptions==="paidRoom") {
            setRoomsfiltered(roomsfilter.filter(room => {
                if(room.currentBooking.length>0) {
                    const todate = room.currentBooking[0].todate;
                    const to = new Date(todate)
                    const today = new Date(tt.format('MM-DD-YYYY'))
                    const timeDate = to.getTime() - today.getTime();
                    const total = timeDate / (1000 * 3600 * 24) + 1;
                    console.log(total);
                    if (total<=1) return true;
                    return false;
                } else return false;
            }))
        }
        else if (filterOptions==="emptyRoom") {
            setRoomsfiltered(roomsfilter.filter(room=>room.currentBooking.length===0))
        }
         

    },[rooms,branchval,filterOptions]);

    const bookingHandle = (roombooking) => {
        setRoomChoosed(roombooking);
        setOpenBookingInfo(false);
        setOpenBooking(true);

    }
    const seeBookingInfoHandle = async(roombooking) => {
        try {
            const result = (await (axios.get(`/api/booking/getbookingbyid/${roombooking.currentBooking[0].bookingid}`))).data
            console.log(result);
            setBookingItem(result);
        } catch (error) {
            console.log(error);
        }
        setRoomChoosed(roombooking);
        setOpenBookingInfo(true);
        setOpenBooking(false);
    }
    return (

        <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header> 
                <div className={cx("container")}>
                    <div className={cx("roomOptionsFilter","flex")}>
                        <div >
                            <label 
                                htmlFor="branch" 
                                className={cx('form-label')}
                                style={{
                                    color:"#6439ff",
                                    fontWeight: "bold",
                                }} 
                            >
                                Chi nhánh
                            </label>
                            <div className={cx('input')}>
                                <select 
                                    onChange={(e)=>setBranchval(e.target.value)}
                                    className={cx("formBranch")}
                                    
                                >
                                {(branch) && (
                                branch.map((branchE,i)=>(
                                    <option 
                                    key={i} 
                                    value={branchE.branch}
                                    
                                    >
                                        chi nhánh {branchE.branch}
                                    </option>)
                                ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label 
                                style={{
                                    color:"#6439ff",
                                    fontWeight: "bold",
                                }}>
                                Tất cả
                            </label>
                            <input 
                                type="radio"
                                name="filterOptions"
                                value="allRoom"
                                checked={filterOptions==="allRoom"}
                                onChange={(e)=>setFilterOptions(e.target.value)}
                            ></input>
                            <label 
                                style={{
                                    color:"#6439ff",
                                    fontWeight: "bold",
                                }}>
                                Đang sử dụng
                            </label>
                            <input 
                                type="radio"
                                name="filterOptions"
                                value="usedRoom"
                                checked={filterOptions==="usedRoom"}
                                onChange={(e)=>setFilterOptions(e.target.value)}

                            ></input>
                            <label 
                                style={{
                                    color:"#6439ff",
                                    fontWeight: "bold",
                                }}>
                                Sắp trả
                            </label>
                            <input 
                                type="radio"
                                name="filterOptions"
                                value="paidRoom"
                                checked={filterOptions==="paidRoom"}
                                onChange={(e)=>setFilterOptions(e.target.value)}
                            ></input>
                            <label 
                                style={{
                                    color:"#6439ff",
                                    fontWeight: "bold",
                                }}>
                                Phòng trống
                            </label>
                            <input 
                                type="radio"
                                name="filterOptions"
                                value="emptyRoom"
                                checked={filterOptions==="emptyRoom"}
                                onChange={(e)=>setFilterOptions(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx("nameBranchDiv","flex")}>
                        <div className={cx("nameBranch",'flex')} >
                            <h3>Chi nhánh {branchval}</h3>
                            <span style={{
                                display:"flex",
                                alignItems:"center",
                                borderRadius: "50%",
                                fontSize:"13px",
                                backgroundColor:"#27ae61",
                                color:"#fff",
                                marginLeft:"8px",
                                padding:"0px 3px",
                                width:"18px",
                                height:"18px",
                            }}>{roomsfiltered.length}</span>
                        </div>
                    </div>
                      <div className={cx("roomList","flex")}>
                        {loading ? (<Loader/>) : (
                            roomsfiltered.map((room)=>{
                            return (
                                (room.currentBooking.length>0) ? (
                                    <RoomBooked 
                                        room={room}
                                        seeBookingInfo={seeBookingInfoHandle}
                                    />
                                ) : (
                                    <RoomBooking 
                                        room={room}
                                        addroombooking={bookingHandle}
                                    />
                                )
                                );
                            })
                        )}
                        
                    </div>
                </div>
               
            </div>
            {openBooking && (
                <AddBooking
                    roomchoosed={roomchoosed}
                    sendData={(data)=>{setOpenBooking(data)}}
                    allRoomList={(data)=>setRooms(data)}
                />
            )}
            {openBookingInfo && (
                <CheckoutRoomBooking
                    bookingItem={bookingItem}
                    roomchoosed={roomchoosed}
                    allRoomList={(data)=>setRooms(data)}
                    sendData={(data)=>{setOpenBookingInfo(data)}}
                />
            )}
        </div>
      </div>
    );
}

export default Receiptionist;