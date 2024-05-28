import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';


type sliceState = {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: object | undefined
}


const initialState: sliceState = {
    isAuthenticated: false,
    isLoading: true,
    user: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<sliceState>) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isLoading = action.payload.isLoading;
        }
    }
})

export const selectAuth = (state: RootState) => {
    return state.auth;
}

export const { setAuthState } = authSlice.actions
export default authSlice.reducer