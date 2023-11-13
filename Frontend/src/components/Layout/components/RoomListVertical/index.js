import classNames from 'classnames/bind';
import styles from './RoomListVertical.module.scss';
import Image from 'src/components/Image';
import { ImLocation2 } from 'react-icons/im';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { BsClipboardCheck } from 'react-icons/bs';
import Button from 'src/components/Button';
import useFetch from 'src/Hook/useFetch';
import Loader from 'src/components/Loader';
import { useEffect, useMemo, useState } from 'react';
import Pagination from 'src/components/Pagination/Pagination';



const cx = classNames.bind(styles);

function RoomListVertical({dataSearch}) {
    const {loading} = useFetch('/api/rooms/getallrooms');
    // pagination----
    let PageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    
    const currentRoomFilteredList = useMemo(() => {
        const firstPageIndex = (currentPage-1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        console.log(firstPageIndex,lastPageIndex);
        return dataSearch.filteredRooms.slice(firstPageIndex, lastPageIndex);
      }, [currentPage]);
    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // maximumFractionDigits: 3,
    });
      // pagination----
      
    // console.log(currentRoomFilteredList);
    return (
        
        <div className={cx('wrapper')}>
            { loading ? (
                    <Loader/>
            ) : (
            <>
                <div className={cx("listRoom")}>
                    {currentRoomFilteredList.map(
                        ({  _id, 
                            imgs,
                            name,
                            branch,
                            desc,
                            price,
                        }, index) => {
                            return (
                                <div key={index} className={cx('cartSingleRoom')}>
                                    {/* img */}
                                    <div className={cx('avatarRoom')}>
                                        <Image src={imgs[0].src} alt={imgs[0].alt} className={cx('imgRoom')}></Image>
                                    </div>
                                    {/* noi dung */}
                                    <div className={cx('bodyRoom')}>
                                        <h4 className={cx('nameRoom')}>{name}</h4>
                                        <span className={cx('container', 'flex')}>
                                            <ImLocation2 className={cx('icon')} />
                                            <span className={cx('branchRoom')}>Chi Nhánh: {branch}</span>
                                        </span>
    
                                        <div className={cx('priceRoom', 'flex')}>
                                            <span className={cx('flex')}>
                                                <BiMoneyWithdraw className={cx('icon')} />
                                                Giá:
                                            </span>
                                            <h4> {formatter.format(price[1])} </h4>
                                        </div>
    
                                        <div className={cx('descRoom')}>
                                            <p>{desc}</p>
                                        </div>
    
                                        <Button
                                            primary
                                            small
                                            to={`/Book/${_id}/${dataSearch.fromdate}/${dataSearch.todate}`}
                                            className={cx('btnRoom')}
                                            leftIcon={<BsClipboardCheck />}
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </div>
                            );
                        },)
                    }
                </div>
                <div className={cx("pagination-bar")}>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={dataSearch.filteredRooms.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </>
            )}
            
        </div>
    );
}

export default RoomListVertical;
