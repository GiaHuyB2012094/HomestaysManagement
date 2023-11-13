import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles); //return function cx
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <div className={cx('description')}>
                        DHouse DaLat
                        <div className={cx('description-content')}>
                            Nằm cách Công viên Yersin 2,1 km, D House Dalat có chỗ nghỉ, nhà hàng,
                            quầy bar, sảnh khách chung và khu vườn. Biệt thự cung cấp miễn phí cả
                            WiFi lẫn chỗ đỗ xe riêng. Một số căn tại đây có TV truyền hình cáp màn
                            hình phẳng, khu vực bếp ăn đầy đủ tiện nghi với minibar và phòng tắm
                            riêng đi kèm vòi sen cùng dép đi trong phòng. Du khách nghỉ tại D House
                            Dalat có thể thưởng thức bữa sáng kiểu lục địa hoặc bữa sáng kiểu Á. Chỗ
                            nghỉ có sân hiên. D House Dalat cung cấp dịch vụ cho thuê xe đạp và xe
                            hơi trong khi du khách có thể đi xe đạp ở khu vực gần đó. Hồ Xuân Hương
                            và Quảng trường Lâm Viên đều nằm trong bán kính 2,3 km từ biệt thự. Sân
                            bay gần nhất là sân bay Liên Khương, cách D House Dalat 22 km.
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('infoContact', 'bold')}>
                            Liên Hệ
                            <div className={cx('phone')}>
                                Số điện thoại
                                <p className={cx('infoContact-content')}>0392 006 743</p>
                            </div>
                            <div className={cx('address')}>
                                Địa chỉ
                                <p className={cx('infoContact-content')}>
                                    131 Hoàng Hoa Thám, Phường 10, Thành phố Đà Lạt, Lâm Đồng
                                </p>
                            </div>
                            <div className={cx('time')}>
                                Thời gian nhận & trả phòng
                                <p className={cx('infoContact-content')}>
                                    Từ 14:00 - Trước 24:00 giờ
                                </p>
                            </div>
                            <div className={cx('price')}>
                                Mức giá
                                <p className={cx('infoContact-content')}>giá phòng từ 576859 VND</p>
                            </div>
                        </div>
                        <div className={cx('infoAbout')}>
                            <Link to="/"><div className={cx('infoAbout', 'Home')}>Về chúng tôi</div></Link>
                            <Link to="/Room"><div className={cx('infoAbout', 'Room')}>Phòng Nghỉ</div></Link>
                            <Link to="/Service"><div className={cx('infoAbout', 'Service')}>Dịch Vụ</div></Link>
                            <Link to="/News"><div className={cx('infoAbout', 'News')}>Tin Tức</div></Link>
                            <Link to="/Contact"><div className={cx('infoAbout', 'Contact')}>Tư Vấn</div></Link>
                        </div>
                    </div>
                </div>
                <div className={cx('copyRight')}>Copyright © 2023 DHouse DaLat Homestay</div>
            </div>
            <Marquee className={cx('marquee')}>
                DHouse Dalat lựa chọn hàng đầu trong việc đặt phòng Homestay tại Đà Lạt.
            </Marquee>
        </div>
    );
}

export default Footer;
