import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChartsContainer, StatsContainer } from '../../components';
import { showStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
    const { monthlyApplications } = useSelector((store) => store.allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showStats());
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
    )
}

export default Stats
