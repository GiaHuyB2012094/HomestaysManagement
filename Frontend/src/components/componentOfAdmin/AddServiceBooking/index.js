import classNames from "classnames/bind";
import styles from "./AddServiceBooking.module.scss";
import Button from "src/components/Button";
import {AiOutlineClose} from 'react-icons/ai'
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import useFetch from "src/Hook/useFetch";
import axios from "axios";
const cx = classNames.bind(styles);
function AddServiceBooking(props) {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const {data} = useFetch('/api/service/getallservices');
    
    const [service, setService] = useState([]);
    const [serviceVal, setServiceVal] = useState({});
    const [quantity, setQuantity] = useState(1);

    const [price, setPrice] = useState(0);
    const [price1, setPrice1] = useState(0);
    
    const [serviceGet, setServiceGet] = useState("");
    const [result, setResult] = useState([]);
    // const [totalamount, setTotalamount] = useState("");

    const [listService, setListService] = useState([]);
    
    useEffect(()=> {
        try {
          setService(data);
          setServiceGet(data[0]);
          setPrice(data.length>0 ? (data[0].price) : 0);
          setPrice1(data.length>0 ? (data[0].price) : 0);
        } catch (error) {
          console.log(error)
        }
      },[data])


    const {register, handleSubmit} = useForm({
        defaultValues: {
            quantity: 1,
            price: data.length>0 ? (data[0].price) : 0, 
        }
    })
    const totalamount = useMemo(()=>{
        let total=0;
        listService.forEach(serviceitem => 
            total+=serviceitem.totalamount)
        return total;
    },[listService])
    const onSubmit = async(data) => {
        Object.assign(data,{price: serviceGet.price})
        Object.assign(data,{totalamount: price})
        Object.assign(data,{name: serviceGet.name})
        Object.assign(data,{id: serviceGet._id})
        // setListService([...listService,])   
        // if (listService.includes())
        let count=0;
        const listServiceItem = listService.map(serviceItem => {
            if (data.id === serviceItem.id) {
                count++;
                return data;
            }
            return serviceItem;
        })
        if (count===0) {
            // listService.push(data)
            setListService([...listService,data])
        }  else {
            setListService(listServiceItem);
        } 
        console.log(listService);
        // props.userInfo(data);
    //    setTimeout(()=>props.openAddServiceBooking(false),1000);
    };
    const onChangeSelect = async(e) => {
        setServiceVal(e.target.value)
        try {
            const result = (await axios.get(`/api/service/getservicebyid/${e.target.value}`)).data;
            setServiceGet(result);
            setPrice(result.price);
            setPrice1(result.price);
            setQuantity(1);
        } catch (error) {
            console.log(error)
        }
    }
    const closeHandle = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
           props.openAddServiceBooking(false);
           props.listService(listService);
        }
    }
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
      });
    return (  
            <div onClick={closeHandle} className={cx("wrapper")} >
                <div className={cx('inner')}>
                    <div className={cx("closeBtn")}>
                        <AiOutlineClose className={cx("icon")} onClick={closeHandle}/>
                    </div>
                    <h2 className={cx('heading')}>Thêm dịch vụ</h2>
                    <p className={cx('desc')}>  Tìm kiếm Homestay đơn giản với Dhouse</p>
                    <form
                        className={cx('formAddService')}
                        id="form"
                        key={1}
                        onSubmit={handleSubmit(onSubmit)} 
                        >
                            <div className={cx("top",'flex')}>
                                {/* left */}
                                <div className={cx("left")}>
                                    {/* service */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="service" className={cx('form-label')}>Dịch vụ</label>
                                        <div className={cx('input')}>
                                            <select 
                                                value={serviceVal}
                                                onChange={(e)=>{
                                                    onChangeSelect(e);
                                                }}
                                                name="service" 
                                                className={cx('form-control')}
                                            >
                                                {service.length && (
                                                    service.map((val,index) => (
                                                    <option 
                                                        key={index} 
                                                        value={val._id}
                                                    >
                                                        {val.name}
                                                    </option>
                                                    ))
                                                )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {/* quantity */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="quantity" className={cx('form-label')}>
                                            Số lượng
                                        </label>
                                        <input
                                            {...register("quantity",{
                                                required: true,
                                                valueAsNumber: true,
                                                onChange:e=>{
                                                    setQuantity(e.target.value)
                                                    setPrice(parseInt(e.target.value||0)*price1)
                                                    console.log()
                                                },
                                            })}
                                            name="quantity"
                                            type="number"
                                            className={cx('form-control')}
                                        ></input>
                                    </div>
                                    {/* price */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="price" className={cx('form-label')}>
                                            Giá cả
                                        </label>
                                        <input
                                            value={price}
                                            onChange={e=>setPrice(e.target.value)}
                                            disabled
                                            name="price"
                                            type="number"
                                            className={cx('form-control')}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                    </form>                
                    <Button 
                        className={cx('form-submit')} 
                        onClick={handleSubmit(onSubmit)} 
                        primary 
                        >
                        Thêm
                    </Button>
                    <div className={cx("listServiceBoking")}>
                        <ul>
                            {   listService.length>0 
                                &&
                                listService.map((serviceval,index) => (
                                <li key={index} className={cx("flex")}>
                                    <h4>{serviceval.name} :</h4>
                                    <p>{formatter.format(serviceval.price)} * {serviceval.quantity} =</p>
                                    <p style={{color:"#00695c", fontWeight:"bold"}}>{formatter.format(serviceval.totalamount)}</p>
                                </li>
                                ))
                            }
                           
                        </ul>
                        {   totalamount!==0 && (
                            <div className={cx("flex")}>
                                <h4>Tổng tiền :</h4>
                                <h4 style={{color:"#e64a19", fontWeight:"bold"}}>{formatter.format(totalamount)}</h4>
                            </div>
                            )
                        }
                    </div>

                </div>
            </div>       
    );
}

export default AddServiceBooking;