import { useMemo } from "react";

export const DOTS = '...';

export function usePagination({totalCount, pageSize,siblingCount=1, currentPage}) {
    //  totalCount ---> tổng data
    //  pageSize   ---> data tối đa hiển thị trên 1 trang
    //  siblingCount ---> số phần tử tối đa liền kề
    //  currentPage ---> trang đang hiển thị là trang nào
    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (v, idx) => idx + start);
    };

    const paginationRange = useMemo(()=> {
        const totalPageCount = Math.ceil(totalCount/pageSize);
        const totalPageNumbers = siblingCount + 5;
    // Case 1:
        // [1..totalPageCount]
        if (totalPageNumbers >= totalPageCount) {
            return range(1,totalPageCount);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
        
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount ;
    // Case 2:
        // Khong co dots ben trai, co dots ben phai
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, DOTS, totalPageCount];
        }
    // Case 3: 
        // Co dots ben trai, khong co dots ben phai
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            // loc phan tu
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
              );
            return [firstPageIndex, DOTS, ...rightRange];
        }
    // Case 4:
        // co dots ca 2 ben
        if (shouldShowLeftDots && shouldShowRightDots) {
            // loc phan tu
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
          }
    },[totalCount, pageSize, siblingCount, currentPage]);
    return paginationRange;
}

