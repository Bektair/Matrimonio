import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";


export interface IParticipantRequest {
    role: string
    userId: string
    weddingId: string
    language: string
    isDefaultLanguage: boolean
}



export async function addParticipant(participantrequest : IParticipantRequest) {
    const headers = await getAuthHeaders();

let response = await fetch(`${API_URL}/api/Wedding/participant`, {
        method: "POST",
        headers,
        body: JSON.stringify(participantrequest)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IParticipantRequest;
    return data;
}