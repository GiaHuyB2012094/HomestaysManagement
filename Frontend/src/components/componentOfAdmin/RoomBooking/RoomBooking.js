import classNames from "classnames/bind";
import style from  './RoomBooking.module.scss';
import {GiBroom} from 'react-icons/gi';
import {IoSparklesSharp} from 'react-icons/io5';
import Switch from '@mui/material/Switch';
import {  useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(style);
function RoomBooking(props) {
    const [checked, setChecked] = useState(props.room.cleanStatus);
    const [roomduplicape, setRoomduplicape] = useState(props.room);
    const bookingHandle = (e) => {
        if (e.target === e.currentTarget) {
            props.addroombooking(props.room);
        } 
    }
    const switchHandle = async(e) =>{
        setChecked(e.target.checked);
        try {
            const result = (await (axios.put(`/api/rooms/changecleanstatus/${props.room._id}`,
            {   cleanStatus: e.target.checked }))).data;
            console.log("clean status:",result.cleanStatus)
            setRoomduplicape(result);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        setRoomduplicape(props.room);
        setChecked(props.room.cleanStatus);
    },[props.room]);
    
    return ( 
            <div 
                onClick={bookingHandle}
                key={roomduplicape.name} 
                className={cx("room")}
            >
                <div 
                    className={cx("roomHeader", "flex")}
                    onClick={bookingHandle}
                    >
                    <div 
                        className={cx("name")}
                        onClick={bookingHandle}
                        >
                        P.10{roomduplicape.number}
                    </div>
                    { 
                        (roomduplicape.cleanStatus) ? (
                            <div className={cx("roomStatus",'flex')}>
                                <span 
                                    style={{color:"#279656"}}  
                                    className={cx("flex")}>
                                    <IoSparklesSharp
                                        className={cx('icon')}/>
                                    <p style={{padding:".3rem"}}>Sạch</p>
                                </span>
                                <Switch
                                    color={"success"}
                                    checked={checked}
                                    onChange={(e)=>switchHandle(e)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>  
                        ) : (
                            <div className={cx("roomStatus",'flex')}>
                                <span 
                                    style={{color:"#E42A1E"}}
                                    className={cx("flex")}>
                                    <GiBroom
                                        className={cx('icon')}/>
                                    <p style={{padding:".3rem"}}>Chưa dọn</p>
                                </span>
                                <Switch
                                    color={"success"}
                                    checked={checked}
                                    onChange={(e)=>switchHandle(e)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        )    
                    }
                  
                </div>
                <div className={cx("roomBody")}>
                    <h4
                        onClick={bookingHandle}
                    >{roomduplicape.type}</h4>
                </div>
                <div 
                    onClick={bookingHandle}
                    className={cx("roomfooter",'flex')}>
                    <p 
                        onClick={bookingHandle}
                        >{roomduplicape.price[0]}/Giờ - {roomduplicape.price[1]}/Ngày - {roomduplicape.price[2]}/Đêm</p>
                </div>
            </div>
     );
}

export default RoomBooking;