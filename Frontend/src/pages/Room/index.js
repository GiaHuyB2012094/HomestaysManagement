import RoomListHorizontal from 'src/components/Layout/components/RoomListHorizontal';
// import SearchVertical from 'src/components/Layout/components/SearchVertical';
import classNames from 'classnames/bind';
import styles from './Room.module.scss';
import { useRef, useState } from 'react';
import Button from 'src/components/Button';
import { HiFilter } from 'react-icons/hi';
// import { BiSearchAlt } from 'react-icons/bi'
import dayjs from 'dayjs';
const cx = classNames.bind(styles);
function Room() {
    let today = dayjs();
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(1)
    const [fromdate, setFromdate] = useState(today.format('YYYY-MM-DD'))
    const [todate, setTodate] = useState(today.format('YYYY-MM-DD'))
    const [price, setPrice] = useState(2000000)
    // const [quanlityBedSingle, setQuanlityBedSingle] = useState(0)
    // const [quanlityBedCouple, setQuanlityBedCouple] = useState(0)
    const rangeRef = useRef()
    const bubbleRef = useRef()
    const searchRef = useRef()
    const setBubble = (range, bubble) => {
        if (range && bubble){
            var val = range.value ? (parseInt(range.value, 10)) : 200000
            const min = range.min ? range.min : 200000
            const max = range.max ? range.max : 2000000
            const newVal = Number(((val - min) * 100) / (max - min));
            bubble.innerHTML  = val;
            bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.2}px))`;
        }
    }
    const deleteFilterHandle = () => {
        setSearch('')
        setSelected(1)
        setFromdate(today.format('YYYY-MM-DD'))
        setTodate(today.format('YYYY-MM-DD'))
        setPrice(2000000)
        // setQuanlityBedSingle(0)
        // setQuanlityBedCouple(0)
        searchRef.current.focus();
    }
    return (
        <div className={cx('wrapper', 'flex')}>
            {/* <SearchVertical sendDataSearch={sendDataSearch} /> */}
            <div className={cx('inner','flex')}>
            {/* search name */}
            <div className={cx('search-Input')}>
                <input 
                    ref={searchRef}
                    type="text" 
                    placeholder="Tìm kiếm"
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <BiSearchAlt className={cx("icon")}></BiSearchAlt> */}
            </div>
            {/* branch */}
            <div className={cx('branch-Input')}>
                <label htmlFor="branch">Lựa chọn chi nhánh</label>
                <div className={cx('input')}>
                    <select 
                        name="branch" 
                        id="input" 
                        required="required"
                        value={selected}
                        onChange={(e)=>{setSelected(parseInt(e.target.value,10))}}
                    >
                        <option value="1">chi nhánh 1</option>
                        <option value="2">chi nhánh 2</option>
                        <option value="3">chi nhánh 3</option>
                    </select>
                </div>
            </div>
            {/* check-in */}
            <div className={cx('date-Input')}>
                <label htmlFor="date">Lựa chọn ngày đến</label>
                <div className={cx('input')}>
                    <input 
                        type="date" 
                        value={fromdate}
                        onChange={(e)=>{setFromdate(e.target.value)}}
                    />
                </div>
            </div>
            {/* check-out */}
            <div className={cx('date-Input')}>
                <label htmlFor="date">Lựa chọn ngày đi</label>
                <div className={cx('input')}>
                    <input 
                        type="date" 
                        value={todate}
                        onChange={(e)=>{setTodate(e.target.value)}}
                        
                    />
                </div>
            </div>
            {/* price */}

                <div className={cx('price-Input')}>
                        <div className={cx('label-total', 'flex')}>
                            <label htmlFor="quanlity">Giá Max: 2000000(VND)</label>
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
                {/* bed */}
                {/* <div className={cx('quanlityBed-input')}>
                    <label htmlFor="quanlitySingleBed">Số lượng giường đơn</label>
                    <input 
                        type="number" 
                        id="quanlitySingleBed"
                        max="10"
                        value={quanlityBedSingle}
                        onChange={(e)=>{setQuanlityBedSingle(parseInt(e.target.value,10))}}
                    >
                    </input>
                </div>
                <div className={cx('quanlityBed-input')}>
                    <label htmlFor="quanlityCoupleBed">Số lượng giường đôi</label>
                    <input 
                        type="number" 
                        id="quanlityCoupleBed"
                        max="10"
                        value={quanlityBedCouple}
                        onChange={(e)=>{setQuanlityBedCouple(parseInt(e.target.value,10))}}
                    >
                    </input>
                </div> */}
            {/* </div> */}
            {/* search button */}
            <Button
                className={cx('clearFilter', 'flex')}
                // primary
                clear
                onClick={deleteFilterHandle}
                // round
                leftIcon={<HiFilter className={cx('icon')} />}
            >
                Xóa Lọc
            </Button>
            </div>
            {/* Room */}
            <RoomListHorizontal 
                className={cx('RoomListHorizontal')} 
                price={price}
                search={search}
                selected={selected}
                fromdate={fromdate}
                todate={todate}
                // quanlityBedSingle={quanlityBedSingle}
                // quanlityBedCouple={quanlityBedCouple}

            />
        </div>
    );
}

export default Room;
