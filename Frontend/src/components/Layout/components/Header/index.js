import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import { FiLogOut,FiMenu } from 'react-icons/fi';
import { MdOutlineListAlt } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
// material
import ButtonMenu from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRef, useState } from 'react';
// ------
const cx = classNames.bind(styles); //return function cx
function Header() {
    // const user = JSON.parse(localStorage.getItem('currentUser'))

    // dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClickUser = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandle = () => {
        setAnchorEl(null);
        localStorage.removeItem('currentUser');
        window.location.href='/login';
    }
    // 
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // responsive
    const [showTab, setShowTab] = useState(false)
    const toggleTabItems = () => {
        setShowTab(!showTab)
        console.log(showTab);
    }
 
    return (

        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img src="/logoPrimary.png" alt="logoHomestay" />
                </Link>
            </div>
            <div 
                className={cx('inner')}
            >
                <div 
                    className={cx('tab',`${showTab && 'active'}`)}
                >
                    <Link to="/Room">
                        <div className={cx('tab-item')}>Phòng</div>
                    </Link>
                    <Link to="/Service">
                        <div className={cx('tab-item')}>Dịch Vụ</div>
                    </Link>
                    <Link to="/News">
                        <div className={cx('tab-item')}>Tin Tức</div>
                    </Link>
                    <Link to="/Contact">
                        <div className={cx('tab-item')}>Tư Vấn</div>
                    </Link>
                </div>
                {/* checked login */}
                <div className={cx('login-register')}>
                    {user ? (
                        <div className={cx('header-after-login')}>
                            <div className={cx('userLogin')}>         
                                <ButtonMenu
                                    id="basic-button"
                                    className={cx('nameUser')}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClickUser}
                                >
                                    {(user.avatar) ? (
                                        <img src={`http://localhost:5000/Images/`+user.avatar} className={cx('user-avatar')} alt="img-avatar"></img>
                                    ): (
                                        <Image src="" className={cx('user-avatar')} alt="img-avatar" />
                                    )}
                                    {user.name}
                                    <IoMdArrowDropdown className={cx('icon')}></IoMdArrowDropdown>
                                </ButtonMenu>
                                <Menu
                                    id="basic-menu"
                                    className={cx('menuUser')}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <Link to='/Profile'>
                                        <MenuItem onClick={handleClose} className={cx('menuItem')}>
                                            <AiOutlineUser className={cx('icon')}></AiOutlineUser>
                                            <p>Thông tin cá nhân</p>
                                        </MenuItem>
                                    </Link>
                                    <Link to='/ListBooked'>
                                    <MenuItem onClick={handleClose} className={cx('menuItem')}>
                                        <MdOutlineListAlt className={cx('icon')}></MdOutlineListAlt>
                                        <p>Danh sách phòng đã đặt</p>
                                    </MenuItem>
                                    </Link>
                                    <MenuItem onClick={logoutHandle} className={cx('menuItem')}>
                                        <FiLogOut className={cx('icon')}></FiLogOut>
                                        <p>Đăng xuất</p>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Button primary to="/login">
                                Đăng Nhập
                            </Button>
                        </>
                    )}
                </div>
                <div 
                    className={cx("menu")}
                    onClick={toggleTabItems}
                >
                    <FiMenu
                        className={cx("iconMenu")}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
