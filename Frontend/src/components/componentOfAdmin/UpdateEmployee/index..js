import classNames from "classnames/bind";
import style from './UpdateEmployee.module.scss';
import { useEffect,useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';

import Button from "~/components/Button";
import Swal from "sweetalert2";
const cx = classNames.bind(style);

function UpdateEmployee(props) {
    const [branch, setBranch] = useState([])
    const [position, setPosition] = useState(props.position);

    const [employee, setEmployee] = useState(props.employee);
    const cancelHandle = () => {
        props.sendData(0);
        props.sendAllEmployees(employee)
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
      // get all positions
      useEffect(()=>{
        const fecthData = async() => {
          try {
            const result = (await axios.get('/api/positionofemployee/getallpositionofemployee')).data;
            setPosition(result)
          } catch (error) {
            console.log(error)
          }
        }
        fecthData();
      },[])
      //  useForm
      const {register, handleSubmit,} = useForm({
        defaultValues:{
          name:props.employee.name,
          phone: props.employee.phone,
          cmnd: props.employee.cmnd,
          address: props.employee.address,
          note: props.employee.note,
          position: props.employee.position[0].name,
          branch: props.employee.branch,
          dateofbirth: props.employee.dateofbirth,
          gender: props.employee.gender,
        }
      });
      const onSubmit = async(data) => {
        position.forEach((positonval)=>{
          if (positonval.name === data.position) {
            data.position = positonval;
          }
        })
        console.log(data);
        try {
          const result = (await axios.put(`/api/employees/updateemployee/${props.employee._id}`,data)).data;
          if (result) {
            await Swal.fire({
            icon: 'success',
            title: 'Cập nhật nhân viên thành công',
            text: 'Nhân viên đã được cập nhật vào danh sách',
          })
          setEmployee(result);}
        } catch (error) {
          console.log(error)
        }
      };
    return (
       
        <>
        <div className={cx("title","flex")}> 
          <h2>Thêm nhân viên</h2>
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
              {/* 1. title name */}
              <div  className={cx('form-group')}>
                  <label htmlFor="name" className={cx('form-label')}>
                      Tên nhân viên
                  </label>
                  <input
                      {...register("name", {required: true, })} // react hook form
                      id="name"
                      name="name"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
              </div>
              {/* 2. cmnd  */}
              <div  className={cx('form-group')}>
                  <label htmlFor="cmnd" className={cx('form-label')}>
                      Số CMND
                  </label>
                  <input
                      {...register("cmnd", {required: true, })} // react hook form
                      id="cmnd"
                      name="cmnd"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
              </div>
              {/* 3. phone */}
              <div  className={cx('form-group')}>
                  <label htmlFor="phone" className={cx('form-label')}>
                      Số điện thoại
                  </label>
                  <input
                      {...register("phone", {required: true, })} // react hook form
                      id="phone"
                      name="phone"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
              </div>
              {/* 4. address */}
              <div  className={cx('form-group')}>
                  <label htmlFor="address" className={cx('form-label')}>
                      Địa chỉ
                  </label>
                  <input
                      {...register("address", {required: true,})} // react hook form
                      id="address"
                      name="address"
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
                          {...register("branch",{valueAsNumber: true})}
                          name="branch" 
                          id="input" 
                          className={cx('form-control-right')}
                      >
                          {branch.map((val,index) => (
                                  <option key={index} value={val.branch}>Chi nhánh {val.branch}</option>
                          ))}
                      </select>
                  </div>
              </div>
              {/* 2. position */}
              <div className={cx('form-group')}>
                  <label htmlFor="position" className={cx('form-label')}>Công việc</label>
                  <div className={cx('input')}>
                      <select 
                          {...register("position",{required: true,})}
                          name="position" 
                          id="input" 
                          className={cx('form-control-right')}
                      >
                          {position.map((val,index) => (
                                  <option key={index} value={val.name}>{val.name}</option>
                          ))}
                      </select>
                  </div>
              </div>
              {/* 3.  date of birth  */}
                <div  className={cx('form-group')}>
                    <label htmlFor="dateofbirth" className={cx('form-label')}>
                        Ngày sinh
                    </label>
                    <input
                        {...register("dateofbirth", {required: true,})} // react hook form
                        id="dateofbirth"
                        name="dateofbirth"
                        type="date"
                        className={cx('date-input')}
                    ></input>
                </div>
              {/* 4. gender */}
                <div  className={cx('form-group')}>
                  <h4>Giới tính</h4>
                  <div >
                    <input 
                      {...register("gender", {required: true, })}  
                      className={cx('form-gender')} type="radio" value="Male" name="gender" /> Nam
                    <input 
                      {...register("gender", {required: true, })}
                      className={cx('form-gender')} type="radio" value="Female" name="gender" /> Nữ
                    <input 
                      {...register("gender", {required: true, })}
                      className={cx('form-gender')} type="radio" value="Other" name="gender" /> Khác
                  </div>
                </div>
              {/* 5. note */}
                <div  className={cx('form-group')}>
                    <label htmlFor="note" className={cx('form-label')}>
                        Ghi chú
                    </label>
                    <input
                        {...register("note", {required: true,})} // react hook form
                        id="note"
                        name="note"
                        type="text"
                        className={cx('form-control-left')}
                    ></input>
                </div>
            </div>
          </form>
        </div>
      </>
     );
}

export default UpdateEmployee;