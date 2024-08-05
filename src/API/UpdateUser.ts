import { API_URL } from "../constants/environment"
import { createJsonPatch } from "./JsonPatch"
import getAuthHeaders from "./SetAuthHeaders"

export interface IUserUpdate {
    firstName?: string
    lastName?: string
    profilePicture?: string
    email?: string
    nickname?: string
    password?: string
    language?: string
    email_Verified?: boolean
}

export interface IUserResponse {
    firstName: string
    lastName: string
    profilePicture: string
    email: string
    nickname: string
    password: string
    language: string
    email_Verified: boolean
}

export interface IPatchUserResponse {
    original: IUserResponse
    patched: IUserResponse
}

export interface IUserUpdateRequest{
    userUpdate : IUserUpdate,
    id : string
}

export async function patchUser(req: IUserUpdateRequest) {
    console.log(req.userUpdate)
    var patches = createJsonPatch(req.userUpdate);
    console.log(patches)
    const headers = await getAuthHeaders();
    
    let response = await fetch(`${API_URL}/api/User/${req.id}`, {
        headers,
        method: "PATCH",
        body: JSON.stringify(patches)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);

        let data = await response.json() as IPatchUserResponse;
        console.log(data)
        console.log("DATASearchMe")
     
     return data.patched;



}