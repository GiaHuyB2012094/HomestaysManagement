import classNames from 'classnames/bind';
import style from './Home.module.scss';
import RoomListVertical from '~/components/Layout/components/RoomListVertical';
import SearchHorizontal from '~/components/Layout/components/SearchHorizontal';
import {BiSolidError} from 'react-icons/bi';
import {AiOutlineHome} from 'react-icons/ai';
import {HiOutlineClipboardDocumentList, HiOutlineNewspaper} from 'react-icons/hi2';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from '~/components/Image';
import { Diversity2Outlined } from '@mui/icons-material';
// material ui
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// ---------------------------------------------------------------
import { Link } from 'react-router-dom';

const urlAdvertisiment = "https://cf2.bstatic.com/xdata/images/hotel/max1280x900/298091054.jpg?k=e33584e3af1900bcf4726fa548f43b233f46a0960905e0d1e294e52f0325a18c&o=&hp=1";
const cx = classNames.bind(style);
const steps = [
    {
      label: 'Đăng ký/Đăng nhập tài khoản',
      description: `Để trải nghiệm các tính năng tuyệt vời của trang web cũng như để biết
        được những dịch vụ mà Dhouse Homestay cung cấp bạn cần có 1 tài khoản để đăng nhập 
        vào hệ thống.`,
    },
    {
      label: 'Tìm kiếm và lựa chọn ngày phù hợp',
      description:
        `Tìm kiếm bằng cách chọn chi nhánh, thời gian đến, thời gian đi, sau đó chọn số lượng
        người ở, tiếp đến chọn giá phòng và cuối cùng bấm tìm kiếm để lọc ra những phòng phù 
        hợp với nhu cầu của khách hàng.`,
    },
    {
      label: 'Đặt phòng nhanh',
      description: `Chọn phòng phù hợp sau đó tiến hành đặt phòng bằng cách nhấn vào xem chi tiết phòng,
        Chọn đặt phòng, nhập đầy đủ thông tin người đặt sau đó thanh toán và đợi xác nhận của bên bộ
        phần quản lý của Dhouse Homestay.`,
    },
  ];
