import classNames from "classnames/bind";
import style from './Slidebar.module.scss';
import Button from "src/components/Button";
import {BsHouseDoorFill, BsFillClipboard2CheckFill} from 'react-icons/bs'
import {BiSolidUser ,BiSolidDashboard, BiSolidLogOut} from 'react-icons/bi'
import {RiProfileFill} from 'react-icons/ri'
import { DiCssdeck } from 'react-icons/di'
import { HiLocationMarker } from 'react-icons/hi'
import {RiGitBranchFill} from 'react-icons/ri'
import {PiUsersFourFill} from 'react-icons/pi'
import { Link } from "react-router-dom";
import { FaServicestack } from "react-icons/fa6";
const cx = classNames.bind(style)
function Slidebar() {
    const logoutHandle = () => {
        localStorage.removeItem('currentUser');
        window.location.href='/login';
    }
    return (
        <div className={cx('inner')}>
                <div className={cx('heading')}>
                    <Link to="/admin">
                        <h2 style={{color: "#6439ff"}}> Admin </h2>
                    </Link>
                </div>
                <div className={cx('drawer')}>
                    {/* Dashboard */}
                    <div className={cx('titleDrawer')}>
                        <p>Chính</p>
                    </div>
                    <div className={cx('list')}>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature 
                                leftIcon={<BiSolidDashboard className={cx('icon')}/>}
                                // onClick={}    
                                to='/admin'
                            >
                                Thống kê
                            </Button>
                        </div>
                    </div>
                    {/* List */}
                    <div className={cx('titleDrawer')}>
                        <p>Danh Sách</p>
                    </div>
                    <div className={cx('list')}>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature leftIcon={<BiSolidUser className={cx('icon')}/>}
                                // onClick={}    
                                to='/admin/list/user'
                            >
                                Khách Hàng
                            </Button>
                        </div>
                        
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature leftIcon={<PiUsersFourFill className={cx('icon')}/>}
                                // onClick={}    
                                to='/admin/list/employee'
                            >
                                Nhân viên
                            </Button>
                        </div>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature 
                                leftIcon={<BsHouseDoorFill className={cx('icon')}/>}
                                to='/admin/list/room'
                                >
                                Phòng
                            </Button>
                        </div>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature leftIcon={<FaServicestack className={cx('icon')}/>}
                                // onClick={}    
                                to='/admin/list/service'
                            >
                                Dịch vụ
                            </Button>
                        </div>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature 
                                leftIcon={<BsFillClipboard2CheckFill className={cx('icon')}/>}
                                to='/admin/list/booking'
                                >
                                Đơn Đặt Phòng
                            </Button>
                        </div>
                    </div>
                    {/* List */}
                    <div className={cx('titleDrawer')}>
                        <p>Phụ</p>
                    </div>
                    <div className={cx('list')}>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature leftIcon={<DiCssdeck className={cx('icon')}/>}
                                // onClick={}    
                                to='/admin/sub/convenient'
                            >
                                Tiện nghi
                            </Button>
                        </div>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature 
                                leftIcon={<HiLocationMarker className={cx('icon')}/>}
                                to='/admin/sub/nearbytouristspot'
                                >
                                Địa điểm gần homestay
                            </Button>
                        </div>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature 
                                leftIcon={<RiGitBranchFill className={cx('icon')}/>}
                                to='/admin/sub/branch'
                                >
                                Chi nhánh
                            </Button>
                        </div>
                    </div>
                    {/* User */}
                    <div className={cx('titleDrawer')}>
                        <p>Tài Khoản</p>
                    </div>
                    <div className={cx('list')}>
                        <div className={cx('listItem')}>
                            <Button className={cx('btnDrawer')} feature leftIcon={<RiProfileFill className={cx('icon')}/>}>
                            Thông tin cá nhân
                            </Button>
                        </div>
                        <div className={cx('listItem')}>
                            <Button 
                                className={cx('btnDrawer')} 
                                feature 
                                leftIcon={<BiSolidLogOut className={cx('icon')}/>}
                                onClick={logoutHandle}    
                            >
                            Đăng Xuất
                            </Button>
                        </div>
                    </div>
                    {/* theme page */}
                    <div className={cx("bottom")}>
                        <div className={cx("colorOption")}>
                        </div>
                        <div className={cx("colorOption")}>
                        </div>
                        <div className={cx("colorOption")}>
                        </div>
                    </div>
                </div>
            </div>
     );
}

export default Slidebar;