import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

import classNames from 'classnames/bind';
import styles from './Loader.module.scss';
const cx = classNames.bind(styles);

function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#36d7b7");

 
    return ( 
        <div className={cx("sweet-loading","wrapper")} >
            <HashLoader
                color={color}
                loading={loading}
                css=''
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
     );
}

export default Loader;