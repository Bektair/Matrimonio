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
            let users = action.payload.map((wedding: any) => {
                return { 
                    id: wedding.id,
                    firstName: wedding.firstName,
                    lastName: wedding.lastName,
                    profilePicture: wedding.profilePicture ?? "",
                    email: wedding.email,
                    nickname: wedding.nickname,
                    email_Verified: wedding.email_Verified
                }
            }) 

            state.users = users;
        })    
    }
})

export const getAllUsers: any = createAsyncThunk(
    'users/getUsers',
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