import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux'
import { FormRow, FormRowSelect } from '../../components';
import { toast } from 'react-toastify';
import { clearValues, createJob, editJob, handleChange } from '../../features/job/jobSlice';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId
    } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({ name, value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position || !company || !jobLocation) {
            toast.error('Please fill out all Fields');
            return;
        }
        if (isEditing) {
            dispatch(
                editJob({
                    jobId: editJobId,
                    job: { position, company, jobLocation, jobType, status }
                })
            );
            navigate('/all-jobs')
            return;
        }
        dispatch(createJob({ position, company, jobLocation, status, jobType }));
    }

    useEffect(() => {
        if (!isEditing) {
            dispatch(handleChange({ name: 'jobLocation', value: user.location }));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                <div className="form-center">
                    {/* position */}
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* compant */}
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* job location */}
                    <FormRow
                        type='text'
                        labelText='Job Location'
                        name='jobLocation'
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    {/* job status */}
                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                    {/* job type */}
                    <FormRowSelect
                        name='jobType'
                        labelText='Job Type'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    {/* btn container */}
                    <div className="btn-container">
                        <button type="button" className='btn btn-block clear-btn' onClick={() => dispatch(clearValues())}>
                            Clear
                        </button>
                        <button type="submit" className='btn btn-block submit-btn' disabled={isLoading}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob
