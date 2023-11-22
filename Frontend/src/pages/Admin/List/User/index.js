import classNames from "classnames/bind";
import style from './User.module.scss';

import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import {MdDelete} from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const cx = classNames.bind(style);

  

function User() {
  const {data,loading} = useFetch('/api/users/getallusers');
  const [user, setUser] = useState([]);
  useEffect(()=> {
    try {
      setUser(data);
    } catch (error) {
      console.log(error)
    }
  },[data])
  const deleteUserHandle = async(usreid) => {
    try {
      const deleteUser = (await axios.delete(`/api/users/deleteuserbyid/${usreid}`))
      await Swal.fire({
        icon: 'success',
        title: 'Xóa người dùng thành công',
        text: 'Người dùng đã được xóa khỏi danh sách',
      })
      setUser(
        prevUser => (prevUser.filter(el => el._id !== usreid))
      )
    } catch (error) {
      console.log(error);
    }
  }
  // delete room by id
 
  console.log(data);
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header> 
                <div className={cx("title","flex")}> 
                  <h2>User</h2>
                  {/* <Button feature className={cx("btn","updateBtn")}>Cập nhật</Button> */}
                </div>
                {loading ? <Loader/> : (
                <div className={cx("tableDiv")}>
                  <table>
                    <thead>
                      <tr>
                        <th>stt</th>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>is admin</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {user.length &&
                        user.map((text,index)=>(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{text._id}</td>
                          <td>{text.name}</td>
                          <td>{text.email}</td>
                          <td>{text.isAdmin ? 'YES' : 'NO'}</td>
                          <td style={{textAlign:"center"}}><MdDelete onClick={()=>{deleteUserHandle(text._id)}} className={cx("iconDelete")}></MdDelete></td>
                        </tr>))
                      }
                    </tbody>
                  </table>
                </div>)}
            </div>
        </div>
    </div>
    )
}

export default User;
