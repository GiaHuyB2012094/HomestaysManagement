import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { BsPhoneFlip } from 'react-icons/bs';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* top-info */}
                <div className={cx('info-general')}>
                    <h2 className={cx('heading')}>LIÊN HỆ VỚI CHÚNG TÔI ĐỂ NHẬN ĐƯỢC SỰ GIÚP ĐỠ</h2>
                    <p className={cx('des')}>
                        Vui lòng gọi điện hoặc điền hoàn thành mẫu phía dưới và gửi về cho chúng tôi
                    </p>
                    <div className={cx('phone')}>
                        <BsPhoneFlip className={cx('icon')} />
                        0123456789
                    </div>
                    <p className={cx('message')}>Gọi điện trong 24h</p>
                </div>
                {/* bot-info */}
                <div className={cx('info-body')}>
                    <form action="" method="POST" className={cx('form')} id="form-1">
                        {/* row-1 */}
                        <div className={cx('form-row')}>
                            {/* name  */}
                            <div className={cx('form-group')}>
                                <label htmlFor="fullName" className={cx('form-label')}>
                                    full name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="VD: Gia Huy"
                                    className={cx('form-control')}
                                ></input>
                                <span className={cx('form-message')}></span>
                            </div>
                            {/* phone */}
                            <div className={cx('form-group')}>
                                <label htmlFor="phone" className={cx('form-label')}>
                                    số điện thoại
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="VD: 0123456789"
                                    className={cx('form-control')}
                                ></input>
                                <span className={cx('form-message')}></span>
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
                                    placeholder="VD: huyb2012094@student.ctu.edu.vn"
                                    className={cx('form-control')}
                                ></input>
                                <span className={cx('form-message')}></span>
                            </div>
                        </div>
                        {/* row-2 */}
                        <div className={cx('form-row')}>
                            {/* content description */}
                            <div className={cx('form-group')}>
                                <label htmlFor="content" className={cx('form-label')}>
                                    NỘI DUNG
                                </label>
                                <textarea
                                    rows="10"
                                    cols="60"
                                    placeholder="Nhập nội dung mà bạn đang thắc mắc cần tư vấn"
                                    className={cx('form-control')}
                                ></textarea>
                                <span className={cx('form-message')}></span>
                            </div>
                        </div>
                        <Button primary className={cx('form-submit')}>
                            Gửi
                        </Button>
                        {/* <button className={cx('form-submit', 'btn')}>Gửi</button> */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
