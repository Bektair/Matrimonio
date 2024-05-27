import { management_auth_token } from "../../constants/environment";

async function getManagementAuthHeaders(): Promise<HeadersInit> {

    
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${management_auth_token}`
    }
}

export default getManagementAuthHeaders;  