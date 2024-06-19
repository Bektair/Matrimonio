import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { GetUsers } from "../../API/ManagementAPI/CreateUser";

type sliceState = {
    users: IUser[]
}

const initialState: sliceState = {
    users: []
}

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) =>  {
        builder.addCase(getAllUsers.fulfilled, (state, action)=>{
            let users = action.payload.map(wedding => {
                return { 
                    app_metadata: wedding.app_metadata,
                    blocked: wedding.blocked,
                    created_at: wedding.created_at,
                    email: wedding.email,
                    email_verified: wedding.email_verified,
                    family_name: wedding.family_name,
                    given_name: wedding.given_name,
                    identities: wedding.identities,
                    last_ip: wedding.last_ip,
                    last_login: wedding.last_login,
                    logins_count: wedding.logins_count,
                    multifactor: wedding.multifactor,
                    name: wedding.name,
                    nickname: wedding.nickname,
                    phone_number: wedding.phone_number,
                    phone_verified: wedding.phone_verified,
                    picture: wedding.picture,
                    updated_at: wedding.updated_at,
                    user_id: wedding.user_id,
                    user_metadata: wedding.user_metadata,
                    username: wedding.username,
                    id: wedding.user_id
                }
            }) 

            state.users = users;
        })    
    }
})

export const getAllUsers = createAsyncThunk(
    'users/setUsers',
    //Inside thunk function
    async ()=> {
        var users;

        try {
          users = await GetUsers();
        }catch (err){
            console.log("error:"+ err)
        }
        if(users==undefined) return []
        return users;
    }
  )


  
export default usersSlice.reducer