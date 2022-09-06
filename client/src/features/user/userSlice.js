import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    addUserToLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocaStorage
} from "../../utils/localStorage";
import {
    clearStoreThunk,
    loginUserThunk,
    registerUserThunk,
    updateuserThunk
} from "./userThunk";

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
    'user/register-user',
    async (user, thunkAPI) => {
        return registerUserThunk('/auth/register', user, thunkAPI);
    }
);
export const loginUser = createAsyncThunk(
    'user/login-user',
    async (user, thunkAPI) => {
        return loginUserThunk('/auth/login', user, thunkAPI);
    }
);
export const updateUser = createAsyncThunk(
    'user/update-user',
    async (user, thunkAPI) => {
        return updateuserThunk('/auth/update-user', user, thunkAPI);
    }
);
export const clearStore = createAsyncThunk('user/clear-store', clearStoreThunk);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state, { payload }) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocaStorage();
            if (payload) {
                toast.success(payload);
            }
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hi ${user.name}, Welcome to your Dashboard`);
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome Back ${user.name}`);
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success('User Updated!');
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [clearStore.rejected]: () => {
            toast.error('There was an error...');
        }
    }
})

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;