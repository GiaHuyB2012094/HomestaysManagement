import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import Loader from '~/components/Loader';
import Error from '~/components/Error';
import Success from '~/components/Success';
const cx = classNames.bind(styles); //return function cx
function Login() {
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const [formHeight, setFormHeight] = useState(0);
    const formLoginRef = useRef();

    useEffect(() => {
        setFormHeight(formLoginRef.current.clientHeight);
    }, []);

    const loginHandle = async(e) => {
        e.preventDefault();
        const user = {
            email,
            psw,
        }
        try {
            setLoading(true)
            const result = (await axios.post('/api/users/login', user)).data;
            setLoading(false)
            setSuccess(true)

            localStorage.setItem('currentUser',JSON.stringify(result));
            if (result.isAdmin) {
                window.location.href = '/admin'
            } else {
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true);
        }
    }

 
    return (
      <>
        {loading && (<Loader/>)}
        {error && (<Error message='Thông tin không hợp lệ'/>)}
        {success && (<Success message='Đăng nhập thành công'/>)}
            <div className={cx('wrapper', 'flex')}>
                <div className={cx('bg')}>
                    <img
                        style={{ height: formHeight }}
                        src="https://pix8.agoda.net/hotelImages/21963103/-1/807f7622378ac71fef1392d8fbd021b1.jpg?ca=29&ce=0&s=1024x768"
                        alt="bgLogin"
                    />
                </div>
                <div className={cx('main')}>
                            <form
                                ref={formLoginRef}
                                // action=""
                                // method="POST"
                                className={cx('form')}
                                id="form-2"
                            >
                                <h3 className={cx('heading')}>Đăng Nhập</h3>
                                <p className={cx('desc')}>Tìm kiếm Homestay đơn giản với Dhouse</p>
                                <div className={cx('spacer')}></div>
                                {/* email */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="email" className={cx('form-label')}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => {setEmail(e.target.value)}}
                                        placeholder="VD :huyb2012094@student.ctu.edu.vn"
                                        className={cx('form-control')}
                                    ></input>
                                    <span className={cx('form-message')}></span>
                                </div>
    
                                {/* password */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="password" className={cx('form-label')}>
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value = {psw}
                                        onChange={(e) => {setPsw(e.target.value)}}
                                        placeholder="VD 123456789"
                                        className={cx('form-control')}
                                    ></input>
                                    <span className={cx('form-message')}></span>
                                </div>
                                {/* direction Register */}  
                                <span className={cx('flex')}>
                                    Nếu bạn chưa tạo tài khoản
                                    <p className={cx('directionRegister')} >
                                        <Link to='/Register'>Đăng ký</Link>
                                    </p>
                                </span>
                                <Button 
                                    className={cx('form-submit')} 
                                    onClick={loginHandle} 
                                    primary 
                                    small>
                                        Đăng Nhập
                                </Button>
                            </form>
                        </div>
                        
                  
            </div>
      </>
    );
}

export default Login;
