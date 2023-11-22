import classNames from "classnames/bind";
import style from './Header.module.scss';
import Button from "src/components/Button";
import Image from "src/components/Image";
import {PiFlowerLotusFill} from 'react-icons/pi'
import Badge from '@mui/material/Badge';

import {AiFillDollarCircle} from 'react-icons/ai'
import { DarkModeOutlined, LanguageOutlined } from "@mui/icons-material";
const cx = classNames.bind(style)
function Header() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    return ( 
        <div className={cx('inner')}>
                <div className={cx('heading')}>
                    <div className={cx('items','flex')}>
                        <div className={cx('item')}>
                            <Button 
                                feature
                                style={{backgroundColor:"#ed5554"}}
                                className={cx("btn",'btnFeature')}
                                leftIcon={<AiFillDollarCircle/>}
                                to='/admin/receipt'    
                            >
                            Sổ quỹ
                            </Button>
                            <Button 
                                feature
                                className={cx("btn",'btnFeature')}
                                leftIcon={<PiFlowerLotusFill/>}
                                to='/admin/receiptionist'    
                            >
                            Lễ Tân
                            </Button>
                        </div>
                        <div className={cx('item')}>
                            <LanguageOutlined className={cx('icon')}/>
                            English
                        </div>
                        <div className={cx('item')}>
                            <DarkModeOutlined className={cx('icon')}/>
                        </div>
                        <div className={cx('item')}>
                            {(user.avatar) ? (
                                <Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                color="success" variant="dot">
                                <img src={`http://localhost:5000/Images/`+user.avatar} className={cx('user-avatar')} alt="img-avatar"></img>
                                 </Badge>
                            ): (
                                <Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                color="success" variant="dot">
                                    <Image src="" className={cx('user-avatar')} alt="img-avatar" />
                                </Badge>
                            )}
                            {user.name}
                        </div>
                    </div>
                </div>
            </div>
     );
}

export default Header;