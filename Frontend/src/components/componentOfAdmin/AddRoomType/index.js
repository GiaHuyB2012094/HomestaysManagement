import classNames from "classnames/bind";
import style from './AddRoomType.module.scss';
import { useEffect,useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';

import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
// material ui
import Swal from "sweetalert2";
const cx = classNames.bind(style);
function AddRoomType(props) {
    const [roomtype, setRoomtype] = useState([])
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
    const cancelHandle = () => {
        props.sendData(0);
        props.sendAllRoomType(roomtype)
    }    
      //  useForm
      const {register,
        handleSubmit,
        reset,
        formState : {errors, isSubmitSuccessful}  
        } = useForm({
        defaultValues:{
          codeRoomType: "",
          name :"",
          hourlyPrice: 0,
          dailyPrice: 0,
          nightlyPrice: 0,
          maxcount: 0,
        }
      });
      const onSubmit = async(data) => {
        let price;
        const {hourlyPrice,dailyPrice,nightlyPrice,name,codeRoomType,maxcount} = data;
        price = [hourlyPrice,dailyPrice,nightlyPrice];
        var roomtypeData = {};
        Object.assign(roomtypeData,{name,codeRoomType,price,maxcount})
        console.log(roomtypeData);
        try {
            const result = (await axios.post("/api/roomtype/createroomtype",roomtypeData)).data;
              await Swal.fire({
              icon: 'success',
              title: 'Thêm loại phòng th ành công',
              text: 'Loại phòng mới đã được thêm vào danh sách',
            })
            setRoomtype(result);
        } catch (error) {
            console.log(error);
        }
      };
      useEffect(()=>{
        if (isSubmitSuccessful) {
          reset({
            codeRoomType: "",
            name :"",
            hourlyPrice: 0,
            dailyPrice: 0,
            nightlyPrice: 0,
            maxcount: 0,
          })
        }
      },[isSubmitSuccessful,reset])

    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("title","flex")}> 
          <h2>Thêm Hạng Phòng</h2>
          <div className={cx("flex")}>
              <Button 
                    onClick={cancelHandle}
                    feature
                    className={cx("btn","cancelBtn")}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit(onSubmit)}
                    feature
                    className={cx("btn","addBtn")}
                >
                    Add
                </Button>
          </div>
        </div>
        <div className={cx("body")}> 
          <form 
            key={1}
            onSubmit={handleSubmit(onSubmit)} 
            className={cx('form')}>
            {/* LEFT FORM ------------------------------------------------------------------------------------ */}
            <div className={cx("leftForm")}> 
                {/* 1. mã hạng phòng */}
                <div  className={cx('form-group')}>
                  <label htmlFor="codeRoomType" className={cx('form-label')}>
                      Mã Hạng Phòng
                  </label>
                  <input
                      {...register("codeRoomType", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ mã hạng phòng"
                        },
                        value:""})} // react hook form
                      id="codeRoomType"
                      name="codeRoomType"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                   <div className={cx("errorDiv")}>
                      {errors.codeRoomType && (
                          <span className={cx("error")}>{errors.codeRoomType.message}</span>
                      )}
                  </div>
                </div>
                {/* 2. tên hạng phòng */}
                <div  className={cx('form-group')}>
                  <label htmlFor="name" className={cx('form-label')}>
                      Tên Hạng Phòng
                  </label>
                  <input
                      {...register("name", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ tên hạng phòng"
                        },
                        value:""})} // react hook form
                      id="name"
                      name="name"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.name && (
                          <span className={cx("error")}>{errors.name.message}</span>
                      )}
                  </div>
                </div>
                {/* 3. sức chứa của hạng phòng */}
                <div  className={cx('form-group')}>
                  <label htmlFor="maxcount" className={cx('form-label')}>
                      Sức chứa
                  </label>
                  <input
                      {...register("maxcount", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ số lượng sức chứa"
                        },
                        valueAsNumber: true, value:0})} // react hook form
                      id="maxcount"
                      name="maxcount"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.maxcount && (
                          <span className={cx("error")}>{errors.maxcount.message}</span>
                      )}
                  </div>
                </div>
            </div>
            {/* RIGHT FORM ------------------------------------------------------------------------------------ */}
            <div className={cx('rightForm')}>
                {/* 1. Giá theo giờ */}
                <div  className={cx('form-group')}>
                  <label htmlFor="hourlyPrice" className={cx('form-label')}>
                      Giá theo giờ
                  </label>
                  <input
                      {...register("hourlyPrice", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ giá theo giờ"
                        },
                        valueAsNumber: true, value:0})} // react hook form
                      id="hourlyPrice"
                      name="hourlyPrice"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.hourlyPrice && (
                          <span className={cx("error")}>{errors.hourlyPrice.message}</span>
                      )}
                  </div>
                </div>
                {/* 2. Giá theo ngày */}
                <div  className={cx('form-group')}>
                  <label htmlFor="dailyPrice" className={cx('form-label')}>
                      Giá theo ngày
                  </label>
                  <input
                      {...register("dailyPrice", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ giá theo ngày"
                        },
                        valueAsNumber: true, value:0})} // react hook form
                      id="dailyPrice"
                      name="dailyPrice"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.dailyPrice && (
                          <span className={cx("error")}>{errors.dailyPrice.message}</span>
                      )}
                  </div>
                </div>
                {/* 3. Giá theo đêm */}
                <div  className={cx('form-group')}>
                  <label htmlFor="nightlyPrice" className={cx('form-label')}>
                      Giá theo đêm
                  </label>
                  <input
                      {...register("nightlyPrice", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ giá theo đêm"
                        },
                        valueAsNumber: true, value:0})} // react hook form
                      id="nightlyPrice"
                      name="nightlyPrice"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.nightlyPrice && (
                          <span className={cx("error")}>{errors.nightlyPrice.message}</span>
                      )}
                  </div>
                </div>
            </div>
          </form>
        </div>
        </div>
     );
}

export default AddRoomType;