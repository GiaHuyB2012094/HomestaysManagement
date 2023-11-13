import classNames from "classnames/bind";
import styles from './Success.module.scss'
import {BsCheckLg} from 'react-icons/bs'
const cx = classNames.bind(styles);
function Success({message}) {
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span><BsCheckLg className={cx('icon')}></BsCheckLg></span>
                {message}
            </div>
        </div> 
    );
}

export default Success;