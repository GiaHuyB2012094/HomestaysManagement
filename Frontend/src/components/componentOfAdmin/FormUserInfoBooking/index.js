import classNames from "classnames/bind";
import styles from "./FormUserInfoBooking.module.scss";
import Button from "src/components/Button";
import {AiOutlineClose} from 'react-icons/ai'
import { useForm } from "react-hook-form";
const cx = classNames.bind(styles);
function FormUserInfoBooking(props) {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const {register, handleSubmit} = useForm({
        defaultValues: {
            nameuserorder: (user.name || ""),
            address: (user.address || ""),
            phone: (user.phone || ""),
            cccd: (user.cccd || ""),
        }
    })
    const onSubmit = async(data) => {
        props.userInfo(data);
       setTimeout(()=>props.openUserInfoForm(false),1000);
    };
    
    const closeHandle = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
           props.openUserInfoForm(false);
        }
    }
    return (  
            <div onClick={closeHandle} className={cx("wrapper")} >
                <div className={cx('inner')}>
                    <div className={cx("closeBtn")}>
                        <AiOutlineClose className={cx("icon")} onClick={closeHandle}/>
                    </div>
                    <h2 className={cx('heading')}>Nhập thông tin khách hàng</h2>
                    <p className={cx('desc')}>Tìm kiếm Homestay đơn giản với Dhouse</p>
                    <form
                        className={cx('formPayment')}
                        id="form"
                        key={1}
                        onSubmit={handleSubmit(onSubmit)} 
                        >
                            <div className={cx("top",'flex')}>
                                {/* left */}
                                <div className={cx("left")}>
                                    {/* Name User */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="nameuserorder" className={cx('form-label')}>
                                            Tên Người Đặt
                                        </label>
                                        <input
                                            {...register("nameuserorder",{ 
                                                required: true})}
                                            id="nameuserorder"
                                            name="nameuserorder"
                                            type="text"
                                            placeholder="Nhập tên người đặt"
                                            className={cx('form-control')}
                                        ></input>
                                    </div>
                                    {/* Address */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="address" className={cx('form-label')}>
                                            Địa chỉ
                                        </label>
                                        <input
                                            {...register("address",{ 
                                                required: true})}
                                            id="address"
                                            name="address"
                                            type="text"
                                            placeholder="Nhập địa chỉ của người đặt"
                                            className={cx('form-control')}
                                        ></input>
                                    </div>
                                </div>
                                {/* right */}
                                <div className={cx("right")}>
                                    <div className={cx('form-group')}>
                                        <label htmlFor="cccd" className={cx('form-label')}>
                                            CCCD
                                        </label>
                                        <input
                                            {...register("cccd",{
                                                required: true,
                                                valueAsNumber: true})}
                                            name="cccd"
                                            type="number"
                                            placeholder="Nhập Căn cước công dân"
                                            className={cx('form-control')}
                                        ></input>
                                    </div>
                                    {/* CCCD */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="phone" className={cx('form-label')}>
                                            Số điện thoại
                                        </label>
                                        <input
                                            {...register("phone",{
                                                required: true,
                                                valueAsNumber: true,})}
                                            name="phone"
                                            type="number"
                                            placeholder="Nhập số điện thoại"
                                            className={cx('form-control')}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </form>                
                        <Button 
                            className={cx('form-submit')} 
                            onClick={handleSubmit(onSubmit)} 
                            primary 
                            >
                            Xác nhận 
                        </Button>
                </div>
            </div>       
    );
}

export default FormUserInfoBooking;