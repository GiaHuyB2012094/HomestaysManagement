import classNames from "classnames/bind";
import style from './Convenient.module.scss';

import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import { useForm } from 'react-hook-form';
import axios from "axios";
import {MdDelete} from 'react-icons/md'
import { useEffect, useState } from "react";
import {BiSolidEditAlt} from 'react-icons/bi';
import Swal from "sweetalert2";
const cx = classNames.bind(style);

function Convenient() {
  const {data,loading} = useFetch('/api/convenient/getallconvenients');
  //  useForm
  const {register, handleSubmit, formState, reset} = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,} = useForm();
  // -------------------------------------------------------------------

  const [convenient, setConvenient] = useState([]);
  const [checkedUpdate, setCheckedUpdate] = useState(false);
  const [convenientupdateval, setConvenientupdateval] = useState('');
  const [convenientnameupdated, setConvenientNameUpdated] = useState('')
  useEffect(()=>{
    try {
      setConvenient(data);
    } catch (error) {
      console.log(error)
    }
  },[data]);
  
  const deleteConvenientHandle = async(convenientid) => {
    try {
      const deleteConvenient = (await axios.delete(`/api/convenient/deleteconvenientbyid/${convenientid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa tiện nghi thành công',
        text: 'Tiện nghi đã được xóa khỏi danh sách',
      })
      setConvenient(
        prevconvenient => (prevconvenient.filter(el => el._id !== convenientid))
      )
    } catch (error) {
      console.log(error);
    }
  }
  const updateHandle  = (convenientid) => {
    convenient.forEach((val,index)=>{
      if (val._id === convenientid){
        setConvenientupdateval(val);
        setConvenientNameUpdated(val.name);
      }
    })
    setCheckedUpdate(true);
  }
  const onSubmit = async(data) => {
    const convenients = data;
    try {
     const result = (await axios.post('/api/convenient/createconvenient',convenients)).data
     if(result !== "") {
      setConvenient([...convenient,result])
      await Swal.fire({
       icon: 'success',
       title: 'Thêm tiện nghi thành công',
       text: 'Tiện nghi mới đã được thêm vào danh sách',
     })
     } else {
        await Swal.fire({
          icon: 'error',
          title: 'Thêm tiện nghi thất bại',
          text: 'Tiện nghi này đã có trong danh sách trước đó',
        })}
    } catch (error) {
     console.log(error)
    }
 };
 useEffect(()=>{
  if (formState.isSubmitSuccessful){ 
    reset({
      name: "",
    })
  }
 },[formState,reset])
  const onSubmitUpdateHandle = async(data) => {
    console.log(data);
    try {
      const result = (await (axios.put(`/api/convenient/updateconvenientbyid/${convenientupdateval._id}`,{
        name:data.name,
      }))).data;
      await Swal.fire({
        icon: 'success',
        title: 'Cập nhật tiện nghi thành công',
        text: 'Tiện nghi mới đã được cập nhật vào danh sách',
      })
      setConvenient(result);
    } catch (error) {
      console.log(error)
    }
  }
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header>
                  <div className={cx("title","flex")}> 
                    <h2>Tiện Nghi</h2>
                  </div>
                  {loading ? <Loader/> : (
                  <div className={cx("containerDiv","flex")}>
                    <div className={cx("tableDiv")}>
                      {/* table */}
                      <table className={cx("table")}>
                        <thead>
                          <tr>
                            <th>stt</th>
                            <th>id</th>
                            <th>name</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {convenient.length ?(
                            convenient.map((text,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{text._id}</td>
                              <td>{text.name}</td>
                              <td style={{textAlign:"center"}}>
                                <BiSolidEditAlt
                                  className={cx("iconEdit")}
                                  onClick={()=>{updateHandle(text._id)}}
                                >
                                </BiSolidEditAlt>
                                <MdDelete 
                                  onClick={()=>{deleteConvenientHandle(text._id)}}
                                  className={cx("iconDelete")}>
                                </MdDelete>
                              </td>
                            </tr>))
                            ):null
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className={cx("feature")}>
                      {/* form1 add convenient */}
                      <form 
                        key={1}
                        onSubmit={handleSubmit(onSubmit)}>
                        {/* 1. title name */}
                          <div className={cx('form-group')}>
                              <label htmlFor="name" className={cx('form-label')}>
                                  Tên Tiện Nghi
                              </label>
                              <input
                                  {...register("name", {required: true, value:""})}
                                  id="name"
                                  name="name"
                                  type="text"
                                  className={cx('form-control-left')}
                              ></input>
                          {/* submit */}
                          <Button 
                              feature 
                              onClick={handleSubmit(onSubmit)}
                              className={cx("btn","addBtn")}
                              style={{textAlign: "center",width: "120px"}}
                              >
                              Thêm
                          </Button>
                        </div>
                      </form>
                      {/*form2 updete convenient------------------------------------------ */}
                      {(checkedUpdate) && (
                        <form 
                          key={2}
                          onSubmit={handleSubmit2(onSubmitUpdateHandle)}
                          className={cx("formUpdate")}
                        >
                            {/* 1. title name */}
                            <h3 style={{paddingBottom: "1rem",textTransform:"uppercase"}}>Cập nhật tiện nghi</h3>
                            <div className={cx('form-group')}>
                                <label htmlFor="name" className={cx('form-label')}>
                                    Tên Tiện Nghi
                                </label>
                                <input  
                                    {...register2("name", {
                                        required: true,
                                        value: convenientnameupdated,
                                        onChange:(e) => setConvenientNameUpdated(e.target.value) 
                                        })}
                                    id="name"
                                    value={convenientnameupdated}
                                    name="name"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            {/* submit */}
                            <Button 
                                feature 
                                onClick={handleSubmit2(onSubmitUpdateHandle)}
                                className={cx("btn","updateBtn")}
                                style={{textAlign: "center", width: "120px"}}
                                >
                                Chỉnh sửa
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                  )}  
            </div>
        </div>
    </div>
    )
}

export default Convenient;
