import classNames from "classnames/bind";
import style from './Dashboard.module.scss';

import Slidebar from "~/components/componentOfAdmin/Slidebar";
import Header from "~/components/componentOfAdmin/Header";
import Button from "~/components/Button";
import useFetch from "~/Hook/useFetch";
import Loader from "~/components/Loader";
import Widget from "~/components/componentOfAdmin/Widget";
import PieChartt from "~/components/componentOfAdmin/Chart/PieChartt";
import ResponsiveContainerChart from "~/components/componentOfAdmin/Chart/ResponsiveContainerChart";
import BarChartt from "~/components/componentOfAdmin/Chart/BarChartt";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
const cx = classNames.bind(style);

  

function Dashboard() {
  // const {data,loading} = useFetch('/api/users/getallusers');
  const [user,setUser] = useState([])
  const [room,setRoom] = useState([])
  const [employee,setEmployee] = useState([])
  const [earning,setEarning] = useState([])
  const [branch,setBranch] = useState([])

  const {data,loading} = useFetch('/api/receipt/getallreceipt');
  const [receipt, setReceipt] = useState("")
  // room
  useEffect(()=>{
    const fecthData = async() => {
      try {
        const result = (await axios.get('/api/rooms/getallrooms')).data;
        setRoom(result)
      } catch (error) {
        console.log(error)
      }
    }
    fecthData();
  },[])
// users
  useEffect(()=>{
    const fecthData = async() => {
      try {
        const result = (await axios.get('/api/users/getallusers')).data;
        setUser(result)
      } catch (error) {
        console.log(error)
      }
    }
    fecthData();
  },[])
// bracnhs
  useEffect(()=>{
    const fecthData = async() => {
      try {
        const result = (await axios.get('/api/branch/getallbranchs')).data;
        setBranch(result)
      } catch (error) {
        console.log(error)
      }
    }
    fecthData();
  },[])
  // employee
  useEffect(()=>{
    const fecthData = async() => {
      try {
        const result = (await axios.get('/api/employees/getallemployees')).data;
        setEmployee(result)
      } catch (error) {
        console.log(error)
      }
    }
    fecthData();
  },[])
  
  useEffect(()=> {
      try {
        setReceipt(data);
      } catch (error) {
        console.log(error)
      }
    },[data])
  // receipt
  useEffect(()=>{
    const fecthData = async() => {
      try {
        const result = (await axios.get('/api/rooms/getallrooms')).data;
        setRoom(result)
      } catch (error) {
        console.log(error)
      }
    }
    fecthData();
  },[])
  const dataPieChart = [
    { name: 'user', value:  user.length,color:'#0088FE'},
    { name: 'room', value:  room.length,color:'#00C49F'},
    { name: 'employee', value: 0,color:'#FFBB28'},
    { name: 'branch', value: branch.length  ,color:'#FF8042'},
  ];
  console.log(user.length)

  const totalSpending = useMemo(()=>{
    let total = 0;
    if (receipt){
      receipt.forEach(receiptval=>{
        if(receiptval.isPayment)
          total = total + receiptval.price;
      })
    }
    return total
  },[receipt])
  const totalIncome = useMemo(()=>{
    let total = 0;
    if (receipt){
      receipt.forEach(receiptval=>{
        if(!receiptval.isPayment)
          total = total + receiptval.price;
      })
    }
    return total
  },[receipt])
  
    return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Slidebar></Slidebar>
            <div className={cx("right")}>
                <Header></Header>
                <div className={cx("dashboard")}>
                  <div className={cx("title","flex")}> 
                    <h2>Dashboard</h2>
                  </div>
                  <div className={cx("widgets","flex")}>
                    <Widget total={user.length} type="user"></Widget>
                    <Widget total={room.length} type="room"></Widget>
                    <Widget total={employee.length}type="employee"></Widget>
                    <Widget total={totalIncome-totalSpending}type="earning"></Widget>
                    <Widget total={branch.length}type="branch"></Widget>
                  </div>
                  <div className={cx("charts")}> 
                    <PieChartt dataPieChart={dataPieChart}></PieChartt>
                    <ResponsiveContainerChart></ResponsiveContainerChart>
                    <BarChartt></BarChartt>
                  </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard;
