import classNames from "classnames/bind";
import styles from "./Profile.module.scss"
import {BiEdit} from "react-icons/bi"
import Button from "~/components/Button";
import {MdModeEditOutline} from "react-icons/md"
import Image from "~/components/Image";
import { useEffect, useRef, useState } from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from "axios";
import Swal from "sweetalert2";
const cx = classNames.bind(styles);

function Profile() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [psw, setPsw] = useState(user.password)
    const [phone, setPhone] = useState(user.phone)
    const [address, setAdress] = useState(user.address)
    const [cccd, setCCCD] = useState(user.cccd)
    const [check, setCheck] = useState(true);
    // REF
    const inputNameInfoRef = useRef()
    const inputEmailInfoRef = useRef()
    const inputPhoneInfoRef = useRef()
    const inputPswInfoRef = useRef()
    const inputCCCDInfoRef = useRef()
    const inputAddressInfoRef = useRef()
    // 
    const pNameInfoRef = useRef()
    const pEmailInfoRef = useRef()
    const pPswInfoRef = useRef()
    const pPhoneInfoRef = useRef()
    const pCCCDInfoRef = useRef()
    const pAddressInfoRef = useRef()
    // /////////////////////////////////////////////
    const [file, setFile] = useState(null)
    // const [image, setImage] = useState(user.avatar && user.avatar);
    const inputImageRef = useRef(null);
    const handleImageClick = () => {
        inputImageRef.current.click();
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }
    const handleUpload = async(e) => {
        const formdata = new FormData()
        formdata.append('file',file);
        try {
            const result = (await axios.put(`/api/users/changeavatarpicture/${user._id}`,formdata)).data;
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser',JSON.stringify(result));
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
        
    }
//  ///////////////////////////////////////////////////////
    const editInfoHandle = () => {
        setCheck(false);

        if(inputNameInfoRef.current)
        {
            inputNameInfoRef.current.style.display = "block"
            inputEmailInfoRef.current.style.display = "block"
            inputPhoneInfoRef.current.style.display = "block"
            inputPswInfoRef.current.style.display = "block"
            inputCCCDInfoRef.current.style.display = "block"
            inputAddressInfoRef.current.style.display = "block"
            pNameInfoRef.current.style.display = "none"
            pEmailInfoRef.current.style.display = "none"
            pPswInfoRef.current.style.display = "none"
            pPhoneInfoRef.current.style.display = "none"
            pCCCDInfoRef.current.style.display = "none"
            pAddressInfoRef.current.style.display = "none"
        }
    }
    const cancelInfoHandle = () => {
        inputNameInfoRef.current.style.display = "none"
        inputEmailInfoRef.current.style.display = "none"
        inputPhoneInfoRef.current.style.display = "none"
        inputPswInfoRef.current.style.display = "none"
        inputCCCDInfoRef.current.style.display = "none"
        inputAddressInfoRef.current.style.display = "none"
        pNameInfoRef.current.style.display = "block"
        pEmailInfoRef.current.style.display = "block"
        pPswInfoRef.current.style.display = "block"
        pPhoneInfoRef.current.style.display = "block"
        pCCCDInfoRef.current.style.display = "block"
        pAddressInfoRef.current.style.display = "block"
        setCheck(true)
    }
    const saveInfoHandle = async() => {
       try {
            const result = (await axios.put(`/api/users/updateuser/${user._id}`,{name,psw,address,phone,cccd})).data;
            await Swal.fire({
                icon: 'success',
                title: 'Cập nhật thông tin thành công',
                text: 'Thông tin người dùng đã được cập nhật',
            })
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser',JSON.stringify(result));
       } catch (error) {
            console.log(error)
       }
    }

    return (
        <>
            {/* {console.log(user.avatar)} */}
            <div className={cx("wrapper")}>
                <div className={cx("left")}>
                    <div className={cx("avatarInfo")} >
                        {(user.avatar) ? (
                            <img src={`http://localhost:5000/Images/`+user.avatar} className={cx('user-avatar')} alt="img-avatar" />
                        ) : (   
                            <Image src="" className={cx('user-avatar')} alt="img-avatar" />
                        )
                        }
                        
                    </div>
                    <div className={cx("nameUser")}>
                        <h3 >{user.name}</h3>
                    </div>

                    <div className={cx("editAvatar")} >
                        <input 
                                ref={inputImageRef}
                                type="file"
                                onChange={handleImageChange}
                                style={{display: "none"}}
                        />
                        <div onClick={handleImageClick} style={{cursor: "pointer"}}><BiEdit /></div>
                        <Button className={cx("btn","updateBtn")} onClick={handleUpload}>
                            Upload
                        </Button>
                    </div>

                    <div className={cx("descUser")}>
                        <p >Là khách hàng thân quan của DHouse Dalat</p>
                    </div>
                    <div className={cx("socialPlatform")}>
                        <span className={cx("platform","iconFacebook","flex")}>
                            <FacebookOutlinedIcon className={cx("icon")}></FacebookOutlinedIcon>
                            <h4 >Nền tảng Facebook</h4>
                        </span>
                        <span className={cx("platform","iconGG","flex")}>
                            <GoogleIcon className={cx("icon")}></GoogleIcon>
                            <h4 >Nền tảng Google</h4>
                        </span>
                        <span className={cx("platform","iconTwitter","flex")}>
                            <TwitterIcon className={cx("icon")}></TwitterIcon>
                            <h4 >Nền tảng Twitter</h4>
                        </span>
                        <span className={cx("platform","iconInstagram","flex")}>
                            <InstagramIcon className={cx("icon")}></InstagramIcon>
                            <h4 >Nền tảng Instagram</h4>
                        </span>
                    </div>
                </div>
                <div className={cx("right")}>
                    <div className={cx("titleInfo","flex")}>
                        <h2>
                            Thông tin các nhân {user.isAdmin? <span>(Admin)</span>:<span>(No Admin)</span>} 
                        </h2>

                       {check ? (
                        <Button 
                            className={cx("btn","updateBtn")}
                            onClick={editInfoHandle}
                            RightIcon={<MdModeEditOutline></MdModeEditOutline>}
                        >
                            Edit
                        </Button>
                       ) : (
                        <>
                        <Button 
                            onClick={cancelInfoHandle}
                            className={cx("btn","cancelBtn")}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={saveInfoHandle}
                            className={cx("btn","addBtn")}
                        >
                            Save
                        </Button>
                        </>
                       )
                        }
                    </div>
                    <div className={cx("nameInfo")}>
                        <h3>Họ Tên</h3>
                        <input
                            ref={inputNameInfoRef}
                            className={cx("inputGroup")}
                            type="text"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                        >
                        </input>
                        <p ref={pNameInfoRef} className={cx("pGroup")}>{name}</p>
                    </div>
                    <div className={cx("emailInfo")}>
                        <h3>Email</h3>
                        <input
                            disabled
                            ref={inputEmailInfoRef}
                            className={cx("inputGroup")}
                            type="email"
                            value={email}
                        >
                        </input>
                        <p ref={pEmailInfoRef} className={cx("pGroup")}>{email}</p>
                    </div>
                    <div className={cx("pswInfo")}>
                        <h3>Mật Khẩu</h3>
                        <input
                            ref={inputPswInfoRef}
                            className={cx("inputGroup")}
                            type="password"
                            value={psw}
                            onChange={(e)=>{setPsw(e.target.value)}}
                        >
                        </input>
                        <p ref={pPswInfoRef} className={cx("pGroup")}>{psw}</p>
                    </div>
                    <div className={cx("phoneInfo")}>
                        <h3>Số điện thoại</h3>
                        <input
                            ref={inputPhoneInfoRef}
                            className={cx("inputGroup")}
                            type="number"
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                        >
                        </input>
                        <p ref={pPhoneInfoRef} className={cx("pGroup")}>{phone}</p>
                    </div>
                    <div className={cx("cccdInfo")}>
                        <h3>Căn Cước Công Dân</h3>
                        <input
                            ref={inputCCCDInfoRef}
                            className={cx("inputGroup")}
                            type="number"
                            value={cccd}
                            onChange={(e)=>{setCCCD(e.target.value)}}
                        >
                        </input>
                        <p ref={pCCCDInfoRef} className={cx("pGroup")}> {cccd}</p>
                    </div>
                    <div className={cx("addressInfo")}>
                        <h3>Địa chỉ</h3>
                        <input
                            ref={inputAddressInfoRef}
                            className={cx("inputGroup")}
                            type="text"
                            value={address}
                            onChange={(e)=>{setAdress(e.target.value)}}
                        >
                        </input>
                        <p ref={pAddressInfoRef} className={cx("pGroup")}>{address}</p>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Profile;
