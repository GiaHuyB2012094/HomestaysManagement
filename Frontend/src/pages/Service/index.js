import classNames from 'classnames/bind';
import styles from './Service.module.scss';
import Image from 'src/components/Image';
import Button from 'src/components/Button';
const cx = classNames.bind(styles);
function Service() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("img")}>
                    <Image src="dv.webp" alt="dichvu"/>
                </div>
                <div className={cx("dichvu")}>
                    <div className={cx("khoi")}>
                        <Image src="phuongtien.jpg" alt="phuongtien" id="pt"/>
                        <Button className={cx("dv")} id="dichvu1">Thuê phương tiện</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="trangphuc.jpg" alt="trangphuc" id="tp"/>
                        <Button className={cx("dv")} id="dichvu2" >Thuê trang phục</Button>            
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="hdv.jpeg" alt="huongdanvien" id="hdv"/>
                        <Button className={cx("dv")} id="dichvu3" >Hướng dẫn viên</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="thucan.jpg" alt="thucan" id="ta"/>
                        <Button className={cx("dv")} id="dichvu4">Đồ ăn, thức uống</Button>
                    </div>
                </div>
            </div>

            {/* <div id="phuongtien-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closePhuongTienForm()">&times;</span>
                    <h3>BẢNG CHO THUÊ PHƯƠNG TIỆN</h3>
                    <form id="phuongtien-form">
                        <div class="form-row">
                            <label for="ten-phuong-tien" id="ten">Phương tiện:</label>
                            <select id="ten-phuong-tien" name="ten-phuong-tien" onchange="updateDonGia(); tinhSoTien();" required>
                                <option value="xe-dap">Xe đạp</option>
                                <option value="xe-may">Xe máy</option>
                                <option value="cap-treo">Cáp treo</option>
                                <option value="xich-lo">Xích lô</option>
                                <option value="thuyen">Thuyền</option>
                                <option value="cano">Cano</option>
                            </select>
                            <label for="don-gia" id="ten">Đơn giá:</label>
                            <input type="text" id="don-gia" name="don-gia" readonly/>
                            <p>VNĐ/h</p>
                            <label for="so-luong" id="ten">Số lượng:</label>
                            <input type="number" id="so-luong" name="so-luong" required min="1" max="10"/>
                            <label for="so-gio" id="ten">Số giờ:</label>
                            <input type="number" id="so-gio" name="so-gio" required min="1" max="24"/>
                            <label for="so-tien" id="ten">Số tiền:</label>
                            <input type="number" id="so-tien" name="so-tien" readonly/>
                            <p>VNĐ</p>
                            <button type="button" class="button" onclick="tinhSoTien()">Thành tiền</button>
                            <button class="button" type="submit">Thuê</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="trangphuc-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeTrangPhucForm()">&times;</span>
                    <h3>BẢNG CHO THUÊ TRANG PHỤC</h3>
                    <form id="trangphuc-form">
                        <div class="form-row">
                            <label for="ten-trang-phuc" id="ten">Trang phục:</label>
                            <select id="ten-trang-phuc" name="ten-trang-phuc" onchange="updateDonGiaTrangPhuc(); tinhSoTienTrangPhuc();" required>
                                <option value="ao-dai">Áo dài</option>
                                <option value="ao-tu-than">Áo tứ thân</option>
                                <option value="ao-ba-ba">Áo bà ba</option>
                                <option value="ao-cham">Áo chàm</option>
                                <option value="e-de">Ao đêch ( Ê đê)</option>
                                <option value="dao">NDO (Dao)</option>
                                <option value="vay">Váy</option>
                                <option value="han-phuc">Hán phục</option>
                                <option value="mong-co">Trang phục Mông Cổ</option>
                                <option value="kimono">Kimono</option>
                                <option value="hanbok">Hanbok</option>
                                <!-- Thêm các loại trang phục khác -->
                            </select>
                            <label for="don-gia-trang-phuc" id="ten">Đơn giá:</label>
                            <input type="text" id="don-gia-trang-phuc" name="don-gia-trang-phuc" readonly/>
                            <p>VNĐ/cái/Ngày</p>
                            <label for="so-luong-trang-phuc" id="ten">Số lượng:</label>
                            <input type="number" id="so-luong-trang-phuc" name="so-luong-trang-phuc" required min="1" max="10"/>
                            <label for="so-tien-trang-phuc" id="ten">Số tiền:</label>
                            <input type="number" id="so-tien-trang-phuc" name="so-tien-trang-phuc" readonly/>
                            <p>VNĐ</p>
                            <button type="button" class="button" onclick="tinhSoTienTrangPhuc()">Thành tiền</button>
                            <button class="button" type="submit">Thuê</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="huongdanvien-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeHuongDanVienForm()">&times;</span>
                    <h3>BẢNG CHỌN HƯỚNG DẪN VIÊN</h3>
                    <form id="huongdanvien-form">
                        <div class="form-row">
                            <label for="loai-huongdanvien" id="ten">Hướng dẫn viên</label>
                            <select id="loai-huongdanvien" name="loai-huongdanvien" required>
                                <option value="nguoi-dia-phuong">Người địa phương</option>
                                <option value="quoc-te">HDV quốc tế</option>
                            </select>
            
                            <label for="gioi-tinh-huongdanvien" id="ten">Giới tính:</label>
                            <select id="gioi-tinh-huongdanvien" name="gioi-tinh-huongdanvien" required>
                                <option value="nam">Nam</option>
                                <option value="nu">Nữ</option>
                            </select>
            
                            <label for="ten-huongdanvien" id="ten">Họ tên:</label>
                            <input type="text" id="ten-huongdanvien" name="ten-huongdanvien" required/>
            
                            <label for="kinh-nghiem" id="ten">Kinh nghiệm:</label>
                            <input type="text" id="kinh-nghiem" name="kinh-nghiem" required/>
            
                            <label for="gia-thue" id="ten">Giá thuê:</label>
                            <input type="number" id="gia-thue" name="gia-thue" required/>
                            <p>/Tour</p>
                            <button class="button" type="submit">Thuê</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="doan-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeDoAnForm()">&times;</span>
                    <h3>PHỤC VỤ BỮA ĂN</h3>
                    <form id="doan-form">
                        <div class="form-row">
                            <label for="hinh-thuc-phuc-vu" id="ten">Hình thức phục vụ:</label>
                            <select id="hinh-thuc-phuc-vu" name="hinh-thuc-phuc-vu" required>
                                <option value="buffet">Buffet</option>
                                <option value="an-rieng">Ăn riêng</option>
                            </select>

                            <label for="suat" id="ten">Suất:</label>
                            <select id="suat" name="suat" required>
                                <option value="mot-nguoi">1 Người</option>
                                <option value="cap-doi">Cặp đôi</option>
                                <option value="gia-dinh">Gia đình</option>
                            </select>
                            <label for="huong-vi" id="ten">Hương vị:</label>
                            <select id="huong-vi" name="huong-vi" required>
                                <option value="truyen-thong-viet-nam">Truyền thống Việt Nam</option>
                                <option value="chau-au">Châu Âu</option>
                                <option value="nhat-ban">Nhật Bản</option>
                                <option value="han-quoc">Hàn Quốc</option>
                                <option value="trung-quoc">Trung Quốc</option>
                            </select>
                            <label for="gia" id="ten">Giá:</label>
                            <input type="number" id="gia" name="gia" required/>
                            <p>VNĐ</p>

                            <label for="tong-tien" id="ten">Tổng tiền:</label>
                            <input type="number" id="tong-tien" name="tong-tien" readonly/>
                            <p>VNĐ</p>

                            <button class="button" type="submit">Đặt hàng</button>
                        </div>
                    </form>
                </div>
            </div> */}
        </div>
    );
}

export default Service;
