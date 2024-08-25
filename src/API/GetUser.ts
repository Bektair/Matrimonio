import { API_URL } from "../constants/environment"
import getAuthHeaders from "./SetAuthHeaders"

export interface IUserResponse {
    id: string
    firstName: string
    lastName: string
    profilePicture: string
    email: string
    nickname: string
    language: string
    email_Verified: boolean
}

export async function getUserByEmail() : Promise<IUserResponse> {

    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/User/ByEmail`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);

    let data = await response.json() as IUserResponse;
    console.log(data)
    return data;
}

export async function getUsers() : Promise<IUserResponse[]> {

    console.log("TRYING TO FETCH users")
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/User`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);

    let data = await response.json() as IUserResponse[];
    console.log(data)
    return data;
}