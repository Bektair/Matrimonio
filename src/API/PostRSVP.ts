import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";


export interface IRSVPCreate {
    body: string
    deadline: number
    status: string
    numberOfGuests: number
    OtherDietaryRequirements: string
    signerId: string
    weddingId: number
}


export async function postRSVP(rsvp : IRSVPCreate){
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/RSVP`, {
        headers,
        method: "POST",
        body: JSON.stringify(rsvp)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
}