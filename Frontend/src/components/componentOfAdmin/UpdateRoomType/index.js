import classNames from "classnames/bind";
import style from './UpdateRoomType.module.scss';
import { useEffect,useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';

import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
// material ui
import Swal from "sweetalert2";
const cx = classNames.bind(style);
function AddRoomType(props) {
    const [roomtype, setRoomtype] = useState([]);
    const cancelHandle = () => {
        props.sendData(0);
        props.sendAllRoomType(roomtype);
    }    
      //  useForm
      const {register, handleSubmit} = useForm();
      const onSubmit = async(data) => {
        let price;
        const {hourlyPrice,dailyPrice,nightlyPrice,name,codeRoomType,maxcount} = data;
        price = [hourlyPrice,dailyPrice,nightlyPrice];
        var roomtypeData = {};
        Object.assign(roomtypeData,{name,codeRoomType,price,maxcount})
        
        try {
            const result = (await axios.put(`/api/roomtype/updateRoomType/${props.roomtypedetail._id}`,roomtypeData)).data;
            await Swal.fire({
              icon: 'success',
              title: 'Cập nhật loại phòng thành công',
              text: 'Loại phòng đã được cập nhật vào danh sách',
            })
            setRoomtype(result);
        
        } catch (error) {   
            console.log(error);
        }
      };
      
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("title","flex")}> 
          <h2>Chỉnh Sửa Hạng Phòng</h2>
          <div className={cx("flex")}>
              <Button 
                    onClick={cancelHandle}
                    feature
                    className={cx("btn","cancelBtn")}
                >
                    Hủy
                </Button>
                <Button 
                    onClick={handleSubmit(onSubmit)}
                    feature
                    className={cx("btn","addBtn")}
                >
                    Chỉnh sửa
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
                      {...register("codeRoomType", {required: true, value:props.roomtypedetail.codeRoomType})} // react hook form
                      id="codeRoomType"
                      name="codeRoomType"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                </div>
                {/* 2. tên hạng phòng */}
                <div  className={cx('form-group')}>
                  <label htmlFor="name" className={cx('form-label')}>
                      Tên Hạng Phòng
                  </label>
                  <input
                      {...register("name", {required: true, value:props.roomtypedetail.name})} // react hook form
                      id="name"
                      name="name"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
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
                      {...register("hourlyPrice", {required: true,valueAsNumber: true, value:props.roomtypedetail.price[0]})} // react hook form
                      id="hourlyPrice"
                      name="hourlyPrice"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                </div>
                {/* 2. Giá theo ngày */}
                <div  className={cx('form-group')}>
                  <label htmlFor="dailyPrice" className={cx('form-label')}>
                      Giá theo ngày
                  </label>
                  <input
                      {...register("dailyPrice", {required: true,valueAsNumber: true, value:props.roomtypedetail.price[1]})} // react hook form
                      id="dailyPrice"
                      name="dailyPrice"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                </div>
                {/* 3. Giá theo đêm */}
                <div  className={cx('form-group')}>
                  <label htmlFor="nightlyPrice" className={cx('form-label')}>
                      Giá theo đem
                  </label>
                  <input
                      {...register("nightlyPrice", {required: true,valueAsNumber: true, value:props.roomtypedetail.price[2]})} // react hook form
                      id="nightlyPrice"
                      name="nightlyPrice"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                </div>
            </div>
          </form>
        </div>
        </div>
     );
}

export default AddRoomType;