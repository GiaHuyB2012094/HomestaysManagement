import classNames from "classnames/bind";
import styles from './Widget.module.scss';
import {MdKeyboardArrowUp} from 'react-icons/md'
import {BiSolidUser} from 'react-icons/bi'
import {MdMeetingRoom} from 'react-icons/md'
import {HiUsers} from 'react-icons/hi'
import {FaMoneyBillWave} from 'react-icons/fa'
import {PiGitBranchBold} from 'react-icons/pi'
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Widget({type,total}) {
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
      });
    // temporary
    const diff = 20
    let data;
        switch(type) {
            case "user":
                data={
                    title:"USERS",
                    isMoney: false,
                    link: "/admin/list/user",
                    titlelink: "See all users",
                    icon: (
                        <BiSolidUser 
                            className={cx("icon")}
                            style={{
                                color: "crimson",
                                backgroundColor: "rgba(255,0,0,0.2)",
                            }}
                        >
                        </BiSolidUser>
                    ),
                    color: "crimson",
                    name:"Người dùng",
                };
                break;
            case "room":
                data={
                    title:"ROOM",
                    isMoney: false,
                    link: "/admin/list/room",
                    titlelink: "See all room",
                    icon: (
                        <MdMeetingRoom 
                            className={cx("icon")} 
                            style={{
                                color: "goldenrod",
                                backgroundColor: "rgba(218,165,32,0.2)",
                            }}>
                        </MdMeetingRoom>
                    ),
                    color: "goldenrod",
                    name:"Phòng",
                };
                break;
            case "employee":
                data={
                    title:"EMPLOYEE",
                    isMoney: false,
                    link: "/admin/list/employee",
                    titlelink: "See all employee",
                    icon: (
                        <HiUsers 
                            className={cx("icon")}
                            style={{
                                color: "rgb(7, 150, 179)",
                                backgroundColor: "rgb(202, 245, 245)",
                            }}
                        >
                        </HiUsers>
                    ),
                    color: "rgb(7, 150, 179)",
                    name:"Nhân viên",
                };
                break;
            case "earning":
                data={
                    title:"EARNING",
                    isMoney: true,
                    link: "/admin/receipt",
                    titlelink: "See net earning",
                    icon: (
                        <FaMoneyBillWave 
                            className={cx("icon")}
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0,128,0,0.2)",
                            }}
                        >
                        </FaMoneyBillWave>
                    ),
                    color: "green",
                };
                break;
            case "branch":
                data={
                    title:"BRANCH",
                    isMoney: false,
                    link: "/admin/sub/branch",
                    titlelink: "See detail",
                    icon: (
                        <PiGitBranchBold 
                            className={cx("icon")}
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(128,0,128,0.2)",
                            }}
                        >
                        </PiGitBranchBold>
                    ),
                    color: "purple",
                    name:"Chi nhánh",
                };
                break;
            default:
        }
    return ( 
        <div className={cx("widget","flex")}>
            <div className={cx("left")}>
                <span className={cx("title")}>{data.title}</span>
                <span 
                    className={cx("counter")}
                    style={{color:data.color}}
                >
                    {data.isMoney ? formatter.format(total) : total+" "+data.name}
                </span>
                <Link to={data.link}>
                        <span className={cx("link")}>{data.titlelink}</span>
                </Link>
               
            </div>
            <div className={cx("right")}>
                <div className={cx("percentage positive")}>
                    <MdKeyboardArrowUp></MdKeyboardArrowUp>
                    {diff}%
                </div>  
                {data.icon}
            </div>
        </div>
     );
}

export default Widget;