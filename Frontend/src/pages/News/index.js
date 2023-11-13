import classNames from 'classnames/bind';
import styles from './News.module.scss';
const cx = classNames.bind(styles);
function News() {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("news")}>
            <h1>TIN TỨC</h1>
            <p>Tin tức từ Homestay</p>
        </div>
        <span className={cx("breadcrumbs-nav")}>
            <div>
                <a>   <i className={cx("fas fa-home icon-white")} style={{paddingRight:"3px"}}></i>
                </a> TIN TỨC
            </div>
        </span>
        <div className={cx("line")}>
            
        </div>

        <div className={cx("content")}>
            <div className={cx("news-list")}>
                <h3>Mục tin mới</h3>
                <div className={cx("news-new")}>
                    <div className={cx("card-1 card")}>
                        <img className={cx("square-zoom")} src="http://localhost:5000/images/homestaytruyenthong.jpg" alt=""></img>
                        <h2>Homestay chủ đề văn hóa Việt Nam: Nét đẹp truyền thống giữa lòng thành phố</h2>
                        <p>Homestay chủ đề văn hóa Việt Nam là một xu hướng mới của du lịch, mang đến cho du khách trải
                            nghiệm văn hóa truyền thống Việt Nam.... <a>Xem thêm</a> </p>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("card-2")}>
                        <table>
                            <tr>
                                <td>
                                    <div className={cx("card")}>
                                        <img className={cx("square")} src="http://localhost:5000/images/homestaynongtrai.jpg" alt=""></img>
                                        <h2>Homestay nông trại: Trải nghiệm cuộc sống bình dị</h2>
                                        <p>Homestay nông trại là lựa chọn lý tưởng cho những du khách muốn trải nghiệm cuộc sống bình dị, gần 
                                        gũi với thiên nhiên. Tại đây, du khách có thể tham gia các hoạt động như trồng trọt, chăn nuôi, thu 
                                        hoạch nông sản,...</p> 
                                        <div className={cx("short-line")}></div>
                                    </div>
                                </td>   
                                <td>
                                    <div className={cx("card")}>
                                        <img className={cx("square")} src="http://localhost:5000/images/homestaychude.png" alt=""></img>
                                        <h2>Homestay theo chủ đề: Thỏa sức sáng tạo</h2>
                                        <p>Ngày nay, có rất nhiều homestay theo chủ đề khác nhau, từ homestay chủ đề phim ảnh, truyện tranh đến 
                                        homestay chủ đề cổ tích,... Những homestay này mang đến cho du khách những trải nghiệm độc đáo và thú 
                                        vị.</p>
                                        <div className={cx("short-line")}></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className={cx("card")}>
                                        <img className={cx("square")} src="http://localhost:5000/images/homestaygiare.jpg" alt=""></img>
                                        <h2>Homestay giá rẻ: Lựa chọn tiết kiệm</h2>
                                        <p>Homestay là lựa chọn lưu trú tiết kiệm hơn so với khách sạn. Tại Việt Nam, có rất nhiều homestay giá rẻ, 
                                        phù hợp với mọi đối tượng du khách.</p>
                                        <div className={cx("short-line")}></div>
                                    </div>
                                </td>
                                <td>
                                    <div className={cx("card")}>
                                        <img className={cx("square")} src="http://localhost:5000/images/homestayganbien.jpg" alt=""></img>
                                        <h2>Homestay gần biển: Tận hưởng không khí biển cả</h2>
                                        <p>Những homestay gần biển là lựa chọn lý tưởng cho những du khách muốn tận hưởng không khí biển cả. Tại 
                                        đây, du khách có thể tắm biển, tham gia các hoạt động thể thao dưới nước,...</p>
                                        <div className={cx("short-line")}></div>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
                <div className={cx("see-more")}>Xem thêm</div>
            </div>
            <div className={cx("line")}></div>
            <div className={cx("news-list")}>
                <h3>Mục tin nổi bật</h3>
                <table>
                    <tr>
                        <td>
                            <div className={cx("card")}>
                                <img className={cx("hot-square")} src="http://localhost:5000/images/homestayvinhdanh.jpg" alt=""></img>
                                <h2>Homestay Việt Nam được vinh danh trong top 100 homestay tốt nhất thế giới</h2>
                                <p>Vào tháng 7 năm 2023, homestay Việt Nam đã được vinh danh trong top 100 homestay tốt
                                    nhất thế giới...
                                </p>
                                <div className={cx("short-line")}></div>
                            </div>
                        </td>
                        <td>
                            <div className={cx("card")}>
                                <img className={cx("hot-square")} src="http://localhost:5000/images/homestaynongtrai.webp" alt=""></img>
                                <h2>Homestay nông trại: Xu hướng mới của du lịch Việt Nam</h2>
                                <p>Trong những năm gần đây, homestay nông trại đang trở thành xu hướng mới của du lịch
                                    Việt Nam...
                                </p>
                                <div className={cx("short-line")}></div>
                            </div>
                        </td>
                        <td>
                            <div className={cx("card")}>
                                <img className={cx("hot-square")} src="http://localhost:5000/images/homestaychude.jpg" alt=""></img>
                                <h2>Homestay theo chủ đề: Trải nghiệm độc đáo, thú vị</h2>
                                <p>Ngày nay, có rất nhiều homestay theo chủ đề khác nhau, từ homestay chủ đề phim ảnh,
                                    truyện tranh..
                                </p>
                                <div className={cx("short-line")}></div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div className={cx("see-more")}>Xem thêm</div>
            </div>
            <div className={cx("grid-cell")}>
                <div className={cx("left-cell")}>
                    <div className={cx("full-line")}></div>
                    <h3>Mục Tin giải trí</h3>
                    <div>
                        <table>
                            <tr className={cx("card")}>
                                <td>
                                    <div>
                                        <img className={cx("square-no-radius")} src="http://localhost:5000/images/homestaycapdoi.jpg" alt=""></img>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <h2>Homestay: Điểm đến lý tưởng cho các cặp đôi</h2>
                                        <div className={cx("date">10/10/2023)}></div>
                                        <div className={cx("short-line")}></div>
                                        <p>Homestay là lựa chọn lý tưởng cho các cặp đôi đang tìm kiếm một nơi nghỉ
                                            dưỡng
                                            lãng mạn và
                                            ngọt ngào. Tại homestay, các cặp đôi có thể tận hưởng không gian riêng tư và
                                            ấm
                                            cúng, cùng
                                            nhau trải nghiệm những hoạt động thú vị và gắn kết tình cảm.</p>
                                    </div>

                                </td>
                            </tr>
                            <tr className={cx("card")}>
                                <td>
                                    <div>
                                        <img className={cx("square-no-radius")} src="http://localhost:5000/images/homestaygiadinh.webp" alt=""></img>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <h2>Homestay: Trải nghiệm thú vị cho các gia đình</h2>
                                        <div className={cx("date">21/9/2023)}></div>
                                        <div className={cx("short-line")}></div>
                                        <p>Homestay là lựa chọn thú vị cho các gia đình đang tìm kiếm một nơi nghỉ dưỡng
                                            gắn
                                            kết và
                                            đáng nhớ. Tại homestay, các gia đình có thể cùng nhau nấu ăn, chơi đùa, và
                                            tận
                                            hưởng
                                            những giây phút bên nhau.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className={cx("card")}>
                                <td>
                                    <div>
                                        <img className={cx("square-no-radius")} src="http://localhost:5000/images/homestaynhomban.jpg" alt=""></img>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <h2>Homestay: Lựa chọn lý tưởng cho các nhóm bạn</h2>
                                        <div className={cx("date">14/9/2023)}> </div>
                                        <div className={cx("short-line")}></div>
                                        <p>Homestay là lựa chọn lý tưởng cho các nhóm bạn đang tìm kiếm một nơi nghỉ
                                            dưỡng
                                            vui vẻ
                                            và thoải mái. Tại homestay, các nhóm bạn có thể cùng nhau tổ chức các bữa
                                            tiệc,
                                            trò chơi,
                                            và tận hưởng những giây phút bên nhau.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className={cx("card")}>
                                <td>
                                    <div>
                                        <img className={cx("square-no-radius")} src="http://localhost:5000/images/homestaynghiduong.jpg" alt=""></img>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <h2>Homestay: Thiên đường nghỉ dưỡng cho các tín đồ du lịch</h2>
                                        <div className={cx("date")}>15/8/2023</div>
                                        <div className={cx("short-line")}></div>
                                        <p>Homestay là lựa chọn lý tưởng cho các tín đồ du lịch đang tìm kiếm một nơi
                                            nghỉ
                                            dưỡng
                                            đặc sắc và thú vị. Tại homestay, các tín đồ du lịch có thể trải nghiệm cuộc
                                            sống
                                            của
                                            người dân địa phương, cùng nhau khám phá những địa điểm mới mẻ và mang về
                                            những
                                            kỷ niệm
                                            đáng nhớ.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className={cx("card")}>
                                <td>
                                    <div>
                                        <img className={cx("square-no-radius")} src="http://localhost:5000/images/homstaytiemnang.jpg" alt=""></img>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <h2>Homestay: Tiềm năng phát triển trong tương lai</h2>
                                        <div className={cx("date")}>7/7/2023</div>
                                        <div className={cx("short-line")}></div>
                                        <p>Homestay có tiềm năng phát triển mạnh mẽ trong tương lai, với những lợi thế
                                            như:
                                            Chi phí đầu tư thấp.
                                            Thời gian thu hồi vốn nhanh.
                                            Mang lại nhiều lợi ích cho du khách và cộng đồng địa phương.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className={cx("right-cell")}>
                    <div className={cx("card")}>
                        <img className={cx("square-zoom")} src="http://localhost:5000/images/homestaycapdoi.jpg" alt=""></img>
                        <h2>Homestay: Điểm đến lý tưởng cho các cặp đôi</h2>
                        <div className={cx("short-line")}></div>
                        <p>Homestay là lựa chọn lý tưởng cho các cặp đôi đang tìm kiếm một nơi nghỉ dưỡng lãng mạn và
                            ngọt ngào. Tại homestay, các cặp đôi có thể tận hưởng không gian riêng tư và ấm cúng, cùng
                            nhau trải nghiệm những hoạt động thú vị và gắn kết tình cảm.</p>
                    </div>
                    <div className={cx("point")}>
                        <h2 className={cx("small-text")}>Homestay: Điểm đến lý tưởng cho các cặp đôi</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("point")}>
                        <h2 className={cx("small-text")}>Homestay: Trải nghiệm thú vị cho các gia đình</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("point")}>
                        <h2 className={cx("small-text")}>Homestay: Lựa chọn lý tưởng cho các nhóm bạn</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("point")}>
                        <h2 className={cx("small-text")}>Homestay: Thiên đường nghỉ dưỡng cho các tín đồ du lịch</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("point")}>
                        <h2 className={cx("small-text")}>Homestay: Lựa chọn lưu trú lý tưởng cho du khách</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("point")}>
                        <h2 className={cx("small-text")}>Homestay: Lợi ích cho du khách và cộng đồng địa phương</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("point")}>
                        <h2 className={cx("small-text")}>Homestay: Tiềm năng phát triển trong tương lai</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <a style={{margin:"10px"}} >Xem thêm</a>


                </div>
            </div>
            <div className={cx("line")}></div>
            <div className={cx("news-list")}>
                <h3>Mục tin khuyến mãi</h3>
                <div className={cx("flex")}>
                    <div className={cx("card flex-con")}>
                        <img className={cx("square")} src="http://localhost:5000/images/voucher50pt.jpg" alt=""></img>
                        <h2>Giảm giá 50% cho các homestay tại Việt Nam</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("card flex-con")}>
                        <img className={cx("square")} src="http://localhost:5000/images/voucherfree.png" alt=""></img>
                        <h2>Tặng voucher nghỉ dưỡng miễn phí tại các homestay</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("card flex-con")}>
                        <img className={cx("square")} src="http://localhost:5000/images/voucherkhuyenmai.jpg" alt=""></img>
                        <h2>Khuyến mãi đặc biệt cho các du khách đặt phòng sớm</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                    <div className={cx("card flex-con")}>
                        <img className={cx("square")}src="http://localhost:5000/images/vouchermember.jpg" alt=""></img>
                        <h2>Chương trình ưu đãi dành cho các thành viên thân thiết</h2>
                        <div className={cx("short-line")}></div>
                    </div>
                </div>
            </div>
            <div className={cx("see-more")}>Xem thêm</div>

        </div>
      </div>
    );
}

export default News;
