import classNames from 'classnames/bind';
import style from './Pagination.module.scss';
import {usePagination, DOTS} from "./usePagination";
import {GrFormPrevious,GrFormNext} from 'react-icons/gr';

const cx = classNames.bind(style);
function Pagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    if (currentPage === 0 || paginationRange.length < 2){
        return null;
    }
    const onNext = () => {
        onPageChange(currentPage + 1);
    }
    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }
    let lastPage = paginationRange[paginationRange.length - 1];
    return (  
        // <ul className={cx("pagination-container",{[className]:className})}>
        //     <li 
        //         className={cx("pagination-item",{disable: currentPage===1})}
        //         onClick={onPrevious}
        //     >
        //         <GrFormPrevious className={cx('icon')}/>
        //         {/* <div className={cx("arrow left")}></div> */}
        //     </li>
        //     {paginationRange.map(pageNumber => {
        //         if (pageNumber === DOTS) {
        //             return <li className={cx("pagination-item dots")}>&#8230</li>
        //         }
        //         return (
        //             <li
        //                 className={cx("pagination-item")}
        //                 onClick={()=> onPageChange(pageNumber)}
        //             >
        //                 {pageNumber}
        //             </li>
        //         )
        //     })}
        //     <li
        //         className={cx("pagination-item",{disable: currentPage===lastPage})}
        //         onClick={onNext}
        //     >
        //         <GrFormNext className={cx('icon')}/>
        //     </li>
        // </ul>
        <ul
      className={cx('pagination-container', { [className]: className })}
    >
      <li
        className={cx('pagination-item', {disabled: currentPage === 1})}
        onClick={onPrevious}
      >
        <div className="arrow left" >
            <GrFormPrevious className={cx('icon')}/>
        </div>
      </li>
      {paginationRange.map((pageNumber,index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={cx('pagination-item', {selected: pageNumber === currentPage})}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cx('pagination-item', {disabled: currentPage === lastPage})}
        onClick={onNext}
      >
        <div className="arrow right">
            <GrFormNext className={cx('icon')}/>
        </div>
      </li>
    </ul>
    );
}

export default Pagination;