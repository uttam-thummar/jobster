import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
}

export const createJob = createAsyncThunk('job/create-job', createJobThunk);
export const deleteJob = createAsyncThunk('job/delete-job', deleteJobThunk);
export const editJob = createAsyncThunk('job/edit-job', editJobThunk);

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: () => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || ''
            };
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload }
        }
    },
    extraReducers: {
        [createJob.pending]: (state) => {
            state.isLoading = true;
        },
        [createJob.fulfilled]: (state) => {
            state.isLoading = false;
            toast.success('Job Created...');
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [deleteJob.fulfilled]: (state, { payload }) => {
            toast.success(payload);
        },
        [deleteJob.rejected]: (state, { payload }) => {
            toast.error(payload);
        },
        [editJob.pending]: (state) => {
            state.isLoading = true;
        },
        [editJob.fulfilled]: (state) => {
            state.isLoading = false;
            toast.success('Job Midified...');
        },
        [editJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
    }
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;