function Home() {
    const [dataSearch, setDataSearch] = useState('')
    const sendDataDate =  (data) => {
        setDataSearch(data)
    }
    
    // step material ui
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    // video
    const videoEl = useRef(null);
    const attemptPlay = () => {
        videoEl &&
          videoEl.current &&
          videoEl.current.play().catch(error => {
            console.error("Video bị lỗi không thể tự động phát", error);
          });
      };
    
      useEffect(() => {
        attemptPlay();
      }, []);
    return (
        <div className={cx('wrapper', 'flex')}>
            <SearchHorizontal sendDataDate={sendDataDate}  />
            {dataSearch ? (
                <div>
                    <h1 className={cx('title')}>Danh sách phòng</h1>
                    {(dataSearch.filteredRooms.length > 0) ? 
                    (<>
                        <RoomListVertical dataSearch={dataSearch} />
                    </>): 
                    (<>
                        <div className={cx("infoErorr","flex")}>
                            <BiSolidError className={cx("icon")}></BiSolidError>
                            <h3> Không có phòng phù hợp với yêu cầu trên! </h3>
                        </div>
                    </>)}
                    
                </div>): (<></>)}
{/* bottom Home */}
            {/* See branch */}
            <div className={cx("seeBranch")}>
                <h1 className={cx('title')}>Lựa chọn chi nhánh</h1>
                <p>Homestay có nhiều chi nhánh để cho bạn lựa chọn phù hợp với điểm đến của bạn, mõi chi nhánh đều có những dịch vụ, tiện nghi khác nhau phục vụ cho nhu cầu của bạn.</p>
                <div className={cx('imageRoom', 'flex')}>
                    <div className={cx('imagePrimary')}>
                        <Link to='/Room'  className={cx("img1Branch")}>
                            <Image
                                src="//pix8.agoda.net/hotelImages/537/5371569/5371569_18072609490067119055.jpg?ca=0&ce=1&s=450x450"
                                alt="branch1"
                                className={cx('image1')}
                            />
                            <p>Chi nhánh 1 </p>

                        </Link>
                    </div>
                    <div className={cx('imageSub', 'flex')}>
                        <Link to='/Room' className={cx("img2Branch")}>
                            <Image
                                src="https://pix8.agoda.net/hotelImages/42032498/0/0bc5d91af089192ba146849ced7df1d7.jpg?ce=0&s=1024x768"
                                alt="branch2"
                                className={cx('image2')}
                            />
                            <p>Chi nhánh 2 </p>

                        </Link>

                        <Link to='/Room' className={cx("img3Branch")}>
                            <Image
                                src="//pix8.agoda.net/hotelImages/16720878/-1/7e697238cc6e8d99b368c5786d9b5a3d.jpg?ce=0&s=450x450"
                                alt="branch3"
                                className={cx('image3')}
                            />
                            <p>Chi nhánh 3 </p>

                        </Link>
                    </div>
                </div>
            </div>
            {/* why choose us*/}
            <div className={cx("whychooseusDiv")}>
                <h1 className={cx('title')}>Tại sao lựa chọn chúng tôi?</h1>
                <div className={cx("flex")}>
                    <div className={cx("reasonDiv")}>
                        <Image
                            className={cx("img")}
                            src="https://cdn-icons-png.flaticon.com/512/313/313176.png"
                            alt="money"
                        />
                        <h3>Giá Cả Hợp Lý</h3>
                        <p>Homestay đặt ra những mức giá phù hợp với giá cả thị trường và phù hợp với khách hàng</p>
                    </div>
                    <div className={cx("reasonDiv")}>
                        <Image
                            className={cx("img")}
                            src="https://cdn-icons-png.flaticon.com/512/3837/3837136.png"
                            alt="voucher"
                        />
                        <h3>Khuyến Mãi,Ưu Đãi</h3>
                        <p>Đề ra nhiều chính sách ưu đãi trong những dịp lễ cho khách du lịch và kèm thêm nhiều khuyến mãi vourcher cho khách hàng thành viên</p>
                    </div>
                    <div className={cx("reasonDiv")}>
                        <Image
                            className={cx("img")}
                            src="https://cdn-icons-png.flaticon.com/512/1533/1533265.png"
                            alt="convenient"
                        />
                        <h3>Tiện Nghi</h3>
                        <p>Cung cấp nhiều tiện nghi giúp cho khách du lịch có 1 trải nghiệm tuyệt vời tại xứ sở Đà Lạt</p>
                    </div>
                </div>
            </div>
            {/* feature */}
            <div className={cx("bestFeatureDiv","flex")}>
                <div className={cx("Left-bestFeatureDiv")}>
                    <h5 
                        style={{color:"#0172a7"}}
                    >
                        Dhouse Homestay
                    </h5>
                    <h3 >Những tính năng tốt giành cho bạn</h3>
                    <p>Dhouse Homestay cung cấp cho khách hàng nhiều tính năng hữu dụng giúp cho bạn có thể dễ dàng thao tác và tương tác với
                        Homestaye đồng thời cũng dễ dàng những dịch vụ mà Dhouse Homestay cung cấp.
                    </p>
                    <div className={cx("body-BestFeatures")}>
                        <Link to="/Room">
                            <div className={cx("featureBox","flex")}>
                                <div className={cx("iconFeatureBox")}
                                    style={{
                                        color:"#00695c",
                                        backgroundColor: "#80cbc4",
                                    }}
                                >
                                    <AiOutlineHome className={cx("icon")}/>
                                </div>
                                <div className={cx("feature-group")}>
                                    <h4>Đặt phòng nhanh</h4>
                                    <p>Dễ dàng trong việc tìm kiếm và lựa chọn phòng phù hợp với nhu cầu khách hàng để có được nơi nghỉ dường tuyệt vời tại Đà lạt</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/ListBooked" >
                            <div className={cx("featureBox","flex")}>
                                <div className={cx("iconFeatureBox")}
                                    style={{
                                        color:"#b71c1c",
                                        backgroundColor: "#ef9a9a",
                                    }}
                                >
                                    <HiOutlineClipboardDocumentList className={cx("icon")}/>
                                </div>
                                <div className={cx("feature-group")}>
                                    <h4>Xem danh sách phòng đã đặt</h4>
                                    <p>Quản lý danh sách các đơn đặt phòng để quan sát 1 cách chi tiết đồng thời có thể hủy đặt nếu có nhu cầu</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/News">
                            <div className={cx("featureBox","flex")}>
                                <div className={cx("iconFeatureBox")}
                                    style={{
                                        color:"#f57f17",
                                        backgroundColor: "#fff176",
                                    }}
                                >
                                    <HiOutlineNewspaper className={cx("icon")}/>
                                </div>
                                <div className={cx("feature-group")}>
                                    <h4>Xem tin tức</h4>
                                    <p>Nắm bắt được tình hình những cập nhật mới Dhouse Homestay và bắt kịp xu hướng du lịch hiện nay</p>
                                </div>
                            </div>
                        </Link>
                    </div>
               </div>
               <div className={cx("right-FeatureDiv")}>
                    <div className={cx('imgFeatureBox')}>
                        <div className={cx("top-right-FeatureDiv","flex")}>
                            <Image className={cx("imgFeature1")} src="https://images.unsplash.com/photo-1598002420135-c4896b60ba7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhbGF0JTIwdmlldG5hbXxlbnwwfHwwfHx8MA%3D%3D"/>
                            <Image className={cx("imgFeature2")} src="https://c1.wallpaperflare.com/preview/125/487/623/quang-truong-democracy-dalat.jpg"/>
                        </div>
                        <div className={cx("bot-right-FeatureDiv","flex")}>
                            <Image className={cx("imgFeature3")} src="https://c0.wallpaperflare.com/preview/1024/103/683/vietnam-dalat.jpg"/>
                            <Image className={cx("imgFeature4")} src="https://aw-d.tripcdn.com/images/0222o12000aut6xz00EC1_R_960_660_R5_D.webp"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* intruction */}
            <div className={cx("intructionUsage","flex")}>
                <div className={cx("left-intructionUsageDiv")}>
                    <h3>Video hướng dẫn</h3>
                    <div className={cx("videoIntructionUsage")}>
                    <video
                        style={{ width: "900px", height:"400px", margin: "0 auto" }}
                        playsInline
                        loop
                        muted
                        alt="Video intruction"
                        src="http://localhost:3000/Video Homestay Usage Intruction.mp4"
                        ref={videoEl}
                    />         
                    </div>
               </div>
               <div className={cx("right-intructionUsageDiv")}>
                    <h5 
                        style={{color:"#0172a7"}}
                    >
                        Dhouse Homestay
                    </h5>
                    <h3 >Hướng dẫn đặt phòng</h3>
                    <Box 
                        sx={{ 
                            m: "1rem 2rem",
                            maxWidth: 400,
                        }}>
                        <Stepper sx={{fontSize: "18px",}} activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                            <Step  sx={{fontSize: "18px"}} key={step.label}>
                                <StepLabel
                                sx={{fontSize: "18px",}}
                                optional={
                                    index === 2 ? (
                                        <Typography sx={{fontSize: "18px"}} variant="caption">Bước cuối</Typography>
                                    ) : null
                                }
                                >
                                    <Typography sx={{fontSize: "15px"}}>{step.label}</Typography>
                                </StepLabel>

                                <StepContent>
                                    <Typography sx={{fontSize: "15px"}}>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1,fontSize: "14px" }}
                                            >
                                                {index === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1,fontSize: "14px" }}
                                            >
                                                Quay lại
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography sx={{fontSize: "18px", color:"#00695c"}}>Bây giờ hãy lựa chọn và đặt phòng thôi nào</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1,fontSize: "18px" }}>
                                Làm mới
                            </Button>
                            </Paper>
                        )}
                        </Box>
                </div>
            </div>

            {/* advertisement */}
            <div className={cx("bannerAdvertisement")}>
                <Image
                    className={cx("imgBannerAdv")}
                    src={urlAdvertisiment}
                    alt="bannerAdv"
                />
            </div>
            
        </div>
    );
}

export default Home;
