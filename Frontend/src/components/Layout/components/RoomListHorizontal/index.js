import classNames from 'classnames/bind';
import styles from './RomListHorizontal.module.scss';
import Image from 'src/components/Image';
import { ImLocation2 } from 'react-icons/im';
import { BsClipboardCheck } from 'react-icons/bs';
import Button from 'src/components/Button';
import useFetch from 'src/Hook/useFetch';
import Loader from 'src/components/Loader';

const cx = classNames.bind(styles);
function RoomListHorizontal({ className, price, search, selected, fromdate, todate}) {
    const {data,loading} = useFetch('/api/rooms/getallrooms');
    // YYYY-MM-DD (0,1,2)                           String -> Date
    const convertDate = (date, separator) => {
        var d = date.split(separator);
        var tam = new Date(d[0], parseInt(d[1])-1, d[2]);
        return tam;
    } 
    // MM-DD-YYYY (1,2,0) -> YYYY-MM-DD (2,0,1)     String -> Date
    const convertDateBooking = (date, separator) => {
        var d = date.split(separator);
        var tam = new Date(d[2], parseInt(d[0])-1, d[1]);
        return tam;
    }
    // YYYY-MM-DD conver MM-DD-YYYY                 String -> String
    const convertFormatStringDate = (date, separator) =>{
        let arr = date.split(separator);
        return arr[1] + '-' + arr[2] + '-' + arr[0];
    }
    // MM-DD-YYYY                                   Date -> String
    const convertFormatDate = (date) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return month + '-' + day + '-' + year;
    }
    const checkTimeBooking = (room, from, to) => {
        let availability = false
        if (room.currentBooking.length > 0) {
            for (const booking of room.currentBooking){
                const fromDateOfBooked = convertDateBooking(booking.fromdate,"-");
                const toDateOfBooked = convertDateBooking(booking.todate,"-");
                
                if (!((from > fromDateOfBooked) && (from < toDateOfBooked))
                    && !((to > fromDateOfBooked) && (to < toDateOfBooked)))
                    {
                        if ((from !== fromDateOfBooked) 
                            && (from !== toDateOfBooked) 
                            && (to !== fromDateOfBooked)
                            && (to !== toDateOfBooked))
                            {availability = true}
                    }
                if (availability===false) return availability;
            }
        }
        return availability;
    }
    const filterHandle = (room) => {
        let check = false
        const from = convertDate(fromdate,"-");
        const to = convertDate(todate,"-");
        // YYYY-MM-DD (0,1,2)--> MM-DD-YYYY (1,2,0)
        if ((room.price[1] < price) 
            && (room.name.includes(search))
            && (room.branch===selected)
            && (checkTimeBooking(room, from, to)|| room.currentBooking.length===0)
            ) {
            check = true;
        }
            return check;
    }
    const fromdateParam = convertFormatStringDate(fromdate,"-");
    const todateParam = convertFormatStringDate(todate,"-");
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
    });
    return (
       <div className={cx('wrapper', 'flex', className)}>
            {loading ? (
                <Loader></Loader>
            ): (
                <>
                {
                data.filter(room => {return (filterHandle(room))}).map((room,index) => {
                    return (
                        <div key={index} className={cx('cartSingleRoom', 'flex')}>
                            {/* img */}
                            <div className={cx('avatarRoom')}>
                                <Image src={room.imgs[0].src} alt={room.imgs[0].alt} className={cx('imgRoom')}></Image>
                            </div>
                            {/* content */}
                            <div className={cx('bodyRoom')}>
                                <h4 className={cx('nameRoom')}>{room.name}</h4>
    
                                <span className={cx('container', 'flex')}>
                                    <ImLocation2 className={cx('icon')} />
                                    <span className={cx('branchRoom')}>Chi Nhánh: {room.branch}</span>
                                </span>
                                <p className={cx('acreageRoom')}>Diện tích: {room.acreage} m2</p>
                                <h5 className={cx('color-green')}>Có kinh nghiệm dịch vụ</h5>
    
                                <div className={cx('descRoom')}>
                                    <p>{room.desc}</p>
                                </div>
                                <p>Địa chỉ</p>
                                <p className={cx('addressRoom')}>{room.address}</p>
                                <h4 className={cx('color-green')}>Miễn phí hủy trả phòng</h4>
                            </div>
                            {/* price--see detail--payment */}
                            <div className={cx('seeDetailDiv')}>
                                {/* rating room */}
                                <div className={cx('rating', 'flex')}>
                                    <h4>Tốt</h4>
                                </div>
                                {/* price */}
                                <div className={cx('priceRoom', 'flex')}>
                                    <h3> {formatter.format(room.price[1])}</h3>
                                    <h5>Bao gồm cả thuế và phí</h5>
                                </div>
                                {/* see detail */}
                                <Button
                                    primary
                                    small
                                    to={`/Book/${room._id}/${fromdateParam}/${todateParam}`}
                                    className={cx('btnRoom')}
                                    leftIcon={<BsClipboardCheck />}
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </>)}
        </div>
    );
}

export default RoomListHorizontal;
