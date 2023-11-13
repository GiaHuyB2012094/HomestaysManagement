import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RoomDetail.module.scss';
import Image from 'src/components/Image';
import Button from 'src/components/Button';
import { ImLocation2 } from 'react-icons/im';
import { BsCheckLg, BsImageFill } from 'react-icons/bs';
import { useParams } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai';
import useFetch from 'src/Hook/useFetch';
import Loader from 'src/components/Loader';
import FormBooking from 'src/components/Layout/components/FormBooking';
import Swal from 'sweetalert2';
const cx = classNames.bind(styles);

const URLHomestay =
    'https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg?s=16x 16w, https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg?s=116x 116w, https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg?s=375x 375w, https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg?s=600x 600w, https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg?s=800x 800w, https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg?s=1024x 1024w';
function RoomDetail() {
    const [checkShowMoreImage, setCheckShowMoreImage] = useState(false);
    const [openFormBooking, setOpenFormBooking] = useState(false);
    let { roomid, fromdate, todate } = useParams();
    const {data,loading} = useFetch(`/api/rooms/getroombyid/${roomid}`);
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const paymentHandle = async() => {
        if (!user){
            await (Swal.fire({
                    icon: 'warning',
                    title: 'Bạn Chưa Đăng Nhập',
                    text: 'Thực viện việc đăng nhập để đặt phòng!',
                }))
            window.location.href = '/login'
        } else {
            setOpenFormBooking(!openFormBooking);
        }
    }
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
    });
    return (
        <div className={cx('wrapper', 'flex')}>
                   { loading ?(
                       <h2><Loader></Loader></h2>):(
                       <>
                            {checkShowMoreImage === false ? (
                                <>
                                    <div className={cx('topInner')}>
                                        {/* title */}
                                        <div className={cx('titleRoom')}>
                                            <h2 className={cx('nameRoom')}>{data.name}</h2>
                                            <div className={cx('branchRoom', 'flex')}>
                                                <ImLocation2 className={cx('icon')}></ImLocation2>
                                                <h4>Chi Nhánh: {data.branch}</h4>
                                            </div>
                                        </div>
                                        {/* image */}
                                        {data.imgs ? (
                                            (data.imgs.length > 2) ? (
                                                <>
                                                <div className={cx('imageRoom', 'flex')}>
                                                    <div className={cx('imagePrimary')}>
                                                        <Image
                                                            src={data.imgs[0].src}
                                                            alt={data.imgs[0].alt}
                                                            className={cx('image1')}
                                                        />
                                                    </div>
                                                    <div className={cx('imageSub', 'flex')}>
                                                        <Image
                                                            src={data.imgs[1].src}
                                                            alt={data.imgs[1].alt}
                                                            className={cx('image2')}
                                                        />
                                                        <Image
                                                            src={data.imgs[2].src}
                                                            alt={data.imgs[2].alt}
                                                            className={cx('image3')}
                                                        />
                                                    </div>
                                                    <div className={cx('showMoreImage')}>
                                                        <Button
                                                            round
                                                            className={cx('btnShowMoreImage')}
                                                            leftIcon={<BsImageFill />}  
                                                            onClick={() => setCheckShowMoreImage(!checkShowMoreImage)}
                                                        >
                                                            Hiển thị thêm ảnh
                                                        </Button>
                                                    </div></div>
                                                </>
                                                ) : (<></>)
                                           ) : (<h1> Không có ảnh</h1>)
                                        }
                                        {/* acreage and price */}
                                        <div className={cx('acreage-priceRomDiv','flex')}>
                                            <div className={cx('acreageRoom', 'flex')}>
                                                <span>Diện tích:<h3> {data.acreage} m2</h3></span>
                                            </div>
                                            <div className={cx('priceRoom', 'flex')}>
                                                <span>Giá:<h3> {(data.price)&&(formatter.format(data.price[1]))} </h3></span>
                                            </div>
                                        </div>
                                        <div className={cx('bodyRoom')}>
                                            {/* Left Body Room */}
                                            <div className={cx('LeftBodyRoom')}>
                                                {/* Desc and Address Room */}
                                                <div className={cx('desc-addressRoom')}>
                                                    {/* Name Homestay */}
                                                    <div className={cx('titleHomestay')}>
                                                        <h2>D House Dalat</h2>
                                                    </div>
                                                    {/* Address Room */}
                                                    <div className={cx('addressRoom')}>Địa chỉ: {data.address}</div>
                                                    {/* Desc Room */}
                                                    <div className={cx('descRoom')}>
                                                        <p>{data.desc}</p>
                                                    </div>
                                                </div>
                                                {/* Convenient Room */}
                                                <div className={cx('ConvenientDiv')}>
                                                    <h2 >Tiện Nghi</h2>
                                                    <div className={cx('ConvenientRoom')}>
                                                        {data.convenient && data.convenient.map((convenient, index) => (
                                                            <div key={index} className={cx('convenientItem')}>
                                                                <div>
                                                                    <BsCheckLg className={cx('icon')} />
                                                                </div>
                                                                <h5>{convenient}</h5>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Advertisement */}
                                                <div className={cx('advertisement')}>
                                                    <div className={cx('imgTimeAdvertisement')}><Image src="https://cdn6.agoda.net/images/property/highlightanchor/yellow-icon.svg"></Image>
                                                    </div>
                                                    <div className={cx('textAdvertisement')}>
                                                        <h3>Ngày quý khách chọn là ngày phổ biến đối với du khách</h3>
                                                        <h4>
                                                            Cứ mỗi <span>1</span> phút lại có người dùng đặt một chỗ ở
                                                            <span>Đà Lạt</span> trên Agoda.com
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                
                                            {/* Right Body Room */}
                                            <div className={cx('RightBodyRoom')}>
                                                {/* My Map */}
                                                <div className={cx('MyMap')}>
                                                    <div className={cx('MapCompact-Overlay')}>
                                                        <div className={cx('MyMap-SeeMore')}>Trên Bản Đồ</div>
                                                    </div>
                                                    <Image srcSet={URLHomestay} className={cx('imgMyMap')}></Image>
                                                </div>
                                                {/* nearbyTouristSpot */}
                                                <div className={cx('nearbyTouristSpotDiv')}>
                                                    <h4>Các địa danh nổi tiếng</h4>
                                                    <div className={cx('nearbyTouristSpot')}>
                                                        {data.nearbyTouristSpot && data.nearbyTouristSpot.map((spot, index) => (
                                                            <div key={index} className={cx('spotItem')}>
                                                                <div className={cx('nameSpot')}>{spot.name}</div>
                                                                <div className={cx('distance')}>{spot.distance}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Payment */}
                                                <div className={cx('paymentDiv')}>
                                                    {/* <h4>Thanh Toán</h4> */}
                                                    <Button 
                                                        primary 
                                                        onClick={paymentHandle}
                                                        className={cx('btnPayment')}
                                                    >
                                                        Đặt Phòng
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('locationRoom')}>
                                            <div style={{
                                                   position: "relative",
                                                   textAlign:"right",
                                                   width:"100%",
                                                   height:"510px", 
                                                }}
                                                className={cx("mapouter")}>
                                                <div 
                                                    style={{ 
                                                        overflow:"hidden",
                                                        background:"none!important",
                                                        width:"100%",
                                                        height:"510px",
                                                    }}
                                                    className={cx("gmap_canvas")}>
                                                    <iframe 
                                                        title="myFrame"
                                                        className={cx("gmap_iframe")} 
                                                        height="510px !important"
                                                        width="100%" 
                                                        frameBorder="0" 
                                                        scrolling="no" 
                                                        marginHeight="0" 
                                                        marginWidth="0" 
                                                        src="https://maps.google.com/maps?width=1610&amp;height=510&amp;hl=en&amp;q=Dhouse Đà Lạt&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                                    </iframe>
                                                    <a href="https://connectionsgame.org/">Connections NYT</a>
                                                </div>
                                      
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/* <div className={cx('bottomInner')}>
                                        <div className={cx('locationTop','flex')}>
                                            <div
                                                style={{
                                                    margin: "2rem"
                                                }}
                                            >
                                                <h3>Những điểm đến hàng đầu</h3>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flex: "1",
                                                    alignItems: "center",
                                                    justifyContent: "space-around",
                                                    margin: "2rem"
                                                }}
                                            >
                                                <div>1</div>
                                                <div>2</div>
                                                <div>3</div>
                                                <div>4</div>
                                                <div>5</div>
                                                <div>6</div>
                                                <div>7</div>
                                                <div>8</div>
                                            </div>
                                        </div>
                                    </div> */}
                                </>
                            ) : (
                                <div className={cx('inner', 'bg-black')}>
                                    <div className={cx('contentShowImage')}>{/* title */}
                                        <div className={cx('titleRoom')}>
                                            <h2 className={cx('nameRoom', 'text-white')}>{data.name}</h2>
                                        </div>
                                        {/* show images */}
                                        <div className={cx('showImages', 'flex')}>
                                            {data && data.imgs.map((img,index) => {
                                                return (
                                                    <div key={index} className={cx('imagesRoom')}>
                                                        <Image
                                                            src={img.src}
                                                            alt={img.alt}
                                                            className={cx('images')}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={cx('closeShowMoreDiv')}>
                                            <Button
                                                round
                                                className={cx('btnCloseShowMoreImage')}
                                                leftIcon={<AiOutlineClose />}
                                                onClick={() => setCheckShowMoreImage(!checkShowMoreImage)}
                                            >
                                                Đóng xem thêm ảnh
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* open Form Booking */}
                            {(openFormBooking) ? (
                            <>
                                <FormBooking 
                                    fromDate={fromdate} 
                                    toDate={todate}
                                    room={data}
                                    >
                                </FormBooking>
                            </>):(<></>)}
                       </>
                   )
                } 
        </div>
    );
}

export default RoomDetail;
