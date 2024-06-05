import getAuthHeaders from "./SetAuthHeaders";
import { API_URL } from "../constants/environment";
import { IRSVP } from "../models/IRSVP";
import { IUser } from "../models/IUser";


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