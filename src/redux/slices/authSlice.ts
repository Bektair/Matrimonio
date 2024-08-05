import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@auth0/auth0-react";
import { IUserUpdateRequest, patchUser } from "../../API/UpdateUser";


type sliceState = {
    isAuthenticated: boolean,
    isLoading: boolean,
    isAdmin: boolean,
    user: User | undefined,
    id: string | undefined
}



const initialState: sliceState = {
    isAuthenticated: false,
    isAdmin: false,
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
            state.isAdmin = action.payload.isAdmin;
            state.id = action.payload.id;
        }
    },
    extraReducers: (builder) =>  {
        builder.addCase(updateUserThunk.fulfilled, (state, action)=>{
            var payload = action.payload;
            console.log("UpdateUserFulfilled --------------------------------")
            console.log(payload)
            if(payload){
                
                if(state.user){
                    if(payload.email) state.user.email=payload.email;
                    if(payload.email_Verified) state.user.email_verified = payload.email_Verified;
                    if(payload.nickname) state.user.nickname = payload.nickname;
                    if(payload.profilePicture) state.user.profile = payload.profilePicture;
                    if(payload.firstName) state.user.name = payload.firstName;
                    if(payload.lastName)state.user.given_name = payload.lastName;
                    if(payload.language)state.user.locale = payload.language;
                }            
            }   
        })
    }
})

export const updateUserThunk = createAsyncThunk(
    'users/update',
    //Inside thunk function
    async (userUpdate : IUserUpdateRequest)=> {
        var users;

        try {
          users = await patchUser(userUpdate);
        }catch (err){
            console.log("error:"+ err)
        }
        return users;
    }
  )


export const { setAuthState } = authSlice.actions
export default authSlice.reducer