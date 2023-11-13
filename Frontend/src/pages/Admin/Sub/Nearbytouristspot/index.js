import classNames from "classnames/bind";
import style from './Nearbytouristspot.module.scss';

import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import { useForm } from 'react-hook-form';
import axios from "axios";
import {MdDelete} from 'react-icons/md';
import { useEffect, useState } from "react";
import {BiSolidEditAlt} from 'react-icons/bi';
import Swal from "sweetalert2";
const cx = classNames.bind(style);
function Nearbytouristspot() {
  const {data,loading} = useFetch('/api/nearbytouristspot/getallnearbytouristspots');
  const [nearbytouristspotVal, setNearbytouristspotVal] = useState([])
  
  const [checkedUpdate, setCheckedUpdate] = useState(false);
  const [nearbytouristspotUpdateVal, setNearbytouristspotUpdateVal] = useState('');
  const [nearbytouristspotNameUpdated, setNearbytouristspotNameUpdated] = useState('')
  const [nearbytouristspotDistanceUpdated, setNearbytouristspotDistanceUpdated] = useState('')
  const [nearbytouristspotBranchUpdated, setNearbytouristspotBranchUpdated] = useState('')

  //  useForm
  const {register, handleSubmit, formState, reset} = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: formState2,
    reset: reset2,} = useForm();
  //------------------------------------- 
  useEffect(()=>{
    try {
      setNearbytouristspotVal(data);
    } catch (error) {
      console.log(error)
    }
  },[data])
  const deleteNearspotHandle = async(nearspotid) => {
    try {
      const deleteNearbyTouristspot = (await axios.delete(`/api/nearbytouristspot/deletenearbytouristspotbyid/${nearspotid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa địa điểm thành công',
        text: 'Địa điểm đã được xóa khỏi danh sách',
      })
      setNearbytouristspotVal(
        prevNear => (prevNear.filter(el => el._id !== nearspotid))
      )
      
    } catch (error) {
      console.log(error);
    }
  }
  const updateHandle  = (nearspotid) => {
    nearbytouristspotVal.forEach((val)=>{
      if (val._id === nearspotid){
        setNearbytouristspotUpdateVal(val);
        setNearbytouristspotNameUpdated(val.name);
        setNearbytouristspotDistanceUpdated(val.distance);
        setNearbytouristspotBranchUpdated(val.branch);
      }
    })
    setCheckedUpdate(true);
  }
  const onSubmit = async(data) => {
     const nearbytouristsopts = data;
     try {
      const result = (await axios.post('/api/nearbytouristspot/createnearbytouristspots',nearbytouristsopts)).data;
      if (result !== ""){
        setNearbytouristspotVal([...nearbytouristspotVal,result]);
        await Swal.fire({
          icon: 'success',
          title: 'Thêm địa điểm thành công',
          text: 'địa điểm mới đã được thêm vào danh sách',
        })
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Thêm địa điểm thất bại',
          text: 'địa điểm này đã có trong danh sách trước đó',
        }) 
      }
      // window.location.reload();
     } catch (error) {
      console.log(error)
     }
  };
  
const onSubmitUpdateHandle = async(data) => {
    try {
      const result = (await axios.put(`/api/nearbytouristspot/updatenearbytouristspot/${nearbytouristspotUpdateVal._id}`,{
        name: data.name,
        distance: data.distance,
        branch: data.branch})).data;
      // console.log(result);
      await Swal.fire({
        icon: 'success',
        title: 'Cập nhật địa điểm thành công',
        text: 'Địa điểm đã được cập nhật vào danh sách',
      })
      setNearbytouristspotVal(result);
      // window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if (formState.isSubmitSuccessful) {
      console.log("submit1")
      reset({
        name : "",
        distance : 0,
        branch: 1,
      })
    }
  },[formState,reset])

    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header>
                  <div className={cx("title","flex")}> 
                    <h2>Các địa điểm</h2>
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
                            <th>branch</th>
                            <th>name</th>
                            <th>distance</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {nearbytouristspotVal.length ?(
                            nearbytouristspotVal.map((text,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{text._id}</td>
                              <td>{text.branch}</td>
                              <td>{text.name}</td>
                              <td>{text.distance}</td>
                              <td style={{textAlign:"center"}}>
                                <BiSolidEditAlt
                                  className={cx("iconEdit")}
                                  onClick={()=>{updateHandle(text._id)}}
                                >
                                </BiSolidEditAlt>
                                <MdDelete 
                                  onClick={()=>{deleteNearspotHandle(text._id)}}
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
                      {/* edit */}
                      <form 
                        key={1}
                        onSubmit={handleSubmit(onSubmit)} 
                        className={cx("form")}>
                          {/* 1. title name */}
                            <div className={cx('form-group')}>
                                <label htmlFor="name" className={cx('form-label')}>
                                    Tên địa điểm
                                </label>
                                <input
                                    {...register("name", {required: true, value:""})}
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            </div>
                            {/* 2. distance */}
                            <div className={cx('form-group')}>
                                <label htmlFor="distance" className={cx('form-label')}>
                                    Khoảng cách
                                </label>
                                <input
                                    {...register("distance", {required: true, value:""})}
                                    id="distance"
                                    name="distance"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            </div>
                          {/* 3. branch */}
                            <div className={cx('form-Input')}>
                                <label htmlFor="branch" className={cx('form-label')}>Chi nhánh</label>
                                <div className={cx('input')}>
                                    <select 
                                        {...register("branch",{value:1,valueAsNumber: true})}
                                        name="branch" 
                                        id="input" 
                                        className={cx('form-control-right')}
                                    >
                                        <option value="1">chi nhánh 1</option>
                                        <option value="2">chi nhánh 2</option>
                                        <option value="3">chi nhánh 3</option>
                                    </select>
                                </div>
                            </div>
                          {/* submit */}
                          <Button 
                              feature 
                              onClick={handleSubmit(onSubmit)}
                              className={cx("btn","addBtn")}
                              style={{width: "120px",textAlign: "center"}}
                              >
                              Thêm
                          </Button>
                      </form>
                      {/*form2 update------------------------------------------------------------------------- */}
                      {(checkedUpdate) && (
                        <form 
                          key={2}
                          onSubmit={handleSubmit2(onSubmitUpdateHandle)}
                          className={cx("formUpdate")}
                        > 
                            {/* 1. title name */}
                            <h3 style={{paddingBottom: "1rem",textTransform:"uppercase"}}>Cập nhật địa điểm</h3>
                            <div className={cx('form-group')}>
                                <label htmlFor="name" className={cx('form-label')}>
                                    Tên địa điểm
                                </label>
                                <input
                                    {...register2("name", {
                                        required: true,
                                        // value: nearbytouristspotNameUpdated,
                                        onChange:(e) => setNearbytouristspotNameUpdated(e.target.value) 
                                        })} 
                                    id="name"
                                    value={nearbytouristspotNameUpdated}
                                    name="name"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            {/* 2. distance */}
                            <div className={cx('form-group')}>
                                <label htmlFor="distance" className={cx('form-label')}>
                                    Khoảng cách
                                </label>
                                <input
                                    {...register2("distance", {
                                        required: true,
                                        // value:nearbytouristspotDistanceUpdated,
                                        onChange: (e)=> setNearbytouristspotDistanceUpdated(e.target.value)
                                      })}
                                    id="distance"
                                    value={nearbytouristspotDistanceUpdated}
                                    name="distance"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            </div>
                            {/* 3. branch */}
                            <div className={cx('form-Input')}>
                                <label htmlFor="branch" className={cx('form-label')}>Chi nhánh</label>
                                <div className={cx('input')}>
                                    <select 
                                        {...register2("branch",{
                                          // value:nearbytouristspotBranchUpdated,
                                          valueAsNumber: true,
                                          onChange: (e) => setNearbytouristspotBranchUpdated(e.target.value)
                                        })}
                                        name="branch" 
                                        id="input" 
                                        value={nearbytouristspotBranchUpdated}
                                        className={cx('form-control-right')}
                                    >
                                        <option value="1">chi nhánh 1</option>
                                        <option value="2">chi nhánh 2</option>
                                        <option value="3">chi nhánh 3</option>
                                    </select>
                                </div>
                            </div>
                            {/* submit */}
                            <Button 
                                feature 
                                onClick={handleSubmit2(onSubmitUpdateHandle)}
                                className={cx("btn","updateBtn")}
                                style={{width: "120px",textAlign: "center"}}
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

export default Nearbytouristspot;
