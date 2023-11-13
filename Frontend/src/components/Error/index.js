import classNames from "classnames/bind";
import styles from './Error.module.scss'
import {MdOutlineError} from 'react-icons/md';
// import BsCheckLg from 'react-icons/bs';
const cx = classNames.bind(styles);
function Error({message}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span><MdOutlineError className={cx('icon')}></MdOutlineError></span>
                {message}
            </div>
        </div> 
    );
}

export default Error;