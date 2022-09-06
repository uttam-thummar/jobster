import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
    const { numOfPages, page } = useSelector((store) => store.allJobs);
    const dispatch = useDispatch();
    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });

    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            return;
        }
        dispatch(changePage(newPage));
    }
    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            return;
        }
        dispatch(changePage(newPage));
    }

    return (
        <Wrapper>
            <button type='button' className='prev-btn' onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className="btn-container">
                {pages.map((pageNumber) => {
                    return (
                        <button
                            type='button'
                            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                            key={pageNumber}
                            onClick={() => dispatch(changePage(pageNumber))}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>
            <button type='button' className='next-btn' onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer
