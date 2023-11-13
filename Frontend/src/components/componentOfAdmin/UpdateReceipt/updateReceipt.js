import classNames from "classnames/bind";
import style from './updateReceipt.module.scss';
import {AiOutlinePlus,AiOutlineClose} from 'react-icons/ai';
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Button from "src/components/Button";
import moment from "moment";
// material ui
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import useFetch from "src/Hook/useFetch";
const cx = classNames.bind(style);
function UpdateReceipt(props) {
  const [checked, setChecked] = useState(0);
  // const {data} = useFetch('/api/receipt/getallreceipt');
  const [receipt, setReceipt] = useState(props.allreceipts)
  const [branch, setBranch] = useState([]);
  let tt = dayjs();
  const [valueDate, setValueDate] = useState(tt);
  // get all branchs
  // useEffect(()=>{
  //   setReceipt(data);
  // },[data])
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
      props.sendData(0); 
      props.receiptafter(receipt);
    }
  }
  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: props.receiptUpdated.name,
      branch: props.receiptUpdated.branch,
      nameEmployee: props.receiptUpdated.nameEmployee,
      note: props.receiptUpdated.note,
      price: props.receiptUpdated.price,
      type: props.receiptUpdated.type,
    }
  });
  const onSubmit = async(data) => {
    Object.assign(data,{date: valueDate.format('MM-DD-YYYY')});
    Object.assign(data,{isPayment: false});
    console.log(data);
    // console.log();
    try {
      const result = (await axios.put(`/api/receipt/updatereceipt/${props.receiptUpdated._id}`,data)).data;
      await Swal.fire({
        icon: 'success',
        title: 'Cập nhật phiếu thu/chi thành công',
        text: 'Phiếu thu/chi đã cập nhật vào trong danh sách',
      })
      setReceipt(result);
    } catch (error) {
      console.log(error);
    }
  }


    return (  
    <div onClick={closePaymentHandle} className={cx("receipt1Div")}> 
      <div className={cx("formDiv")}>
          <div className={cx("closeBtn")}>
              <AiOutlineClose onClick={closePaymentHandle} className={cx("icon")} />
          </div>
          <div className={cx("titleForm")}>
              <h3>Xem thông tin phiếu</h3>
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
                          {...register("branch",{value:props.receiptUpdated.branch ,valueAsNumber: true})}
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
                  Cập nhật phiếu thu
              </Button>
              <Button 
                  leftIcon={<AiOutlineClose/>} 
                  feature 
                  className={cx("btn","cancelBtn")}
                  onClick={closePaymentHandle}
                  >
                  Bỏ qua
              </Button>
          </div>
      </div>
    </div>);
}

export default UpdateReceipt;