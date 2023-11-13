import classNames from 'classnames/bind';
import styles from './SearchHorizontal.module.scss';
import Button from '~/components/Button';
import { HiFilter } from 'react-icons/hi';
// import { useEffect } from 'react';
import SingleInputDateRangePicker from '~/components/SingleInputDateRangePicker';
import useFetch from '~/Hook/useFetch';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);
function SearchHorizontal(props) {
    const rangeRef = useRef()
    const bubbleRef = useRef()
    const [duplicaterooms, setDuplicaterooms] = useState([]);
    const {renderSingleInputDateRangePicker, date} = SingleInputDateRangePicker();
    const {data} = useFetch('/api/rooms/getallrooms');
    const [quanlityPeople, setQuanlityPeople] = useState('')
    const [price, setPrice] = useState(200000)
    const [branch, setBranch] = useState([])
    const [branchSelected, setBranchSelected] = useState(0)

    useEffect(()=>{
        const fetchDataBranch = async() => {
          try {
             const newbranch = (await axios.get('/api/branch/getallbranchs')).data;
            newbranch.unshift({branch:0})
             setBranch(newbranch);
          } catch (error) {
           console.log(error);
          } 
        }
        fetchDataBranch();
      },[]);
    useEffect(()=> {
        setDuplicaterooms(data);
    },[data]);
    
    const convertDate = (date, separator) => {
        var d = date.split(separator);
        var tam = new Date(d[2], parseInt(d[1])-1, d[0]);
        return tam;
    }   

    const searchHandle = () => {
        const  [startDate,endDate] = date;
        // convert date to string
        const fromdate = startDate.format('MM-DD-YYYY');
        const todate = endDate?endDate.format('MM-DD-YYYY'):null;
        // convert string to date
        var from = convertDate(fromdate,"-");  // date input search
        var to = convertDate(todate,"-");   // date input search
        // ----------------------
        var filteredRooms = []
        for (const room of duplicaterooms){
            var availability = false
            // search for date from and to
            if (room.currentBooking.length > 0) {
                for (const booking of room.currentBooking){
                    const fromDateOfBooked = convertDate(booking.fromdate,"-");
                    const toDateOfBooked = convertDate(booking.todate,"-");
                    if (!((from > fromDateOfBooked) && (from < toDateOfBooked))
                        && !((to > fromDateOfBooked) && (to < toDateOfBooked)))
                        {
                            if ((from !== fromDateOfBooked) 
                                && (from !== toDateOfBooked) 
                                && (to !== fromDateOfBooked)
                                && (to !== toDateOfBooked))
                                {availability = true}
                        }
                }
            }
            if (branchSelected === 0) {
                if (room.price[1] <= price 
                    && room.maxcount >= quanlityPeople
                    && (availability || room.currentBooking.length===0)
                    ) {
                        console.log(room);
                        filteredRooms.push(room);
                }
            } else {
                if (room.price[1] <= price 
                    && room.branch === branchSelected 
                    && room.maxcount >= quanlityPeople
                    && (availability || room.currentBooking.length===0)
                    ) {
                        filteredRooms.push(room);
                }
            }
        }
        setQuanlityPeople('')
        // send data
        const dataSearch = {fromdate, todate, filteredRooms}
        props.sendDataDate(dataSearch);
    }
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
    });
    const setBubble = (range, bubble) => {
        if (range && bubble){
            var val = range.value ? (parseInt(range.value, 10)) : 200000
            const min = range.min ? range.min : 200000
            const max = range.max ? range.max : 2000000
            const newVal = Number(((val - min) * 100) / (max - min));
            bubble.innerHTML  = formatter.format(val);
            bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.2}px))`;
        }
    }  
      
    return (
        <div className={cx('wrapper')} >
            <div className={cx('inner', 'flex')}>
                <div className={cx('textDiv')}>
                    <h1 className={cx('smallText')}>DHouse Dalat</h1>
                    <h1 className={cx('nameSearch-title')}>Tìm kiếm Homestay phù hợp</h1>
                </div>
                <div className={cx('search-container', 'flex')}>
                    {/* branch */}
                    <div className={cx('brach-Input')}>
                        <label htmlFor="brach">Lựa chọn chi nhánh</label>
                        <div className={cx('input', 'flex')}>
                            <select 
                                name="brach" 
                                id="input" 
                                required="required"
                                // value={branchSelected}
                                onChange={(e)=>{setBranchSelected(parseInt(e.target.value,10))}}
                            >
                            {branch.map((val,index) => {
                             if (val.branch===0) {
                               return (
                                    <option key={index} value={val.branch}>Tất cả chi nhánh</option>
                                );
                             } else {
                                return (
                                    <option key={index} value={val.branch}>Chi nhánh {val.branch}</option>
                                );
                             }  
                            })}
                            </select>
                        </div>
                    </div>
                    {/* date */}
                        <div className={cx('date-Input')}>
                            <label >Lựa chọn ngày đến</label>
                            <div className={cx('dateRangePicker', 'flex')}>
                                {renderSingleInputDateRangePicker}
                            </div>
                        </div>
                    {/* quanlity */}
                    <div className={cx('quanlity-Input')}>
                        <label htmlFor="quanlity">Lựa chọn số lượng người ở</label>
                        <div className={cx('input', 'flex')}>
                            <input 
                                type="number" 
                                placeholder="Nhập số lượng người ở" 
                                value={quanlityPeople}
                                onChange={(e) => {setQuanlityPeople(parseInt(e.target.value))}}
                            />
                        </div>
                    </div>
                    {/* price */}
                    <div className={cx('price-Input')}>
                        <div className={cx('label-total', 'flex')}>
                            <label htmlFor="quanlity">Giá Max: 2.000.000(VND)</label>
                        </div>
                        <div className={cx('input', 'flex')}>
                            <input 
                                ref={rangeRef}
                                className={cx('range')}
                                type="range" 
                                max="2000000" 
                                min="200000" 
                                step="50000"
                                value={price}
                                onInput={setBubble(rangeRef.current,bubbleRef.current)}
                                onChange={(e)=>{setPrice(parseInt(e.target.value,10))}}
                            />
                            <output ref={bubbleRef} className={cx("bubble")}></output>
                        </div>
                    </div>
                    {/* search button */}
                    <Button
                        primary
                        // round
                        onClick={searchHandle}
                        leftIcon={<HiFilter className={cx('icon')} />}
                        className={cx('searchOptions', 'flex')}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SearchHorizontal;
