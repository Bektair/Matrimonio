import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";


export interface IUserRequest {
    Id: string
    FirstName : string | undefined
    LastName : string | undefined
    ProfilePicture : string | undefined
    Email : string
    Nickname : string | undefined
    Email_Verified : boolean
}



export async function createUser(participantrequest : IUserRequest) {
    const headers = await getAuthHeaders();
    participantrequest.Id = convertToUUID(participantrequest.Id)
    

let response = await fetch(`${API_URL}/api/User/Social`, {
        method: "POST",
        headers,
        body: JSON.stringify(participantrequest)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IUserRequest;
    return data;
}