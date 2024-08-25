import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { getUsers } from "../../API/GetUser";

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
            let users = action.payload.map((user: any) => {
                return { 
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.profilePicture ?? "",
                    email: user.email,
                    nickname: user.nickname,
                    email_Verified: user.email_Verified
                }
            }) 

            state.users = users;
        })
    }
})

export const getAllUsers = createAsyncThunk(
    'users/getUsers',
    //Inside thunk function
    async ()=> {
        var users;

        try {
          users = await getUsers();
        }catch (err){
            console.log("error:"+ err)
        }
        if(users==undefined) return []
        return users;
    }
  )


  
export default usersSlice.reducer