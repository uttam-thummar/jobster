import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import { useDebounce } from '../hooks/useDebounce';
import Job from './Job';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
    const {
        jobs,
        isLoading,
        page,
        totalJobs,
        numOfPages,
        search,
        searchStatus,
        searchType,
        sort
    } = useSelector((store) => store.allJobs);
    const dispatch = useDispatch();
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        dispatch(getAllJobs());
        //eslint-disable-next-line
    }, [page, debouncedSearch, searchStatus, searchType, sort]);

    if (isLoading) {
        return (
            <Loading center />
        );
    }
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer
