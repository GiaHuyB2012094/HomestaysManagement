import classNames from "classnames/bind";
import style from './Branch.module.scss';

import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import { useForm } from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import axios from "axios";
import { useEffect, useState } from "react";
import {BiSolidEditAlt} from 'react-icons/bi';
import Swal from "sweetalert2";
const cx = classNames.bind(style);


function Branch() {
  const {data,loading} = useFetch('/api/branch/getallbranchs');
  const [branch, setBranch] = useState([]);
  const [branchUpdatedVal, setBranchUpdatedVal] = useState([]);
  const [nameBranchUpdated, setNameBranchUpdated] = useState([])
  const [addressBranchUpdated, setAddressBranchUpdated] = useState([])
  const [numberBranchUpdated, setNumberBranchUpdated] = useState([])
  const [checkedUpdate, setCheckedUpdate] = useState(false);
  const {register, handleSubmit, formState, reset} = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    } = useForm();
  useEffect(()=>{
    try {
      setBranch(data);
    } catch (error) {
      console.log(error)
    }
  },[data])
  const updateHandle  = (branchid) => {
    branch.forEach((val)=>{
      if (val._id === branchid){
        setBranchUpdatedVal(val);
        setNameBranchUpdated(val.name);
        setAddressBranchUpdated(val.address);
        setNumberBranchUpdated(val.branch);
      }
    })
    setCheckedUpdate(true);
  }
  const onSubmit = async(data) => {
     const branchs = data;
     try {
      const result = (await axios.post('/api/branch/addbranch',branchs)).data
      if (result !== ""){
        setBranch([...branch, result]);
        await Swal.fire({
          icon: 'success',
          title: 'Thêm chi nhánh thành công',
          text: 'Chi nhánh đã được Thêm khỏi danh sách',
        })
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Thêm chi nhánh thất bại',
          text: 'Chi nhánh đã có trong danh sách trước đó',
        })
      }
     } catch (error) {
      console.log(error)
     }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful){
      reset({
        name: "",
        address: "",
        branch: 0,
      })
    }
  },[formState,reset]);
  const onSubmitUpdateHandle = async(data) => {
    try {
      const result = (await axios.put(`/api/branch/updatebranchbyid/${branchUpdatedVal._id}`,{
        name: data.name,
        address: data.address,
        branch: data.branch})).data;
      await Swal.fire({
        icon: 'success',
        title: 'Cập nhật địa điểm thành công',
        text: 'Địa điểm đã được cập nhật vào danh sách',
      })
      setBranch(result);
    } catch (error) {
      console.log(error)
    }
  }
  const deleteBranchHandle = async(branchid) => {
    try {
      const deleteBranch = (await axios.delete(`/api/branch/deletebranchbyid/${branchid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa chi nhánh thành công',
        text: 'Chi nhánh đã được xóa khỏi danh sách',
      })
      setBranch(
        prevBranch => (prevBranch.filter(el => el._id !== branchid))
      )
    } catch (error) {
      console.log(error);
    }
  }
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header>
                  <div className={cx("title","flex")}> 
                    <h2>Các chi nhánh</h2>
                  </div>
                  {loading ? <Loader/> : (
                  <div className={cx("containerDiv","flex")}>
                    <div className={cx("tableDiv")}>
                      <div className={cx("tableDiv1")}>
                        {/* table1 */}
                        <table className={cx("table1")}>
                          <thead>
                            <tr>
                              <th>stt</th>
                              <th>id</th>
                              <th>branch</th>
                              <th>name</th>
                              <th>address</th>
                              <th>action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {branch.length ?(
                              branch.map((text,index)=>(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{text._id}</td>
                                <td>{text.branch}</td>
                                <td>{text.name}</td>
                                <td>{text.address}</td>
                                <td style={{textAlign:"center"}}>
                                  <BiSolidEditAlt
                                    onClick={()=>{updateHandle(text._id)}}
                                    className={cx("iconEdit")}
                                  >
                                  </BiSolidEditAlt>
                                  <MdDelete 
                                    onClick={()=>{deleteBranchHandle(text._id)}}
                                    className={cx("iconDelete")}>
                                  </MdDelete></td>
                              </tr>))
                              ):null
                            }
                          </tbody>
                        </table>
                      </div>
                      <div className={cx("tableDiv1")}>
                        {/* table1 */}
                        <table className={cx("table1")}>
                          <thead >
                            <tr >
                              <th className={cx("green")}>stt</th>
                              <th className={cx("green")}>branch</th>
                              <th className={cx("green")}>name</th>
                              <th className={cx("green")}>total room</th>
                              <th className={cx("green")}>total ordered room</th>
                              <th className={cx("green")}>total empty room</th>
                              <th className={cx("green")}>action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {branch.length ?(
                              branch.map((text,index)=>(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{text.branch}</td>
                                <td>{text.name}</td>
                                <td>{text.totalroom}</td>
                                <td>{text.totalorderedroom}</td>
                                <td>{text.totalemptyroom}</td>
                                <td style={{textAlign:"center"}}>
                                  <BiSolidEditAlt
                                  onClick={()=>{updateHandle(text._id)}}
                                  className={cx("iconEdit")}
                                  >
                                  </BiSolidEditAlt>
                                  <MdDelete  
                                    onClick={()=>{deleteBranchHandle(text._id)}}
                                    className={cx("iconDelete")}>
                                  </MdDelete>
                                </td>
                              </tr>))
                              ):null
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className={cx("feature")}>
                      {/* edit */}
                      <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
                          {/* 1. title name */}
                            <div className={cx('form-group')}>
                                <label htmlFor="name" className={cx('form-label')}>
                                    Tên chi nhánh
                                </label>
                                <input
                                    {...register("name", {required: true, value:""})}
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            </div>
                            {/* 2. address */}
                            <div className={cx('form-group')}>
                                <label htmlFor="address" className={cx('form-label')}>
                                    Địa chỉ
                                </label>
                                <input
                                    {...register("address", {required: true, value:""})}
                                    id="address"
                                    name="address"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            </div>
                          {/* 3. branch */}
                          <div className={cx('form-group')}>
                                    <label htmlFor="branch" className={cx('form-label')}>
                                        Chi nhánh
                                    </label>
                                    <input
                                        {...register("branch",{required: true,min: 1,value:1, valueAsNumber: true})}
                                        id="branch"
                                        name="branch"
                                        type="number"
                                        className={cx('form-control-right')}
                                    ></input>
                                    <span className={cx('form-message')}></span>
                                </div>
                          {/* submit */}
                         <div className={cx('btnFeature','flex')}>
                            
                            <Button 
                                feature 
                                onClick={handleSubmit(onSubmit)}
                                className={cx("btn","addBtn")}
                                style={{textAlign: "center", width:"120px"}}
                                >
                                  Thêm
                            </Button>
                         </div>
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
                                    Tên chi nhánh
                                </label>
                                <input
                                    {...register2("name", {
                                        required: true,
                                        onChange:(e) => setNameBranchUpdated(e.target.value) 
                                        })} 
                                    id="name"
                                    value={nameBranchUpdated}
                                    name="name"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            {/* 2. address */}
                            <div className={cx('form-group')}>
                                <label htmlFor="address" className={cx('form-label')}>
                                    Địa chỉ
                                </label>
                                <input
                                    {...register2("address", {
                                        required: true,
                                        onChange: (e)=> setAddressBranchUpdated(e.target.value)
                                      })}
                                    id="address"
                                    value={addressBranchUpdated}
                                    name="address"
                                    type="text"
                                    className={cx('form-control-left')}
                                ></input>
                            </div>
                            {/* 3. branch */}
                            <div className={cx('form-group')}>
                                <label htmlFor="branch" className={cx('form-label')}>
                                    Địa chỉ
                                </label>
                                <input
                                    {...register2("branch", {
                                        required: true,
                                        onChange: (e)=> setNumberBranchUpdated(e.target.value)
                                      })}
                                    id="branch"
                                    value={numberBranchUpdated}
                                    name="branch"
                                    type="number"
                                    className={cx('form-control-left')}
                                ></input>
                            </div>
                            {/* submit */}
                            <Button 
                                round 
                                onClick={handleSubmit2(onSubmitUpdateHandle)}
                                className={cx("btn","updateBtn")}
                                style={{textAlign: "center", width:"120px"}}
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

export default Branch;
