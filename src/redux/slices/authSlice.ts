import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { User } from "@auth0/auth0-react";


type sliceState = {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: User | undefined,
    id: string | undefined
}



const initialState: sliceState = {
    isAuthenticated: false,
    isLoading: true,
    user: undefined,
    id: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<sliceState>) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isLoading = action.payload.isLoading;
            state.id = action.payload.id;
        }
    }
})

export const selectAuth = (state: RootState) => {
    return state.auth;
}

export const { setAuthState } = authSlice.actions
export default authSlice.reducer