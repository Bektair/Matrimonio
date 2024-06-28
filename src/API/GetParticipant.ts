import { API_URL } from "../constants/environment";
import { IParticipantRequest } from "./CreateParticipant";
import getAuthHeaders from "./SetAuthHeaders"

export interface IParticipantGetRequest {
    weddingId: string
    role? : string
}



export async function fetchParticipants(props : IParticipantGetRequest) : Promise<IParticipantRequest[]> {

    console.log("TRYING TO FETCH wedddings")
    


    const headers = await getAuthHeaders();
    var roleExtra =  (props.role) ? `?role=${props.role}` : ""
    let response = await fetch(`${API_URL}/api/Wedding/participants/${props.weddingId}` + roleExtra, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);

    let data = await response.json() as IParticipantRequest[];
    console.log(data)
    return data;
}