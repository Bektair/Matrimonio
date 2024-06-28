import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";

interface IParams {
    participantrequest: IParticipantRequest
}

export interface IParticipantRequest {
    role: string
    userId: string
    wedding_id: string
}



export async function addParticipant({ participantrequest: request } : IParams) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Wedding/participant?user_id=
        ${request.userId}&wedding_id=${request.wedding_id}&role=${request.role}`, {
        method: "POST",
        headers,
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IParticipantRequest;
    return data;
}