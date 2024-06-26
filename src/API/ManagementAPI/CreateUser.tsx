import { API_URL, domain } from "../../constants/environment";
import { IUserResponse } from "../../models/IUserResponse";
import getAuthHeaders from "../SetAuthHeaders";
import getManagementAuthHeaders from "./SetManagementAuthHeaders";

export interface IUserCreateRequest {
    "email": string,
    "user_metadata": userMetadata
    "blocked": boolean
    "email_verified": boolean
    "app_metadata": userMetadata
    "given_name": string
    "family_name": string
    "name": string
    "nickname": string
    "picture": string
    "user_id": string
    "connection": string
    "password": string
    "verify_email": boolean
}

interface userMetadata {

}


export async function GetUsers() : Promise<IUserResponse[]>{
    const headers = await getAuthHeaders()
    //VITE_APP_AUTH0_DOMAIN dev-fnrkz1kw46cdu7zy.us.auth0.com
    let response = await fetch(`${API_URL}/api/User`,{
        method: "GET",
        headers,
        redirect: 'follow'
    })
    if(!response.ok){
        throw new Error(await response.text() || response.statusText);  
    }

    let data = await response.json() as IUserResponse[];
    return data;

}

export async function createUser(userRequest : IUserCreateRequest){
    const headers = await getManagementAuthHeaders();
    let response = await fetch(`https://${domain}/api/v2/users`, {
        method:"POST",    
        headers,
        body: JSON.stringify(userRequest),
        redirect: 'follow'

    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    return await response.text();
}

export interface IPasswordresetRequest{
    "client_id": string,
    "connection_id": string,
    "email": string,
    "ttl_sec": number,
    "mark_email_as_verified": boolean,
    "includeEmailInRedirect": boolean
  }

export async function getResetPasswordLink(request : IPasswordresetRequest){
    const headers = await getManagementAuthHeaders();
    let response = await fetch(`https://${domain}/api/v2/tickets/password-change`, {
        method:"POST",    
        headers,
        body: JSON.stringify(request),
        redirect: 'follow'

    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    return await response.text();
}