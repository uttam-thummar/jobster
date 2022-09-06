import apiAxios, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
        url = url + `&search=${search}`;
    }
    try {
        const response = await apiAxios.get(url);
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const showStatsThunk = async (_, thunkAPI) => {
    try {
        const response = await apiAxios.get('/jobs/stats');
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}