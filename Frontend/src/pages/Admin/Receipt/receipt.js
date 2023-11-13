import classNames from "classnames/bind";
import style from './receipt.module.scss';

import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import {MdDelete} from "react-icons/md";
import {AiOutlinePlus,AiOutlineClose} from 'react-icons/ai';
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import moment from "moment";
// material ui
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import UpdateReceipt from "src/components/componentOfAdmin/UpdateReceipt/updateReceipt";
const cx = classNames.bind(style);

function Receipt() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [checked, setChecked] = useState(0);
  const {data,loading} = useFetch('/api/receipt/getallreceipt');
  const [receipt, setReceipt] = useState("")
  const [branch, setBranch] = useState([]);
  const [receiptUpdated, setReceiptUpdated] = useState([])
  const [isPayment, setIsPayment] = useState(false);
  let tt = dayjs();
  const [valueDate, setValueDate] = useState(tt);
  useEffect(()=> {
    try {
      setReceipt(data);
    } catch (error) {
      console.log(error)
    }
  },[data])
  const deleteReceiptHandle = async(receiptid) => {
    try {
      const deleteReceipt = (await axios.delete(`/api/receipt/deletereceiptbyid/${receiptid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa phiếu thu/chi thành công',
        text: 'Phiếu thu/chi đã được xóa khỏi danh sách',
      })
      setReceipt(
        prevReceipt => (prevReceipt.filter(el => el._id !== receiptid))
      )
    } catch (error) {
      console.log(error);
    }
  }
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
  // close
  const closePaymentHandle = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
        setChecked(0)
    }
}
  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: "",
      branch: 1,
      nameEmployee: user.name,
      note: "",
      price: 0,
      type: "",
    }
  });
  const onSubmit = async(data) => {
    Object.assign(data,{date: valueDate.format('MM-DD-YYYY')});
    Object.assign(data,{isPayment: isPayment});
    console.log(data);
    // console.log();
    try {
      const result = (await axios.post('/api/receipt/createreceipt',data)).data;
      await Swal.fire({
        icon: 'success',
        title: 'Lập phiếu thu/chi thành công',
        text: 'Phiếu thu/chi đã được tạo ra trong danh sách',
      })
      setReceipt(result);
      setChecked(0);
    } catch (error) {
      console.log(error);
    }
  }
  const handleReceiptUpdate = (receipt) => {
    setReceiptUpdated(receipt);
    setChecked(2);
  }
  const totalSpending = useMemo(()=>{
    let total = 0;
    if (receipt){
      receipt.forEach(receiptval=>{
        if(receiptval.isPayment)
          total = total + receiptval.price;
      })
    }
    return total
  },[receipt])
  const totalIncome = useMemo(()=>{
    let total = 0;
    if (receipt){
      receipt.forEach(receiptval=>{
        if(!receiptval.isPayment)
          total = total + receiptval.price;
      })
    }
    return total
  },[receipt])
  // format currency
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    // maximumFractionDigits: 3,
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
          <Slidebar></Slidebar>
          <div className={cx("right")}>
              <Header></Header> 
              <div className={cx("title","flex")}> 
                <h2>Sổ quỹ tiền mặt</h2>
                <div className={cx('flex')} >
                  <Button 
                    leftIcon={<AiOutlinePlus/>} 
                    feature 
                    className={cx("btn","updateBtn")}
                    onClick={()=>{
                      setChecked(1)
                      setIsPayment(false)}}
                    >
                      Lập phiếu thu
                    </Button>
                  <Button 
                    leftIcon={<AiOutlinePlus/>} 
                    feature 
                    className={cx("btn","updateBtn")}
                    onClick={()=>{
                      setChecked(1)
                      setIsPayment(true)
                    }}
                    >
                      Lập phiếu chi
                    </Button>
                </div>
              </div>
              <div className={cx("priceDiv","flex")}>
                <div className={cx("priceGroup")}>
                  {/* <h4>Quỹ đầu kỳ</h4>
                  <h3>507,019,000</h3> */}
                </div>
                <div className={cx("priceGroup")}>
                  <h4>Tổng thu</h4>
                  <h3>{formatter.format(totalIncome)} </h3>
                </div>
                <div className={cx("priceGroup")}>
                  <h4>Tổng chi</h4>
                  <h3>{formatter.format(totalSpending)} </h3>
                </div>
                <div className={cx("priceGroup")}>
                  <h4>Tồn quỹ</h4>
                  <h3>{formatter.format(totalIncome-totalSpending)} </h3>
                </div>
              </div>
              <div className={cx("bodyDiv","flex")}>
                {loading ? <Loader/> : (
                <div className={cx("tableDiv")}>
                  <table className={cx("table")}>
                    <thead>
                      <tr >
                        <th>stt</th>
                        <th>mã phiếu</th>
                        <th>thời gian</th>
                        <th>loại thu chi</th>
                        <th>người nộp/nhận</th>
                        <th>giá trị</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {receipt.length &&
                        receipt.map((text,index)=>(
                        <tr className={cx('rowReceiptTable')} key={index} style={{cursor:"pointer"}} onClick={()=>{handleReceiptUpdate(text)}}>
                          <td>{index+1}</td>
                          <td>{text.name}</td>
                          <td>{text.date}</td>
                          <td>{text.type}</td>
                          <td>{text.nameEmployee}</td>
                          <td>{formatter.format(text.price)}</td>
                          <td ><MdDelete onClick={()=>{deleteReceiptHandle(text._id)}} className={cx("iconDelete")}></MdDelete></td>
                        </tr>

                        ))
                      }
                    </tbody>
                  </table>
                </div>)}
              </div>
             
          </div>
          {(checked===1) ? (
            <div onClick={closePaymentHandle} className={cx("receipt1Div")}> 
              <div className={cx("formDiv")}>
                <div className={cx("closeBtn")}>
                    <AiOutlineClose onClick={closePaymentHandle} className={cx("icon")} />
                </div>
                <div className={cx("titleForm")}>
                  
                  {isPayment ? (<h3>Lập phiếu chi</h3>) : (<h3>Lập phiếu thu</h3>)}
                </div>
                <form 
                key={1}
                onSubmit={handleSubmit(onSubmit)} 
                className={cx('form1')}>
                {/* LEFT FORM ------------------------------------------------------------------------------------ */}
                <div className={cx("leftForm")}> 
                    
                    {/* 1. Mã phiếu */} 
                    <div  className={cx('form-group')}>
                      <label htmlFor="name" className={cx('form-label')}>
                          Mã phiếu
                      </label>
                      <input
                          {...register("name", {required: true, })} // react hook form
                          id="name"
                          name="name"
                          type="text"
                          className={cx('form-control-left')}
                      ></input>
                    </div>
                   
                    {/* 3. loại thu */}
                    <div  className={cx('form-group')}>
                      <label htmlFor="type" className={cx('form-label')}>
                          Loại thu
                      </label>
                      <input
                          {...register("type", {required: true, })} // react hook form
                          id="type"
                          name="type"
                          type="text"
                          className={cx('form-control-left')}
                      ></input>
                    </div>
                     {/* 1. tên người nộp*/}
                     <div  className={cx('form-group')}>
                      <label htmlFor="nameEmployee" className={cx('form-label')}>
                          Tên người nộp
                      </label>
                      <input
                          {...register("nameEmployee", {required: true, })} // react hook form
                          id="nameEmployee"
                          name="nameEmployee"
                          type="text"
                          className={cx('form-control-left')}
                      ></input>
                    </div>
                     {/* 2. Giá trị*/}
                     <div  className={cx('form-group')}>
                      <label htmlFor="price" className={cx('form-label')}>
                          Giá trị
                      </label>
                      <input
                          {...register("price", {required: true, valueAsNumber: true})} // react hook form
                          id="price"
                          name="price"
                          type="text"
                          className={cx('form-control-left')}
                      ></input>
                    </div>
                    
                </div>
                {/* RIGHT FORM ------------------------------------------------------------------------------------ */}
                <div className={cx('rightForm')}>
                  {/* 1. branch */}
                  <div className={cx('form-group')}>
                        <label htmlFor="branch" className={cx('form-label')}>Chi nhánh</label>
                        <div className={cx('input')}>
                            <select 
                                {...register("branch",{value:1 ,valueAsNumber: true})}
                                name="branch" 
                                id="input" 
                                className={cx('form-control-right','form-branch')}
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
                    
                   {/* 2. thời gian */}
                   <div  className={cx('form-group')}>
                     <label className={cx('form-label')}>Thời gian</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                            // label="Thời Điểm"
                            value={valueDate}
                            onChange={(newValue) => setValueDate(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                   
                    {/* 3. ghi chú*/}
                    <div  className={cx('form-group')}>
                      <label htmlFor="note" className={cx('form-label')}>
                          Ghi chú
                      </label>
                      <input
                          {...register("note", {required: true, })} // react hook form
                          id="note"
                          name="note"
                          type="text"
                          className={cx('form-control-left')}
                      ></input>
                    </div>
                </div>
                </form>
                <div className={cx("flex")} style={{justifyContent:"flex-end"}}>

                  <Button 
                      leftIcon={<AiOutlinePlus/>} 
                      feature 
                      className={cx("btn","updateBtn")}
                      onClick={handleSubmit(onSubmit)}
                      >
                        {isPayment ? (<p>Lập phiếu chi</p>) : (<p>Lập phiếu thu</p>)}
                  </Button>
                  <Button 
                      leftIcon={<AiOutlineClose/>} 
                      feature 
                      className={cx("btn","cancelBtn")}
                      onClick={()=>{setChecked(0)}}
                      >
                        Bỏ qua
                  </Button>
                </div>
             </div>
            </div>
            ) :((checked===2) ? (
            <>
              <UpdateReceipt
                receiptUpdated={receiptUpdated}
                allreceipts={receipt}
                sendData={(data)=>{setChecked(data)}}
                receiptafter={(data)=>{console.log(data)}}
              />
            </>
            ): (
            <>
            
            </>))}
      </div>
    </div>
  );
}

export default Receipt;