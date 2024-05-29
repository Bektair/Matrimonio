import getManagementAuthHeaders from "./SetManagementAuthHeaders"
import { domain } from "../../constants/environment";

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

// interface appMetadata {
//     clientID: string
//     globalClientID : string
//     global_client_id : string
//     email_verified : string
//     user_id : string
//     identities : string
//     lastIP : string
//     lastLogin : string
//     metadata : string
//     created_at : string
//     loginsCount : string
//     _id : string
//     email : string
//     blocked : string
//     __tenant : string
//     updated_at : string
// }


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