import classNames from "classnames/bind";
import style from './UpdatePositionOfEmployee.module.scss';
import { useEffect,useState } from "react";
import axios from "axios";
import { set, useForm } from 'react-hook-form';

import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
// material ui
import Swal from "sweetalert2";
const cx = classNames.bind(style);

function UpdatePositionOfEmployee(props) {
    // const [roomtype, setRoomtype] = useState([]);
    const [position, setPosition] = useState(props.position)
    const cancelHandle = () => {
        props.sendData(0);
        props.sendAllPositions(position);
    }    
      //  useForm
      const {register, handleSubmit} = useForm();
      const onSubmit = async(data) => {
        try {
            // const result = (await axios.put(`/api/roomtype/updateRoomType/${props.roomtypedetail._id}`,roomtypeData)).data;
          const result = (await axios.put(`/api/positionofemployee/updatepositionofemployee/${props.position._id}`,data)).data;
            await Swal.fire({
              icon: 'success',
              title: 'Cập nhật chức vụ & lương thành công',
              text: 'Chức vụ & lương đã được cập nhật vào danh sách',
            })
            setPosition(result);
            // setRoomtype(result);
        
        } catch (error) {   
            console.log(error);
        }
      };
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("title","flex")}> 
          <h2>Chỉnh Sửa Chức Vụ & Lương</h2>
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
              {/* 1. title name */}
              <div  className={cx('form-group')}>
                  <label htmlFor="name" className={cx('form-label')}>
                      Tên chức vụ
                  </label>
                  <input
                      {...register("name", {required: true, value:props.position.name})} // react hook form
                      id="name"
                      name="name"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
              </div>
              {/* 2. salary  */}
              <div  className={cx('form-group')}>
                  <label htmlFor="salary" className={cx('form-label')}>
                      Giá Lương
                  </label>
                  <input
                      {...register("salary", {required: true,valueAsNumber: true, value:props.position.salary})} // react hook form
                      id="salary"
                      name="salary"
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

export default UpdatePositionOfEmployee;