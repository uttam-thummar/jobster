import apiAxios, { checkForUnauthorizedResponse } from "../../utils/axios"
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
    try {
        const response = await apiAxios.post('/jobs', job);
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await apiAxios.delete(`/jobs/${jobId}`);
        thunkAPI.dispatch(getAllJobs());
        return response.data.msg;
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
    try {
        const response = await apiAxios.patch(`/jobs/${jobId}`, job);
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        thunkAPI.dispatch(clearValues());
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}