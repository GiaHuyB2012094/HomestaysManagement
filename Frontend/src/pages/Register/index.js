import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import axios from 'axios';
import Button from 'src/components/Button';
import Success from 'src/components/Success';
import Error from 'src/components/Error';
import Loader from 'src/components/Loader';
const cx = classNames.bind(styles); //return function cx
function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [cpsw, setCpsw] = useState('');

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState();
    const [success,setSuccess] = useState();

    const [formHeight, setFormHeight] = useState(0);
    const formRegisterRef = useRef();

    useEffect(() => {
            setFormHeight(formRegisterRef.current.clientHeight);
    }, []);

    const registerHandle = async(e) => {
        e.preventDefault();
       
        if (psw===cpsw) {
            const user = {
                name,
                email,
                psw,
                cpsw,
            }
            console.log(user)
            try {
                setLoading(true)
                const result = (await axios.post('/api/users/register', user)).data;
                console.log(result);
                setLoading(false)
                setSuccess(true)

                setName('')
                setEmail('')
                setPsw('')
                setCpsw('')
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(true)
            }
        }
    }

    return (
        
       <>
            {loading && (<Loader/>)}
            {error && (<Error/>)}
            {success && (<Success message={'Đăng ký thành công'}/>)}
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
                                ref={formRegisterRef}
                                // action=""
                                // method="POST"
                                className={cx('form')}
                                id="form-1"
                            >
                                <h3 className={cx('heading')}>Đăng ký</h3>
                                <p className={cx('desc')}>Tìm kiếm Homestay đơn giản với Dhouse</p>
                                <div className={cx('spacer')}></div>
                                {/* Name */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="fullname" className={cx('form-label')}>
                                        Name
                                    </label>
                                    <input
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        value={name}
                                        onChange={(e) => {setName(e.target.value)}}
                                        placeholder="VD : Gia Huy"
                                        className={cx('form-control')}
                                    ></input>
                                    <span className={cx('form-mess')}></span>
                                </div>
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
                                        value={psw}
                                        onChange={(e) => {setPsw(e.target.value)}}
                                        placeholder="VD 123456789"
                                        className={cx('form-control')}
                                    ></input>
                                    <span className={cx('form-message')}></span>
                                </div>
                                {/* password_confirmation */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="password_confirmation" className={cx('form-label')}>
                                        Type again password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={cpsw}
                                        onChange={(e) => {setCpsw(e.target.value)}}
                                        placeholder="VD 123456789"
                                        className={cx('form-control')}
                                    ></input>
                                    <span className={cx('form-message')}></span>
                                </div>
                                {/* direction Login */}
                                <span className={cx('flex')}>
                                    Nếu bạn đã có tài khoản
                                    <p className={cx('directionLogin')} >
                                        <Link to='/Login'>Đăng nhập</Link>
                                    </p>
                                </span>
                                <Button className={cx('form-submit')} onClick={registerHandle} primary small>
                                    Đăng ký
                                </Button>
                            </form>
                        </div>        
            </div>
       </>
    );
}

export default Login;
