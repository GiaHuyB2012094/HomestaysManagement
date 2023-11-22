import classNames from "classnames/bind";
import style from './Service.module.scss';

import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import {MdDelete} from "react-icons/md";
import { useEffect, useState } from "react";  
import axios from "axios";
import Swal from "sweetalert2";
import AddService from "src/components/componentOfAdmin/AddService/index.";
const cx = classNames.bind(style);

  

function Service() {
  const {data,loading} = useFetch('/api/service/getallservices');
  const [service, setService] = useState([]);
  const [checked, setChecked] = useState(0);
  useEffect(()=> {
    try {
      setService(data);
    } catch (error) {
      console.log(error)
    }
  },[data])
  const deleteServiceHandle = async(serviceid) => {
    try {
      const deleteUser = (await axios.delete(`/api/service/deleteservicebyid/${serviceid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa dịch vụ thành công',
        text: 'Dịch vụ đã được xóa khỏi danh sách',
      })
      setService(
        prevService => (prevService.filter(el => el._id !== serviceid))
      )
    } catch (error) {
      console.log(error);
    }
  }
  // delete room by id
 
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header> 

                {(checked===0) ? (
                  <>
                  <div className={cx("title","flex")}> 
                    <h2>Dịch vụ</h2>
                    <Button feature className={cx("btn","updateBtn")} onClick={()=>setChecked(1)}>Thêm</Button>
                  </div>
                  {loading ? <Loader/> : (
                  <div className={cx("tableDiv")}>
                    <table>
                      <thead>
                        <tr>
                          <th>stt</th>
                          <th>tên</th>
                          <th>giá</th>
                          <th>mô tả</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {service.length &&
                          service.map((text,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{text.name}</td>
                            <td>{text.price}</td>
                            <td>{text.desc}</td>
                            <td style={{textAlign:"center"}}><MdDelete onClick={()=>{deleteServiceHandle(text._id)}} className={cx("iconDelete")}></MdDelete></td>
                          </tr>))
                        }
                      </tbody>
                    </table>
  
                  </div>
                  
                  )}
                </>
                ) : (
                  (checked===1) ? (
                    <AddService 
                      sendData = {(data)=>setChecked(data)}
                      sendAllServices = {(data)=>setService(data)}
                      service = {service}
                    />
                  ) : (
                    <></>
                  )
                )
                }
            </div>
        </div>
    </div>
    )
}

export default Service;
