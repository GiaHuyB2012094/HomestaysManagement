import classNames from "classnames/bind";
import style from './addBoking.module.scss';
import {AiOutlinePlus,AiOutlineClose} from 'react-icons/ai';
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Button from "src/components/Button";
import moment from "moment";
// material ui
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import useFetch from "src/Hook/useFetch";
import FormUserInfoBooking from "../FormUserInfoBooking";
import CurrencyInput from "react-currency-input-field";
import AddServiceBooking from "../AddServiceBooking";
const cx = classNames.bind(style);
function AddBooking(props) {
  const user = JSON.parse(localStorage.getItem('currentUser'))

  const {data} = useFetch('/api/rooms/getallrooms');

  const [branch, setBranch] = useState([]);
  const [service, setService] = useState([]);
  const [branchvalP, setBranchvalP] = useState(props.roomchoosed.branch);
  const [roomnumberP, setRoomnumberP] = useState(props.roomchoosed.number);
  const [rooms, setRooms] = useState([]);
  const [roomfiltered, setRoomfiltered] = useState(data);
  const [codeRoomType, setCodeRoomType] = useState(props.roomchoosed.type)
  const [requests, setRequests] = useState("");
  const [deposits, setDeposits] = useState(0);
  const [roomboking, setRoombooking] = useState(props.roomchoosed);
  const [openUserInfoForm,setOpenUserInfoForm] = useState(false);
  const [openAddServiceBooking,setOpenAddServiceBooking] = useState(false);
  const [typeBooking, setTypeBooking] = useState("day")
  const [totalamountRoom, setTotalAmountRoom] = useState(0)
  const [totalamountService, setTotalAmountService] = useState(0)
  const [userInfoVal, setUserInfoVal] = useState(""); 
  
  useEffect(()=>{
    setRooms(data);
  },[data])

  let tt = dayjs();
//   const tomorrow = dayjs().add(1, 'day');
  const [valueDateFrom, setValueDateFrom] = useState(tt);
  const [valueDateFromHour, setvalueDateFromHour] = useState(tt);
  const [valueDateTo, setValueDateTo] = useState(tt);
  const [valueDateToHour, setValueDateToHour] = useState(tt);
// //   get all branchs
//   useEffect(()=>{
//     const fetchDataService = async() => {
//       try {
//           const newservice = (await axios.get('/api/service/getallservices')).data;
//           setService(newservice);
//       } catch (error) {
//         console.log(error);
//       } 
//     }
//     fetchDataService();
//   },[]);
  //   get all services
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
  // close
  const closeHandle = (e) => { 
    e.preventDefault();
    if (e.target === e.currentTarget) {
      props.sendData(false); 
    }
  }
    useEffect(()=>{
        const roomsfilter = rooms.filter((room)=>{
            return (room.branch === parseInt(branchvalP));
        })
        setRoomfiltered(roomsfilter);
    },[rooms,branchvalP])
    
    useEffect(()=>{
    const roomitem = roomfiltered.filter(room =>(room.number === parseInt(roomnumberP)))
    if (roomitem.length>0) {
        setRoombooking(roomitem[0]);
        setCodeRoomType(roomitem[0].type);
    }
  },[roomfiltered,roomnumberP])

    const totaldays = useMemo(()=> {
        var total=0;
        if (typeBooking==='day' || typeBooking==='tonight') { 
            const from = new Date(valueDateFrom.format('MM-DD-YYYY'));
            const to = new Date(valueDateTo.format('MM-DD-YYYY'));
            const timeDate = to.getTime() - from.getTime();
            total = timeDate / (1000 * 3600 * 24) + 1;
        } else {
            const from = new Date(valueDateFromHour);
            const to = new Date(valueDateToHour);
            const timeDate = to.getTime() - from.getTime();
            total = Math.ceil(timeDate/(3600*1000));
        }
        return total;
    },[ typeBooking, valueDateFrom, valueDateTo, valueDateFromHour, valueDateToHour])

    const totalamount = useMemo(()=>{
        let total=0;
        let totalamountservice=0;

        if (typeBooking==='day') {
            total = totaldays*roomboking.price[1];
        } else if (typeBooking==='tonight'){
            total = totaldays*roomboking.price[2];
        } else {
            total = totaldays*roomboking.price[0];
        }
        setTotalAmountRoom(total)
        if (service.length>0) {
            service.forEach(serviceItem => totalamountservice+=serviceItem.totalamount)
            total+=totalamountservice;
        }
        setTotalAmountService(totalamountservice);
        return total;
    },[roomboking,typeBooking,totaldays,service])

// handle booking
    const bookingHandle = async() => {
        const booking = {
            room: roomboking,
            userid: user._id,
            fromdate: valueDateFrom.format('MM-DD-YYYY'), 
            todate: valueDateTo.format('MM-DD-YYYY'),
            orderdate: tt.format('MM-DD-YYYY'),
            totalamount: totalamount,
            services: service,
            totaldays: totaldays,
            type: typeBooking,
            deposits: parseInt(deposits)||0,
            nameuserorder: userInfoVal.nameuserorder||user.name,
            address: userInfoVal.address||user.address,
            phone: userInfoVal.phone||user.phone,
            cccd: userInfoVal.cccd||user.cccd,
            requests: requests,
            status: "success",
        }
        try {
            const result =(await axios.post('/api/booking/bookroom',booking)).data;
            if (result) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Đặt phòng thành công',
                    text: 'Phòng đã được đặt!',
                  })
                // window.location.reload();
                
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Đặt phòng thất bại',
                    text: 'Phòng này đã có người đặt vào ngày của bạn chọn! Vui lòng chọn phòng khác hoặc đổi ngày!',
                  })
            }
            const roomitem = (await (axios.get('/api/rooms/getallrooms'))).data;
            props.allRoomList(roomitem);
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
    <div onClick={closeHandle} className={cx("bookingFormDiv")}> 
      <div className={cx("formDiv")}>
          <div className={cx("closeBtn")}>
              <AiOutlineClose onClick={closeHandle} className={cx("icon")} />
          </div>
          <div 
            className={cx("headerForm",'flex')}
            style={{
                padding: "1rem 2rem",
                alignItems:"center",
                justifyContent:"space-between",
            }}
            >
                <div className={cx("titleForm")} >
                    <h3>Đặt/Nhận phòng nhanh</h3>
                </div>
                <div className={cx("flex")}>
                    <Button 
                            leftIcon={<AiOutlinePlus/>} 
                            feature 
                            className={cx("btn","addBtn")}
                            onClick={()=>setOpenAddServiceBooking(true)}
                        >
                            Thêm dịch vụ
                    </Button>
                    <Button 
                            leftIcon={<AiOutlinePlus/>} 
                            feature 
                            className={cx("btn","updateBtn")}
                            onClick={()=>setOpenUserInfoForm(true)}
                        >
                            Nhập thông tin người đặt
                    </Button>
                </div>
          </div>
          <form 
          key={1}
          className={cx('form1')}>
              <div className={cx('formTop','flex')}>
                {/* 1. Hạng phòng */} 
                  <div  className={cx('form-group')}>
                      <label className={cx('form-label')}>
                            Hạng phòng
                      </label>
                      <input
                          value={codeRoomType}
                          onChange={(e)=>setCodeRoomType(e.target.value)}
                          disabled
                          type="text"
                          className={cx('form-control-left')}
                      ></input>
                  </div>
                {/* 2. branch */}
                  <div className={cx('form-group')}>
                      <label htmlFor="branch" className={cx('form-label')}>Chi nhánh</label>
                      <div className={cx('input')}>
                          <select 
                              value={branchvalP}
                              onChange={(e)=>setBranchvalP(e.target.value)}
                              name="branch" 
                              id="input" 
                              className={cx('form-branch')}
                          >
                              {branch.length && (
                                  branch.map((val,index) => (
                                  <option key={index} value={val.branch}>Chi nhánh {val.branch}</option>
                                  ))
                              )
                              }
                          </select>
                      </div>
                  </div>
                {/* 3. Room */}
                   <div className={cx('form-group')}>
                      <label htmlFor="room" className={cx('form-label')}>Phòng</label>
                      <div className={cx('input')}>
                          <select 
                              value={roomnumberP}
                              onChange={(e)=>setRoomnumberP(e.target.value)}
                              name="room" 
                              id="input" 
                              className={cx('form-branch')}
                          >
                              {roomfiltered.length && (
                                  roomfiltered.map((room,index) => (
                                  <option key={index} value={room.number}>P.10{room.number}</option>
                                  ))
                              )
                              }
                          </select>
                      </div>
                  </div>
                {/* 4. hình thức thuê */}
                  <div className={cx('form-group')}>
                      <label htmlFor="typeBooking" className={cx('form-label')}>Hình thức</label>
                      <div className={cx('input')}>
                          <select 
                              name="typeBooking" 
                              value={typeBooking}
                              onChange={(e)=>setTypeBooking(e.target.value)}
                              id="input" 
                              className={cx('form-branch')}
                          >
                                <option value="hour">Giờ</option>
                                <option value="day">Ngày</option>
                                <option value="tonight">Đêm</option>
                          </select>
                      </div>
                  </div>
                {/* 5. thời gian nhận phòng*/}
                  <div  className={cx('form-group')}>
                    <label className={cx('form-label')}>Nhận phòng</label>
                      {
                        (typeBooking==="day" || typeBooking==="tonight") ?(
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                        sx={{width:270}}
                                        value={valueDateFrom}
                                        onChange={(newValue) => setValueDateFrom(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </>
                        ): (
                            <>
                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer ntainer 
                                        components={['DateTimePicker']}>
                                        <DateTimePicker
                                            defaultValue={tt}
                                            value={valueDateFromHour}
                                            onChange={(newValue) => setvalueDateFromHour(newValue)}
                                            views={['year', 'month', 'day', 'hours', 'minutes']}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </>
                        )
                        }
                  </div>
                {/* 6. thời gian trả phòng */}
                  <div  className={cx('form-group')}>
                    <label className={cx('form-label')}>Trả phòng</label>
                    {
                        (typeBooking==="day" || typeBooking==="tonight") ?(
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                        sx={{width:270}}
                                        value={valueDateTo}
                                        onChange={(newValue) => setValueDateTo(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </>
                        ): (
                            <>
                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer 
                                        components={['DateTimePicker']}>
                                        <DateTimePicker
                                            defaultValue={tt}
                                            value={valueDateToHour}
                                            onChange={(newValue) => setValueDateToHour(newValue)}
                                            views={['year', 'month', 'day', 'hours', 'minutes']}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </>
                        )
                        }
                  </div>
                {/* 7. expected */} 
                  <div  className={cx('form-group')}>
                      <h5 className={cx('form-label')}>
                        Dự kiến
                      </h5>
                      <span className={cx('form-expected')}>
                          {typeBooking==="day"      ? (<h4> {totaldays} ngày</h4>) : 
                            (typeBooking==="hour"   ? (<h4> {totaldays} giờ</h4>)  : 
                                                      (<h4> {totaldays} đêm</h4>)
                          )}
                      </span>
                  </div>
                {/* 8. payment */} 
                  <div  className={cx('form-group')}>
                       <h5 className={cx('form-label')}>
                        Dự kiến
                      </h5>
                      <span className={cx('form-control-left')}>
                            <h4 style={{color:"#27AE61"}}>{formatter.format(totalamount)} </h4>
                      </span>
                  </div>
              </div>
              <div className={cx("formBot",'flex')}>
                {/* 1. Ghi chú */} 
                  <div  className={cx('form-group')}>
                      <label htmlFor="requests" className={cx('form-label')}>
                            Ghi chú
                      </label>
                      <input
                          value={requests}
                          onChange={(e)=>setRequests(e.target.value)}
                          name="requests"
                          type="text"
                          className={cx('form-note')}
                      ></input>
                  </div>
                {/* 2. Khach tra */} 
                 <div className={cx("form-payment")}>
                     <div 
                        className={cx("flex")}
                        style={{
                            justifyContent:"space-between",
                            padding:"0 .7rem",
                            width:"270px",
                        }}
                      >
                        <h4 >Tiền phòng</h4>
                        <h4 style={{color:"#f9a825"}}>{formatter.format(totalamountRoom)}</h4>
                      </div>
                      <div 
                        className={cx("flex")}
                        style={{
                            justifyContent:"space-between",
                            padding:"0 .7rem",
                            width:"270px",
                        }}
                      >
                        <h4 >Tiền các dịch vụ</h4>
                        <h4 style={{color:"#f9a825"}}>{formatter.format(totalamountService)}</h4>
                      </div>
                      <div 
                        className={cx("flex")}
                        style={{
                            justifyContent:"space-between",
                            padding:"0 .7rem",
                            width:"270px",
                            borderTop:"1px solid #9e9e9e",
                        }}
                      >
                        <h4 >Khách cần trả</h4>
                        <h4 style={{color:"#27AE61"}}>{formatter.format(totalamount)}</h4>
                      </div>
                      <div  className={cx('form-group')}>
                          <label htmlFor="deposits" className={cx('form-label')}>
                                  Khách thanh toán
                          </label>
                          {/* <input
                              id="deposits"
                              name="deposits"
                              type="number"
                              value={deposits}
                              onChange={(e)=>setDeposits(e.target.value)}
                              className={cx('form-paymenting')}
                          ></input> */}
                          <CurrencyInput
                                id="deposits"
                                name="deposits"
                                className={cx('form-paymenting')}
                                placeholder="Nhập tiền đặt cọc"
                                defaultValue={0}
                                suffix=" ₫"
                                decimalsLimit={2}
                                onValueChange={(value) => setDeposits(parseInt(value))}
                          />
                      </div>        
                 </div>
              </div>
          </form>
          <div className={cx("flex")} style={{justifyContent:"flex-end"}}>
              <Button 
                  leftIcon={<AiOutlinePlus/>} 
                  feature 
                  className={cx("btn","updateBtn")}
                  onClick={bookingHandle}
                >
                  Đặt phòng
              </Button>
              {/* <Button 
                  leftIcon={<AiOutlinePlus/>} 
                  feature 
                  className={cx("btn")}
                  style={{backgroundColor:"#e9830c"}}
                >
                  Đặt trước
              </Button> */}
          </div>
      </div>
      {(openUserInfoForm) && (
            <FormUserInfoBooking
                openUserInfoForm={(data)=>setOpenUserInfoForm(data)}
                userInfo={(data)=>setUserInfoVal(data)}
            />
        )}
        {(openAddServiceBooking) && (
            <AddServiceBooking
                openAddServiceBooking={(data)=>setOpenAddServiceBooking(data)}
                // userInfo={(data)=>setUserInfoVal(data)}
                listService={data=>setService(data)}
            />
        )}
     </div>
    );
}

export default AddBooking;