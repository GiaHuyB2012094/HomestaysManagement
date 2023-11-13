import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from './Employee.module.scss';

import UpdateRoom from "~/components/componentOfAdmin/UpdateRoom/UpdateRoom";
import Slidebar from "~/components/componentOfAdmin/Slidebar";
import Header from "~/components/componentOfAdmin/Header";
import Button from "~/components/Button";
import useFetch from "~/Hook/useFetch";
import Loader from "~/components/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import {MdDelete} from "react-icons/md";
import {BiSolidEditAlt} from 'react-icons/bi'
import AddPositionOfEmployee from "~/components/componentOfAdmin/AddPositionOfEmployee/index.";
import UpdatePositionOfEmployee from "~/components/componentOfAdmin/UpdatePositionOfEmployee";
import AddEmployee from "~/components/componentOfAdmin/AddEmployee/index.";
import UpdateEmployee from "~/components/componentOfAdmin/UpdateEmployee/index.";
// -------------------
const cx = classNames.bind(style);
function Employee() {
  // const {data,loading} = useFetch('/api/rooms/getallrooms');
  const {data,loading} = useFetch('/api/employees/getallemployees')
  const [checked, setChecked] = useState(0);

  const [employee, setEmployee] = useState([])
  const [position, setPosition] = useState([])
  const [employeeupdatechoosed, setEmployeeupdatechoosed] = useState([])
  const [positionupdatechoosed, setPositionupdatechoosed] = useState([])
  // get all position of employees
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
  // get all employees
  useEffect(()=>{
    try {
      setEmployee(data)
    } catch (error) {
      console.log(error)
    }
  },[data])
  // delete employee by id
  const deleteEmployeeHandle = async(employeeid) => {
    try {
      const deleteEmployee = (await axios.delete(`/api/employees/deleteempoyeebyid/${employeeid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa nhân viên thành công',
        text: 'Nhân viên đã được xóa khỏi danh sách',
      })
      setEmployee(
        prevEmployee => (prevEmployee.filter(el => el._id !== employeeid))
      )
    } catch (error) {
      console.log(error);
    }
  }
  // update employee
  const updateEmployeeHandle = (employeeval) => {
    setEmployeeupdatechoosed(employeeval);
    setChecked(2);
  }
  // update position of employee
  const updateRoomTypeHandle = (positionval) => {
    setPositionupdatechoosed(positionval);
    setChecked(5);
  }
  // delete position of employees
  const deletePositionHandle = async(positionid) => {
    try {
      const deletePosition = (await axios.delete(`/api/positionofemployee/deletepositionofemployeebyid/${positionid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa chức vụ & lương thành công',
        text: 'hức vụ & lương đã được xóa khỏi danh sách',
      });
      setPosition(
        prevPosition => (prevPosition.filter(el => el._id !== positionid))
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
                {checked===0 ? 
                  (<>
                    <div className={cx("title","flex")}> 
                      <h2>Nhân viên & Bảng tính lương</h2>
                      <div className={cx("flex")}>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(3)}
                        >
                          Thêm bảng tính lương
                        </Button>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(1)}
                        >
                          Thêm nhân viên
                        </Button>
                      </div>
                    </div>
                    <div className="flex">
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            color: "#fff",
                            padding: "8px",
                            backgroundColor:"#0090da", 
                            width: "170px",
                            cursor: "pointer",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }} 
                        onClick={()=>setChecked(0)}
                        >
                        Danh sách nhân viên
                      </div>
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            color: "#1f1f29",
                            padding: "8px",
                            backgroundColor:"#ddd", 
                            width: "140px",
                            cursor: "pointer",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }}
                        onClick={()=>setChecked(4)}
                        >
                        Bảng tính lương
                      </div>
                    </div>
                    {loading ? <Loader/> : (
                    <div className={cx("tableDiv")}>
                      <table >
                        <thead>
                          <tr>
                            <th>stt</th>
                            <th>Tên Nhân viên</th>
                            <th>Chi nhánh</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Công việc</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {employee.length ?(
                            employee.map((text,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{text.name}</td>
                              <td>{text.branch}</td>
                              <td>
                                { (text.gender==="Male") ? (<span>Nam</span>) :
                                  ((text.gender==="Female") ? (<span>Nữ</span>) : (
                                    <span>Khác</span>
                                  ))}
                              </td>
                              <td>{text.phone}</td>
                              <td>{text.address}</td>
                              <td>{text.position[0].name}</td>
                              <td   >
                                <BiSolidEditAlt
                                  onClick={()=>{updateEmployeeHandle(text)}}
                                  className={cx("iconEdit")}
                                    >
                                </BiSolidEditAlt>
                                <MdDelete 
                                  className={cx("iconDelete")}
                                  onClick={()=>{deleteEmployeeHandle(text._id)}}
                                >
                                </MdDelete>
                              </td>

                            </tr>))
                            ):null
                          }
                        </tbody>
                      </table>
                    </div>  )}
                  </>) : 
                (checked===4 ? (
                <>
                  <div className={cx("title","flex")}> 
                      <h2>Nhân viên & Bảng tính  lương</h2>
                      <div className={cx("flex")}>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(3)}
                        >
                          Thêm bảng tính lương
                        </Button>
                        <Button 
                          feature
                          className={cx("btn","updateBtn")}
                          onClick={()=>setChecked(1)}
                        >
                          Thêm nhân viên
                        </Button>
                      </div>
                    </div>
                    <div className="flex">
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            padding: "8px",
                            width: "170px",
                            cursor: "pointer",
                            backgroundColor:"#ddd", 
                            color: "#1f1f29",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }} 
                        onClick={()=>setChecked(0)}
                        >
                        Danh sách nhân viên
                      </div>
                      <div 
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            fontWeight: "bold",
                            padding: "8px",
                            backgroundColor:"#0090da", 
                            color: "#fff",

                            width: "140px",
                            cursor: "pointer",
                            margin: "1rem 0 0 2rem",
                            borderRadius: "5px 5px 0 0"
                        }}
                        onClick={()=>setChecked(4)}
                        >
                        Bảng tính lương
                      </div>
                    </div>
               
                    <div className={cx("tableDiv")}>
                      <table className={cx("table2")}>
                        <thead>
                          <tr>
                            <th>stt</th>
                            <th>Mã chức vụ</th>
                            <th>Tên chức vụ</th>
                            <th>Lương</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {position.length ?(
                            position.map((text,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{text._id}</td>
                              <td>{text.name}</td>
                              <td>{text.salary}</td>
                              <td >
                                <BiSolidEditAlt
                                  onClick={()=>{updateRoomTypeHandle(text)}}
                                  className={cx("iconEdit")}
                                    >
                                </BiSolidEditAlt>
                                <MdDelete 
                                  className={cx("iconDelete")}
                                  onClick={()=>{deletePositionHandle(text._id)}}
                                >
                                </MdDelete>
                              </td>

                            </tr>))
                            ):null
                          }
                        </tbody>
                      </table>
                    </div>
                </>) :
                (checked===1 ? 
                  (<AddEmployee 
                      sendData={(data)=>setChecked(data)}
                      sendAllEmployees={(ok)=>{if (ok) setEmployee(ok)}}
                      employee={employee}
                      position={position}
                    />) :
                (checked===2 ? 
                  (<UpdateEmployee
                      sendData={(data)=>setChecked(data)}
                      employee={employeeupdatechoosed}
                      position={position}
                      sendAllEmployees={(ok)=>{if (ok) console.log(ok)}}

                      // sendAllRoom={(ok)=>{if (ok.data) setRoom(ok.data)}}
                      // roomdetail={roomupdatechoosed}
                      // roomtype={roomtype}
                    />) :
                (checked===3 ? (
                  <AddPositionOfEmployee
                    sendData={(data)=>setChecked(data)}
                    sendAllPositions={(ok)=>{setPosition(ok)}}
                    position={position}
                  />
                ) :
                (checked===5 ? (
                  <UpdatePositionOfEmployee
                    sendData={(data)=>setChecked(data)}
                    sendAllPositions={(ok)=>{setPosition(ok)}}
                    position={positionupdatechoosed}
                  />
                ) : (<></>)
                )))))}
            </div>
        </div>
    </div>
    )
}

export default Employee;
